document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const response = await fetch('/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (data.success) {
      alert(`Welcome ${data.name}!`);
      var a=data.section;
      window.location.href = '/attendancePage.html';
  } else {
      alert('Invalid credentials. Please try again.');
  }
});

