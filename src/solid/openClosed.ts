/*
  Implement an interface to extend functionality
*/
interface Customer {
  giveDiscount(): number;
  giveLoyaltyPoints(amountSpent: number): number;
}

class RegularCustomer implements Customer {
  giveDiscount(): number {
    return 10;
  }
  giveLoyaltyPoints(amountSpent: number) {
    return amountSpent;
  }
}

class PremiumCustomer implements Customer {
  giveDiscount(): number {
    return 20;
  }
  giveLoyaltyPoints(amountSpent: number) {
    return amountSpent * 2;
  }
}

class GoldCustomer implements Customer {
  giveDiscount(): number {
    return 30;
  }
  giveLoyaltyPoints(amountSpent: number) {
    return amountSpent * 3;
  }
}

class Discount {
  giveDiscount(customer: Customer): number {
    return customer.giveDiscount();
  }
}

/*
  Open for extension, closed for modification.

  Example:
  Assign customer discounts to various types of customers
*/
let goldCustomer: GoldCustomer = new GoldCustomer();
let discount: Discount = new Discount();
let finalValue = discount.giveDiscount(goldCustomer);

console.log(`finalValue: ${finalValue}`);
