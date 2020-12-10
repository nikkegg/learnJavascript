'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Fake Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Shorter querySelector
const select = element => document.querySelector(element)

// Elements
const labelWelcome = select('.welcome');
const labelDate = select('.date');
const labelBalance = select('.balance__value');
const labelSumIn = select('.summary__value--in');
const labelSumOut = select('.summary__value--out');
const labelSumInterest = select(
  '.summary__value--interest');
const labelTimer = select('.timer');

const containerApp = select('.app');
const containerMovements = select('.movements');

const btnLogin = select('.login__btn');
const btnTransfer = select('.form__btn--transfer');
const btnLoan = select('.form__btn--loan');
const btnClose = select('.form__btn--close');
const btnSort = select('.btn--sort');

const inputLoginUsername = select('.login__input--user');
const inputLoginPin = select('.login__input--pin');
const inputTransferTo = select('.form__input--to');
const inputTransferAmount = select(
  '.form__input--amount');
const inputLoanAmount = select(
  '.form__input--loan-amount');
const inputCloseUsername = select('.form__input--user');
const inputClosePin = select('.form__input--pin');

// Creating usernames based on initials of an owner
const createUsernames = (accounts) => {
  accounts.forEach(function(account) {
    const names = account.owner.split(' ');
    let initials = '';
    names.forEach(name => initials += name.toLowerCase()[0]);
    account['username'] = initials;
  })
}
// Displaying transactions
const displayMovements = function(movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html =
      `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date"></div>
          <div class="movements__value">${mov}€</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}

// Calculating current balance
const calcAndDisplayBalance = (acc) => {
  const balance = acc.movements.reduce((acc,movement) => acc + movement, 0);
  acc.balance = balance;
  labelBalance.textContent = `${balance}€`; 
}

// Calculating and displaying total withdrawals and deposits
const calcDisplaySummary = movements => {
  const deposits = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov)
  const withdrawals = -movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov)
  labelSumOut.textContent = `${withdrawals}€`
  labelSumIn.textContent = `${deposits}€`
}

// Update UI after transaction
const updateUI = currentAccount => {
  calcDisplaySummary(currentAccount.movements);
  calcAndDisplayBalance(currentAccount);
  displayMovements(currentAccount.movements);
}

createUsernames(accounts);

// login functionality
let currentAccount;
btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`;
    updateUI(currentAccount);
    containerApp.style.opacity = '1';
    // Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // making pin field loos its focus;
    inputLoginPin.blur();
  }  
});

//  Transfer functionality
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find((acc) => acc.username ===
    inputTransferTo.value);
  if (receiver && amount > 0 && currentAccount.balance >= amount &&
    receiver?.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    receiver.movements.push(amount);
    inputTransferAmount.value = inputTransferTo.value = '';
    updateUI(currentAccount);
  }
})

// Close account functionality
btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);
    containerApp.style.opacity = 0;
    accounts.splice(index,1);
    inputCloseUsername.value = inputClosePin.value = '';
  }
})

// Loan functionality
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (loanAmount && loanAmount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * loanAmount)) {
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
})

