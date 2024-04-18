document.getElementById('scroll-left').addEventListener('click', function() {
    document.querySelector('.other-news-container').scroll({
        left: document.querySelector('.other-news-container').scrollLeft - 100,
        behavior: 'smooth'
      });
  });
  
  document.getElementById('scroll-right').addEventListener('click', function() {
    document.querySelector('.other-news-container').scroll({
        left: document.querySelector('.other-news-container').scrollLeft + 100,
        behavior: 'smooth'
      });
  });
  var sidemenu = document.getElementById("mobile-menu");
function openmenu(){
    sidemenu.style.right = "0"
}
function closemenu() {
    sidemenu.style.right = "-350px"
}


