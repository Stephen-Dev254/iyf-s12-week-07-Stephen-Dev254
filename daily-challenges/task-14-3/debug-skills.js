// ==========================================
// Exercise 1: Console Methods
// ==========================================
const users = [
  { id: 1, name: 'Amina', role: 'Admin' },
  { id: 2, name: 'Brian', role: 'Member' },
];

console.log('Basic message');
console.log('%cImportant!', 'color: red; font-size: 20px;');
console.warn('This might be a problem');
console.error('This is definitely wrong');

console.table(users);

console.group('User Processing');
console.log('Step 1: Validate input');
console.log('Step 2: Save record');
console.groupEnd();

console.time('loopTimer');
let sum = 0;
for (let i = 0; i < 10000; i += 1) {
  sum += i;
}
console.timeEnd('loopTimer');

const positiveValue = 5;
console.assert(positiveValue > 0, 'positiveValue should be positive');
console.trace('Stack trace check');

// ==========================================
// Exercise 3: Fixed Buggy Code
// ==========================================
const DISCOUNT_THRESHOLD = 100;
const DISCOUNT_MULTIPLIER = 0.9;

export function calculateOrderTotal(items) {
  let total = 0;

  // Fix 1: Use i < items.length instead of i <= items.length
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    // Fix 2: Correct spelling from item.quanity to item.quantity
    total += item.price * item.quantity;
  }

  if (total > DISCOUNT_THRESHOLD) {
    total = total * DISCOUNT_MULTIPLIER;
  }

  return total;
}

// Test 1: Order under 100 (Expected: 69)
const standardOrder = [
  { name: 'Book', price: 15, quantity: 2 },
  { name: 'Pen', price: 3, quantity: 5 },
  { name: 'Notebook', price: 8, quantity: 3 },
];

console.log(
  'Standard order total (Expected 69):',
  calculateOrderTotal(standardOrder)
);

// Test 2: Order over 100 with 10% discount (120 * 0.9 = 108)
const largeOrder = [{ name: 'Headphones', price: 60, quantity: 2 }];

console.log(
  'Large order total with 10% discount (Expected 108):',
  calculateOrderTotal(largeOrder)
);
