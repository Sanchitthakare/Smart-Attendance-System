let currentStep=1;
async function fetchData() {
    if(currentStep==1){
        document.getElementById("step-" + currentStep).classList.remove("active");
        currentStep=2
  
    }
        document.getElementById("step-" + currentStep).classList.add("active");
    const response = await fetch('/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

    });
    const data = await response.json();
        var n=data.Name;
        var r=data.roll_no;
        var s=data.Subject;
        console.log(n,r,s);
        var displayElement1 = document.getElementById('Roll_No');
    displayElement1.innerText = r;
    var displayElement2 = document.getElementById('Roll_No');
    displayElement2.innerText = n;
    var displayElement3 = document.getElementById('Roll_No');
    displayElement3.innerText = s;
    document.getElementById("step-" + currentStep).classList.remove("active");
        
}

async function Absent()
{
    const Name = document.getElementById('Name').value;
    const Roll_No = document.getElementById('Roll_No').value;
    const response = await fetch('/absent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if(data.sucuss)
    {
        fetchData();
    }
}
async function Present()
{
    const Name = document.getElementById('Name').value;
    const Roll_No = document.getElementById('Roll_no').value;
    const response = await fetch('/present', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if(data.sucuss)
    {
        fetchData();
    }
}
