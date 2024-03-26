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

// receive blog from admin.js

const blogReceiver = document.getElementById('blog-receiver');
const receivedBlog = localStorage.getItem('blog');

if (receivedBlog) {
    var receivedElement = document.createElement('div');
    blogReceiver.innerHTML = receivedBlog;
    var newContent = divElement.firstChild;
    blogReceiver.parentNode.insertBefore(newContent, blogReceiver);
} else {
    blogReceiver.innerHTML = 'No blog available';
}

localStorage.removeItem('blog');

