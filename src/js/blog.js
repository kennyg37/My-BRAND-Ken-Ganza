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

const overlay = document.querySelector('.overlay');

function openoverlay() {
    overlay.style.display = 'block';
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 50); 
  }
  
  function closeoverlay() {
    overlay.style.opacity = '0'; 
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 300); 
  }

const addBlog = document.getElementById('add-blog');
const commentForm = document.getElementById('comment-form');
const comments = document.querySelector('.comments');
const switchButton = document.getElementById('switch');

addBlog.addEventListener('click', function() {
    commentForm.style.display = 'block';
    comments.style.display = 'none';
    addBlog.style.display = 'none';
    switchButton.style.display = 'block';

});
switchButton.addEventListener('click', function() {
    commentForm.style.display = 'none';
    comments.style.display = 'block';
    addBlog.style.display = 'block';
    switchButton.style.display = 'none';
})

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

function toggleLike(element) {
    if (element.classList.contains('liked')) {
      element.classList.remove('liked');
      console.log('unliked');
    } else {
      element.classList.add('liked');
      console.log('liked');
    //   setTimeout(() => {
    //     element.classList.remove('liked');
    //   }, 2000);
    }
  }
  


try {

    const token = localStorage.getItem('token');
    fetch('https://my-brand-ken-ganza-1.onrender.com/v1/blog/data', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        
    }
})
.then(response => response.json())
.then(data => {
    const latestBlog = data[data.length - 1];
    const blogTitle = document.getElementById('blog-title');
    const blogSubtitle = document.getElementById('blog-subheader');
    const blogContent = document.getElementById('blog-content');
    const blogImage = document.getElementById('blog-image');

    blogTitle.textContent = latestBlog.title;
    blogSubtitle.textContent = latestBlog.subtitle;
    blogContent.textContent = latestBlog.content;
    
    const imagedata = latestBlog.image;
    blogImage.src = imagedata;
    
})

}

catch (error) {
    console.log('An error occured while fetching blog data')
    console.log(error);
}

function addLike(){
    fetch('https://my-brand-ken-ganza-1.onrender.com/v1//blog/like/:${id}', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

function addComment() {
    const comment = document.getElementById('comment').value;
    fetch('https://my-brand-ken-ganza-1.onrender.com/v1/blog/comment/:${id}', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            comment: comment
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        openalert('Comment added successfully');
        setTimeout(() => {
            closealert();
        }, 3000);
    })
    .catch(error => {
        console.log(error);
        openalert('An error occured while adding comment');
    })
}