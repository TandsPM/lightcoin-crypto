let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
    this.transaction = [];
  }

  get balance() {
    let balance = 0;
    for (let trans of this.transaction) {
      balance += trans.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transaction.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

    isAllowed() {
      return true;
    }

}

// Allow multiple accounts to be created
// Each account can have many transactions
// Allow withdrawals and deposits into accounts
// Allow us to retrieve the transaction history of an account (all withdrawals and deposits)
// Allow us to retrieve the current balance of the account at any time
// Don't allow withdrawals that exceed the remaining balance of the account



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

console.log('Starting balance:', myAccount.balance);

// t1 = new Withdrawal(50.25, myAccount);
// t1.commit();
const t1 = new Deposit(120.00, myAccount);
t1.commit();
// console.log('Transaction 1:', myAccount.balance);

// t2 = new Withdrawal(9.99, myAccount);
// t2.commit();
const t2 = new Withdrawal(50.00, myAccount);
t2.commit();
// console.log('Transaction 2:', t2);

// t3 = new Deposit(120.00, myAccount);
// t3.commit();
// console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);


