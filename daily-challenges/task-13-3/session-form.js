// Exercise: Understanding the Difference
sessionStorage.setItem('tempData', 'This disappears on close');
localStorage.setItem('permanentData', 'This stays forever');

console.log('sessionStorage tempData:', sessionStorage.getItem('tempData'));
console.log(
  'localStorage permanentData:',
  localStorage.getItem('permanentData')
);

// Build: Auto-saving form using sessionStorage
const form = document.getElementById('contact-form');
const statusMsg = document.getElementById('status-msg');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach((input) => {
  const saved = sessionStorage.getItem(`form_${input.name}`);
  if (saved) {
    input.value = saved;
  }

  input.addEventListener('input', () => {
    sessionStorage.setItem(`form_${input.name}`, input.value);
    statusMsg.textContent = '';
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  inputs.forEach((input) => {
    sessionStorage.removeItem(`form_${input.name}`);
  });

  form.reset();
  statusMsg.textContent = 'Message sent! Session storage draft cleared.';
});
