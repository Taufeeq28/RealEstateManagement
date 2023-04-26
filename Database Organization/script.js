const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = form.querySelector('#name').value;
  const email = form.querySelector('#email').value;
  const password = form.querySelector('#password').value;
  const role = form.querySelector('input[name="role"]:checked').value;
  const agency = form.querySelector('#agency').value;
  const jobTitle = form.querySelector('#job-title').value;
  const contactInfo = form.querySelector('#contact-info').value;
  const budget = form.querySelector('#budget').value;
  const preferred_location = form.querySelector('#preferred_location').value;
  const move_in_date = form.querySelector('#move_in_date').value;
  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role, agency, jobTitle, contactInfo, budget, preferred_location, move_in_date}),
    });

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
});

const agentForm = document.getElementById('agent-form');
const renterForm = document.getElementById('renter-form');

const agentRadio = document.getElementById('agent');
const renterRadio = document.getElementById('renter');

agentRadio.addEventListener('change', (event) => {
  if (event.target.checked) {
    agentForm.classList.remove('hidden');
    renterForm.classList.add('hidden');
  }
});

renterRadio.addEventListener('change', (event) => {
  if (event.target.checked) {
    renterForm.classList.remove('hidden');
    agentForm.classList.add('hidden');
  }
});