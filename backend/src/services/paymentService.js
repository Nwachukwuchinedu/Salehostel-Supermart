const axios = require('axios');

class PaymentService {
  constructor() {
    this.flutterwaveSecretKey = process.env.FLUTTERWAVE_SECRET_KEY;
    this.paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    this.baseURL = {
      flutterwave: 'https://api.flutterwave.com/v3',
      paystack: 'https://api.paystack.co'
    };
  }

  /**
   * Initialize payment with Flutterwave
   */
  async initializeFlutterwavePayment(paymentData) {
    try {
      const response = await axios.post(
        `${this.baseURL.flutterwave}/payments`,
        {
          tx_ref: paymentData.reference,
          amount: paymentData.amount,
          currency: paymentData.currency || 'NGN',
          redirect_url: paymentData.redirectUrl,
          customer: {
            email: paymentData.customerEmail,
            phonenumber: paymentData.customerPhone,
            name: paymentData.customerName
          },
          customizations: {
            title: paymentData.title || 'SalesHostel Payment',
            description: paymentData.description || 'Payment for order',
            logo: paymentData.logo
          }
        },
        {
          headers: {
            Authorization: `Bearer ${this.flutterwaveSecretKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        data: response.data.data,
        paymentUrl: response.data.data.link
      };
    } catch (error) {
      throw new Error(`Flutterwave payment initialization failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Initialize payment with Paystack
   */
  async initializePaystackPayment(paymentData) {
    try {
      const response = await axios.post(
        `${this.baseURL.paystack}/transaction/initialize`,
        {
          reference: paymentData.reference,
          amount: paymentData.amount * 100, // Paystack expects amount in kobo
          email: paymentData.customerEmail,
          currency: paymentData.currency || 'NGN',
          callback_url: paymentData.redirectUrl,
          metadata: {
            custom_fields: [
              {
                display_name: 'Customer Name',
                variable_name: 'customer_name',
                value: paymentData.customerName
              },
              {
                display_name: 'Order ID',
                variable_name: 'order_id',
                value: paymentData.orderId
              }
            ]
          }
        },
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecretKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        data: response.data.data,
        paymentUrl: response.data.data.authorization_url
      };
    } catch (error) {
      throw new Error(`Paystack payment initialization failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Verify Flutterwave payment
   */
  async verifyFlutterwavePayment(transactionId) {
    try {
      const response = await axios.get(
        `${this.baseURL.flutterwave}/transactions/${transactionId}/verify`,
        {
          headers: {
            Authorization: `Bearer ${this.flutterwaveSecretKey}`
          }
        }
      );

      const transaction = response.data.data;
      
      return {
        success: true,
        verified: transaction.status === 'successful',
        data: {
          reference: transaction.tx_ref,
          amount: transaction.amount,
          currency: transaction.currency,
          status: transaction.status,
          paymentType: transaction.payment_type,
          transactionId: transaction.id,
          customerEmail: transaction.customer.email
        }
      };
    } catch (error) {
      throw new Error(`Flutterwave payment verification failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Verify Paystack payment
   */
  async verifyPaystackPayment(reference) {
    try {
      const response = await axios.get(
        `${this.baseURL.paystack}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecretKey}`
          }
        }
      );

      const transaction = response.data.data;
      
      return {
        success: true,
        verified: transaction.status === 'success',
        data: {
          reference: transaction.reference,
          amount: transaction.amount / 100, // Convert from kobo to naira
          currency: transaction.currency,
          status: transaction.status,
          paymentType: transaction.channel,
          transactionId: transaction.id,
          customerEmail: transaction.customer.email,
          paidAt: transaction.paid_at
        }
      };
    } catch (error) {
      throw new Error(`Paystack payment verification failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Process refund (Flutterwave)
   */
  async processFlutterwaveRefund(transactionId, amount, reason) {
    try {
      const response = await axios.post(
        `${this.baseURL.flutterwave}/transactions/${transactionId}/refund`,
        {
          amount: amount,
          comments: reason
        },
        {
          headers: {
            Authorization: `Bearer ${this.flutterwaveSecretKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      throw new Error(`Flutterwave refund failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Process refund (Paystack)
   */
  async processPaystackRefund(transactionReference, amount, reason) {
    try {
      const response = await axios.post(
        `${this.baseURL.paystack}/refund`,
        {
          transaction: transactionReference,
          amount: amount * 100, // Convert to kobo
          currency: 'NGN',
          customer_note: reason,
          merchant_note: reason
        },
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecretKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      throw new Error(`Paystack refund failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Generate payment reference
   */
  generatePaymentReference(orderId) {
    const timestamp = Date.now();
    return `SH_${orderId}_${timestamp}`;
  }

  /**
   * Calculate payment fees
   */
  calculatePaymentFees(amount, provider = 'paystack') {
    let fee = 0;
    
    if (provider === 'paystack') {
      // Paystack charges 1.5% + NGN 100 for local cards
      fee = (amount * 0.015) + 100;
      // Cap at NGN 2000
      fee = Math.min(fee, 2000);
    } else if (provider === 'flutterwave') {
      // Flutterwave charges 1.4% for local cards
      fee = amount * 0.014;
    }

    return Math.round(fee * 100) / 100; // Round to 2 decimal places
  }

  /**
   * Validate payment webhook
   */
  validateWebhook(signature, payload, provider = 'paystack') {
    const crypto = require('crypto');
    
    if (provider === 'paystack') {
      const hash = crypto
        .createHmac('sha512', this.paystackSecretKey)
        .update(JSON.stringify(payload))
        .digest('hex');
      
      return hash === signature;
    } else if (provider === 'flutterwave') {
      const hash = crypto
        .createHmac('sha256', process.env.FLUTTERWAVE_WEBHOOK_SECRET)
        .update(JSON.stringify(payload))
        .digest('hex');
      
      return hash === signature;
    }
    
    return false;
  }

  /**
   * Process payment based on method
   */
  async processPayment(paymentData, method = 'paystack') {
    try {
      if (method === 'flutterwave') {
        return await this.initializeFlutterwavePayment(paymentData);
      } else if (method === 'paystack') {
        return await this.initializePaystackPayment(paymentData);
      } else {
        throw new Error('Unsupported payment method');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify payment based on method
   */
  async verifyPayment(identifier, method = 'paystack') {
    try {
      if (method === 'flutterwave') {
        return await this.verifyFlutterwavePayment(identifier);
      } else if (method === 'paystack') {
        return await this.verifyPaystackPayment(identifier);
      } else {
        throw new Error('Unsupported payment method');
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PaymentService();