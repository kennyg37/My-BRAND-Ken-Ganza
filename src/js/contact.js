var sidemenu = document.getElementById("mobile-menu");
function openmenu(){
    sidemenu.style.right = "0"
}
function closemenu() {
    sidemenu.style.right = "-350px"
}

const form = document.getElementById('contactForm');
const fname = document.getElementById('name');
const femail = document.getElementById('email');
const fmessage = document.getElementById('message');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const name = fname.value;
    const email = femail.value;
    const message = fmessage.value;
    const formData = {
        name: name,
        email: email,
        message: message
    }
    fetch('https://my-brand-ken-ganza-1.onrender.com/v1/contact/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Message sent successfully');
    })
    .catch(error => {
        console.log(error);
        alert('An error occured while sending your message');
    })
})

