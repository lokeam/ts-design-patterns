
/*
  All of child classes to inherit.
  User should not create new instance of Payment Processor.
  Some static methods may be called from Payment Processor.
*/
abstract class PaymentProcessor {
  abstract processPayment(amount: number):void;
}

class CreditCardProcessor extends PaymentProcessor{
  processPayment(amount: number): void {
    console.log(`Processing credit card payments - $${amount}`);
  }
}

class DebitCardProcessor extends PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing debit card payments - $${amount}`);
  }
}

class PayPalProcessor extends PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing PayPal payments - $${amount}`);
  }
}

function executePayment(
  paymentProcessor: PaymentProcessor,
  amount: number
): void {
  paymentProcessor.processPayment(amount);
}

let creditCardProcessor = new CreditCardProcessor();
let debitCardProcessor = new DebitCardProcessor();
let payPalProcessor = new PayPalProcessor();

executePayment(creditCardProcessor, 100);
executePayment(debitCardProcessor, 50);
executePayment(payPalProcessor, 150);
