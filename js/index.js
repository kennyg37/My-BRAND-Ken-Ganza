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