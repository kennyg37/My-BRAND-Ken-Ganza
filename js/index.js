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

