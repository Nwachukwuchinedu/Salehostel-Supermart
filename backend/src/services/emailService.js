// Email Service
class EmailService {
  // Send email
  async sendEmail(options) {
    // Implementation will be added later
    return { message: 'Email sent', options };
  }

  // Send registration email
  async sendRegistrationEmail(user) {
    // Implementation will be added later
    return { message: 'Registration email sent', user };
  }

  // Send order confirmation
  async sendOrderConfirmation(order) {
    // Implementation will be added later
    return { message: 'Order confirmation sent', order };
  }

  // Send password reset
  async sendPasswordReset(email, token) {
    // Implementation will be added later
    return { message: 'Password reset email sent', email, token };
  }
}

module.exports = new EmailService();