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

try {
    fetch('https://my-brand-ken-ganza-1.onrender.com/v1/blog/data', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    const latestBlog = data[data.length - 1];
    const blogTitle = document.getElementById('blog-title');
    const blogSubtitle = document.getElementById('blog-subheading');
    const blogContent = document.getElementById('blog-content');
    const blogImage = document.getElementById('blog-image');

    blogTitle.textContent = latestBlog.title;
    blogSubtitle.textContent = latestBlog.subtitle;
    blogContent.textContent = latestBlog.content;
    
    const imagedata = latestBlog.image;
    blogImage.src = `data:image/png;base64,${imagedata}`;
    
})

}

catch (error) {
    console.log('An error occured while fetching blog data')
    console.log(error);
}
