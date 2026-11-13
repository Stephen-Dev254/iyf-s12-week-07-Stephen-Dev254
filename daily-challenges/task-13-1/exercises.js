// Exercise 1: Getting Started with localStorage
localStorage.setItem('username', 'Amina');
const username = localStorage.getItem('username');
console.log('Exercise 1 username:', username); // "Amina"

if (localStorage.getItem('username')) {
  console.log('User exists');
}

localStorage.removeItem('username');

// Exercise 2: Storing Objects (JSON)
const user = {
  name: 'Amina',
  age: 21,
  hobbies: ['coding', 'reading'],
};

localStorage.setItem('user', JSON.stringify(user));
const retrieved = JSON.parse(localStorage.getItem('user'));
console.log('Exercise 2 user:', retrieved);

// Exercise 3: Reusable Helper Functions
export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromStorage(key, defaultValue = null) {
  const data = localStorage.getItem(key);
  if (data === null) return defaultValue;
  try {
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
}

export function removeFromStorage(key) {
  localStorage.removeItem(key);
}

// Usage test
saveToStorage('settings', { theme: 'dark', fontSize: 16 });
const settings = getFromStorage('settings', { theme: 'light', fontSize: 14 });
console.log('Exercise 3 settings:', settings);
removeFromStorage('settings');
