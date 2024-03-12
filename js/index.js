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
    sidemenu.style.right = "0"
}
function closemenu() {
    sidemenu.style.right = "-350px"
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
const email = document.getElementById('s-email');
const password = document.getElementById('s-password');
const confirmPassword = document.getElementById('confirm-password');


signupForm.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
    if (validateInputs()) {
        signupForm.submit();
        switchToSignup();
    } else {
        return false;
    }
});

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

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

   
    if (passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters.');
    } else if (!/[A-Z]/.test(passwordValue)) {
        setError(password, 'Password must contain at least one uppercase letter');
    } else {
        setSuccess(password);
    }

    if(confirmPasswordValue === '') {
        setError(confirmPassword, 'Please confirm your password');
    } else if (confirmPasswordValue !== passwordValue) {
        setError(confirmPassword, "Passwords doesn't match");
    } else {
        setSuccess(confirmPassword);
    }

    return switchToSignup();

};
