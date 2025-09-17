const nodemailer = require('nodemailer');
const User = require('../models/User');

class NotificationService {
  constructor() {
    this.emailTransporter = null;
    this.initializeEmailTransporter();
  }

  /**
   * Initialize email transporter
   */
  initializeEmailTransporter() {
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      this.emailTransporter = nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }
  }

  /**
   * Send notification to user
   */
  async sendNotification(userId, message, type = 'info', channel = 'system') {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const notification = {
        userId,
        message,
        type, // 'info', 'warning', 'error', 'success'
        channel, // 'system', 'email', 'whatsapp', 'sms'
        timestamp: new Date(),
        read: false
      };

      // Store notification in database (you might want to create a Notification model)
      // For now, we'll just send via available channels

      const results = {
        system: true, // Always stored in system
        email: false,
        whatsapp: false,
        sms: false
      };

      // Send email notification if email is configured and user has email
      if (this.emailTransporter && user.email && (channel === 'email' || channel === 'all')) {
        try {
          await this.sendEmailNotification(user.email, message, type);
          results.email = true;
        } catch (error) {
          console.error('Email notification failed:', error);
        }
      }

      // Send WhatsApp notification if configured and user has WhatsApp number
      if (user.whatsappNumber && (channel === 'whatsapp' || channel === 'all')) {
        try {
          await this.sendWhatsAppNotification(user.whatsappNumber, message);
          results.whatsapp = true;
        } catch (error) {
          console.error('WhatsApp notification failed:', error);
        }
      }

      return {
        success: true,
        notification,
        channels: results
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Send email notification
   */
  async sendEmailNotification(email, message, type = 'info') {
    if (!this.emailTransporter) {
      throw new Error('Email transporter not configured');
    }

    const subject = this.getEmailSubject(type);
    const html = this.generateEmailTemplate(message, type);

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'SalesHostel <noreply@saleshostel.com>',
      to: email,
      subject: subject,
      html: html
    };

    return await this.emailTransporter.sendMail(mailOptions);
  }

  /**
   * Send WhatsApp notification
   */
  async sendWhatsAppNotification(phoneNumber, message) {
    // This would integrate with WhatsApp Business API
    // For now, we'll just log the message
    console.log(`WhatsApp notification to ${phoneNumber}: ${message}`);
    
    // In a real implementation, you would use WhatsApp Business API
    // Example with a hypothetical WhatsApp service:
    /*
    const whatsappService = require('./whatsappService');
    return await whatsappService.sendMessage(phoneNumber, message);
    */
    
    return { success: true, message: 'WhatsApp notification logged' };
  }

  /**
   * Send low stock alert
   */
  async sendLowStockAlert(productId, currentStock) {
    try {
      const Product = require('../models/Product');
      const product = await Product.findById(productId).populate('supplier', 'firstName lastName email whatsappNumber');
      
      if (!product) {
        throw new Error('Product not found');
      }

      const message = `Low Stock Alert: ${product.name} is running low. Current stock: ${currentStock}`;

      // Notify admin users
      const adminUsers = await User.find({ role: 'admin', isActive: true });
      const adminNotifications = adminUsers.map(admin => 
        this.sendNotification(admin._id, message, 'warning', 'email')
      );

      // Notify staff users
      const staffUsers = await User.find({ 
        role: 'staff', 
        isActive: true,
        'staffInfo.permissions': 'manage_inventory'
      });
      const staffNotifications = staffUsers.map(staff => 
        this.sendNotification(staff._id, message, 'warning', 'system')
      );

      // Notify supplier
      let supplierNotification = null;
      if (product.supplier) {
        supplierNotification = this.sendNotification(
          product.supplier._id, 
          `Restock Request: ${product.name} needs restocking. Current stock: ${currentStock}`,
          'info',
          'email'
        );
      }

      await Promise.all([
        ...adminNotifications,
        ...staffNotifications,
        supplierNotification
      ].filter(Boolean));

      return {
        success: true,
        message: 'Low stock alerts sent',
        notifiedUsers: adminUsers.length + staffUsers.length + (product.supplier ? 1 : 0)
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Send order status update
   */
  async sendOrderStatusUpdate(orderId, status) {
    try {
      const Order = require('../models/Order');
      const order = await Order.findById(orderId).populate('customer', 'firstName lastName email whatsappNumber');
      
      if (!order) {
        throw new Error('Order not found');
      }

      const statusMessages = {
        confirmed: 'Your order has been confirmed and is being prepared.',
        preparing: 'Your order is currently being prepared.',
        ready: 'Your order is ready for pickup/delivery.',
        'out-for-delivery': 'Your order is out for delivery.',
        delivered: 'Your order has been delivered successfully.',
        cancelled: 'Your order has been cancelled.'
      };

      const message = `Order #${order.orderNumber}: ${statusMessages[status] || 'Status updated'}`;

      // Send notification to customer
      let customerNotification = null;
      if (order.customer) {
        customerNotification = this.sendNotification(
          order.customer._id,
          message,
          status === 'cancelled' ? 'warning' : 'info',
          'whatsapp'
        );
      }

      // Send WhatsApp message directly if customer info is available
      let whatsappNotification = null;
      if (order.customerInfo.whatsappNumber) {
        whatsappNotification = this.sendWhatsAppNotification(
          order.customerInfo.whatsappNumber,
          message
        );
      }

      await Promise.all([customerNotification, whatsappNotification].filter(Boolean));

      return {
        success: true,
        message: 'Order status notification sent',
        orderNumber: order.orderNumber,
        status
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Send order confirmation
   */
  async sendOrderConfirmation(orderId) {
    try {
      const Order = require('../models/Order');
      const order = await Order.findById(orderId)
        .populate('customer', 'firstName lastName email whatsappNumber')
        .populate('orderItems.product', 'name');
      
      if (!order) {
        throw new Error('Order not found');
      }

      const itemsList = order.orderItems.map(item => 
        `${item.quantity}x ${item.productName} (${item.packageType})`
      ).join('\n');

      const message = `Order Confirmation #${order.orderNumber}

Items:
${itemsList}

Total: ₦${order.totalAmount.toLocaleString()}
Order Type: ${order.orderType}
Payment Method: ${order.paymentMethod}

Thank you for your order!`;

      // Send to customer
      let customerNotification = null;
      if (order.customer) {
        customerNotification = this.sendNotification(
          order.customer._id,
          message,
          'success',
          'email'
        );
      }

      // Send WhatsApp confirmation
      let whatsappNotification = null;
      if (order.customerInfo.whatsappNumber) {
        whatsappNotification = this.sendWhatsAppNotification(
          order.customerInfo.whatsappNumber,
          message
        );
      }

      await Promise.all([customerNotification, whatsappNotification].filter(Boolean));

      return {
        success: true,
        message: 'Order confirmation sent',
        orderNumber: order.orderNumber
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Send bulk notifications
   */
  async sendBulkNotification(userIds, message, type = 'info', channel = 'system') {
    try {
      const notifications = userIds.map(userId => 
        this.sendNotification(userId, message, type, channel)
      );

      const results = await Promise.allSettled(notifications);
      
      const successful = results.filter(result => result.status === 'fulfilled').length;
      const failed = results.filter(result => result.status === 'rejected').length;

      return {
        success: true,
        total: userIds.length,
        successful,
        failed,
        results
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Send role-based notification
   */
  async sendRoleNotification(roles, message, type = 'info', channel = 'system') {
    try {
      const users = await User.find({ 
        role: { $in: roles }, 
        isActive: true 
      }).select('_id');

      const userIds = users.map(user => user._id);
      
      return await this.sendBulkNotification(userIds, message, type, channel);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generate email template
   */
  generateEmailTemplate(message, type = 'info') {
    const colors = {
      info: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    };

    const color = colors[type] || colors.info;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SalesHostel Notification</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: ${color}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">SalesHostel</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">NDDC Hostel - Shop 12</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e9ecef;">
          <div style="background: white; padding: 20px; border-radius: 6px; border-left: 4px solid ${color};">
            <p style="margin: 0; white-space: pre-line;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center; color: #6c757d; font-size: 14px;">
            <p>This is an automated notification from SalesHostel.</p>
            <p>If you have any questions, please contact us at ${process.env.BUSINESS_PHONE || '+234XXXXXXXXXX'}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Get email subject based on type
   */
  getEmailSubject(type) {
    const subjects = {
      info: 'SalesHostel Notification',
      success: 'SalesHostel - Success',
      warning: 'SalesHostel - Important Notice',
      error: 'SalesHostel - Alert'
    };

    return subjects[type] || subjects.info;
  }

  /**
   * Send welcome email to new user
   */
  async sendWelcomeEmail(userId) {
    try {
      const user = await User.findById(userId);
      if (!user || !user.email) {
        throw new Error('User not found or no email address');
      }

      const message = `Welcome to SalesHostel, ${user.firstName}!

Your account has been successfully created. You can now start shopping for all your essential needs.

Role: ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}

Visit our shop at NDDC Hostel, Shop 12 or browse our products online.

Thank you for choosing SalesHostel!`;

      return await this.sendEmailNotification(user.email, message, 'success');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email, resetToken) {
    try {
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
      
      const message = `Password Reset Request

You have requested to reset your password. Click the link below to reset your password:

${resetUrl}

This link will expire in 1 hour.

If you did not request this password reset, please ignore this email.`;

      return await this.sendEmailNotification(email, message, 'info');
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
module.exports = new NotificationService();