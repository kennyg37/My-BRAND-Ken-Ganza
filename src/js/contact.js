const alertBox = document.querySelector('.alertBox');
const paragraph = document.querySelector('.alertBox p');


function closealert() {
    alertBox.style.opacity = '0';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 300);
}
function openalert(message) {
    paragraph.textContent =  message;
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.opacity = '1';
    }, 50);
}

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
    .then(response => {
        if (!response.ok) {
            openalert('An error occured while sending your message');
            setTimeout(() => {
                closealert();
            }, 3000);
        } else {
            openalert('Message sent successfully');
            setTimeout(() => {
                closealert();
                form.reset();
            }, 3000);
        }
    })
    .then(data => {
        console.log(data);
        
    })
    .catch(error => {
        console.log(error);
        openalert('An error occured while sending your message');
        setTimeout(() => {
            closealert();
        }, 3000);
    })
})

const subscribeForm = document.getElementById('subscribeForm');

subscribeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  try {
    fetch('https://my-brand-ken-ganza-1.onrender.com/v1/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    .then(response => {
        if (!response.ok) {
            openalert('An error occured while subscribing');
            setTimeout(() => {
                closealert();
            }, 3000);
        } else {
            openalert('Subscribed successfully');
            setTimeout(() => {
                closealert();
                subscribeForm.reset();
            }, 3000);
    }
})
    } catch (error) {
        console.error(error);
    }
})

