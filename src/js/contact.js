// alert box
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

// preloader 
function showPreloader() {
  document.getElementById('preloader').style.display = 'flex';
}
function hidePreloader() {
  document.getElementById('preloader').style.display = 'none';
}

// mobile menu
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

    const name = fname.value;
    const email = femail.value;
    const message = fmessage.value;
    const formData = {
        name: name,
        email: email,
        message: message
    }
    showPreloader();
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
                hidePreloader();
                closealert();
            }, 3000);
        } else {
            openalert('Message sent successfully');
            setTimeout(() => {
                hidePreloader();
                closealert();
                form.reset();
            }, 3000);
        }
    })
    .catch(error => {
        console.log(error);
        openalert('An error occured while sending your message');
        setTimeout(() => {
            hidePreloader();
            closealert();
        }, 3000);
    })
})

const subscribeForm = document.getElementById('subscribeForm');

subscribeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('subscribe-email').value;
  try {
    showPreloader();
    fetch('https://my-brand-ken-ganza-1.onrender.com/v1/subscribe/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    })
    .then(response => {
        if (!response.ok) {
            openalert('An error occured while subscribing');
            setTimeout(() => {
                hidePreloader();
                closealert();
            }, 3000);
        } else {
            openalert('Subscribed successfully');
            setTimeout(() => {
                hidePreloader();
                closealert();
                subscribeForm.reset();
            }, 3000);
    }
})
    } catch (error) {
        console.error(error);
    }
})

