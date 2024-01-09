  let currentStep = 1;
  let formData = {
    Name: "",
    Tid: "",
    email: "",
    password: "",
    year: "",
   section: "",
    subject: "",
    STid:""
  };
  var a;

  function nextStep() {
    if (currentStep === 1) {
        formData.email = document.getElementById("email").value;
        formData.password = document.getElementById("Pass").value;
      } else if (currentStep === 2) {
        formData.Name = document.getElementById("Name").value;
        formData.Tid = document.getElementById("Tid").value;
      } else if (currentStep === 3) {
        formData.year = document.getElementById("yr").value;
        formData.section = document.getElementById("section").value;
        formData.subject = document.getElementById("subject").value;
        formData.STid = document.getElementById("STid").value;
      }
    document.getElementById("step-" + currentStep).classList.remove("active");
    currentStep++;
    document.getElementById("step-" + currentStep).classList.add("active");
  }

  function prevStep() {
    document.getElementById("step-" + currentStep).classList.remove("active");
    currentStep--;
    document.getElementById("step-" + currentStep).classList.add("active");
  }

  function displayData() {
    fetch('/submitData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  //
  document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login");
  
    loginButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevents the form from submitting
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      
      console.log(email , password);
      fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.text())
    .then(data => {
        const messageDiv = document.getElementById('message');
        //messageDiv.innerText = data;
        console.log(messageDiv);
    })
    .catch(error => console.error('Error:', error));
    });
  }); 
  