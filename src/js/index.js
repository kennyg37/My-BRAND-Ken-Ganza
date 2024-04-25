document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                /*observer.unobserve(entry.target);*/
            }else {
                entry.target.classList.remove('visible'); 
            }
        });
    });

    const fadeDivs = document.querySelectorAll('.main-div');
    fadeDivs.forEach(element => {
        observer.observe(element)
    })
});

var sidemenu = document.getElementById("mobile-menu");
function openmenu(){
    sidemenu.style.right = "90px"
}
function closemenu() {
    sidemenu.style.right = "-190px"
}

// alertBox
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



const openOverlayBtn = document.getElementById('openOverlay');
const overlay = document.getElementById('overlay');
const logIn = document.querySelector('.login-container');
const signUp = document.querySelector('.signup-container');

function switchToLogin() {
    logIn.style.display = 'block';
    signUp.style.display = 'none';
}

function switchToSignup() {
    logIn.style.display = 'none';
    signUp.style.display = 'block';
}
function closeOverlay() {
    overlay.style.left = '-100%';
}

openOverlayBtn.addEventListener('click', () => {
    overlay.style.left = '0';
});

function overlayOpen () {
    overlay.style.left = '0';
}

// Form validation

const signupForm = document.getElementById('signup-form');
const username = document.getElementById('s-username');
const email = document.getElementById('s-email');
const password = document.getElementById('s-password');
const confirmPassword = document.getElementById('confirm-password');
const account = document.getElementById('account-type')
const submitButton = document.getElementById('submit-btn');


signupForm.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();

});

function sendForm(){
    const vusername = username.value
    const vemail = email.value
    const vpassowrd = password.value
    const vconfirm = confirmPassword.value
    const vaccount = account.value

    let requestBody = {};

    if (vaccount === 'admin'){
        requestBody = {
            account: 'admin',
            username: vusername,
            email: vemail,
            password: vpassowrd,
            confirmPassword: vconfirm
        }

    } else if (vaccount === 'guest'){
        requestBody = {
            account: 'guest',
            username: vusername,
            email: vemail,
            password: vpassowrd,
            confirmPassword: vconfirm
        }
    } else {
        console.log('No account type specified')
    }
    showPreloader();
    fetch('https://my-brand-ken-ganza-1.onrender.com/v1/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok){
            openalert('Account creation failed');
            setTimeout(() => {
                closealert();
            }, 3000);
        } else {
            console.log('success')
            hidePreloader();
            openalert('Account created successfully');
            setTimeout(() => {
                closealert();
                signupForm .reset();
            }, 3000);
        }
    })
    .catch(error => {
        console.error('error:', error);
    })


}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.input-error');

    errorDisplay.innerText = message;
    inputControl.classList.add('input-error');
    inputControl.classList.remove('input-success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.input-error');

    errorDisplay.innerText = '';
    inputControl.classList.add('input-success');
    inputControl.classList.remove('input-error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const validateInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    let isValid = true;

    if(emailValue === '') {
        setError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
        isValid = false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters.');
        isValid = false;
    } else if (!/[A-Z]/.test(passwordValue)) {
        setError(password, 'Password must contain at least one uppercase letter');
        isValid = false;
    } else {
        setSuccess(password);
    }

    if(confirmPasswordValue === '') {
        setError(confirmPassword, 'Please confirm your password');
        isValid = false;
    } else if (confirmPasswordValue !== passwordValue) {
        setError(confirmPassword, "Passwords don't match");
        isValid = false;
    } else {
        setSuccess(confirmPassword);
    }

    if (isValid) {
        sendForm();
    }

    return isValid;
};

// Login form validation

const loginForm = document.getElementById('login-form');
const loginUsername = document.getElementById('l-username');
const loginPassword = document.getElementById('l-password');
const loginButton = document.getElementById('login-btn');
const loginAcc = document.getElementById('l-account-type');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    validateLoginInputs();
});

function sendLogin(){
    const vusername = loginUsername.value
    const vpassowrd = loginPassword.value
    const vaccount = loginAcc.value

    let requestBody = {};

    if (vaccount === 'admin'){
        requestBody = {
            account: 'admin',
            username: vusername,
            password: vpassowrd
        }
        showPreloader();
        fetch('https://my-brand-ken-ganza-1.onrender.com/v1/auth/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response =>{
        if (!response.ok) {
            throw new Error('login failed');
        } else {
            return response.json();
        }
    })
    .then(json => {
        if (json.token){
            console.log('admin login success')
            localStorage.setItem('token', json.token);
            setTimeout(() => {
                hidePreloader();
                window.location.href = './src/pages/admin.html';
            }, 5000);
        } else {
            console.log('unsuccessful')
        }

    })
    .catch(error => {
        console.error('error:', error);
    })
} else if (vaccount === 'guest'){
    localStorage.setItem('username', vusername);
    requestBody = {
        account: 'guest',
        username: vusername,
        password: vpassowrd
    }
    fetch('https://my-brand-ken-ganza-1.onrender.com/v1/auth/guest/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response =>{
        if (!response.ok) {
            console.log('login failed')
            openalert('Login failed, check your credentials');
            setTimeout(() => {
                closealert();
            }, 3000);  
        } else {
            return response.json();
        }
    })
    .then(json => {
        if (json.token){
            console.log('success')
            localStorage.setItem('guest_token', json.token);
            
            showPreloader();
            setTimeout(() => {
                hidePreloader();
                window.location.href = './src/pages/blog.html';
            }, 5000);
        } else {
            console.log('unsuccessful')
        }

    })
    .catch(error => {
        console.error('error:', error);
    })
}

    } 

const validateLoginInputs = () => {
    const usernameValue = loginUsername.value.trim();
    const passwordValue = loginPassword.value.trim();

    let isValid = true;

    if(usernameValue === '') {
        setError(loginUsername, 'Username is required');
        isValid = false;
    } else {
        setSuccess(loginUsername);
    }

    if (passwordValue === '') {
        setError(loginPassword, 'Password is required');
        isValid = false;
    } else if (passwordValue.length < 8) {
        setError(loginPassword, 'Password must be at least 8 characters.');
        isValid = false;
    } else {
        setSuccess(loginPassword);
    }

    if (isValid) {
        showPreloader();
        sendLogin();
    }

    return isValid;
};

