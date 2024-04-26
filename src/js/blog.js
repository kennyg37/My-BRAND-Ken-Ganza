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
        const blogContainer = document.getElementById('blog-receiver');
        blogContainer.innerHTML = ''; 

        if (data.length === 0) {
            blogContainer.innerHTML = `<div class="noblog">
            <h1>No blogs available yet<br></h1>
            <p><a href="">Login or signup</a> to gain access</p>
        </div>`
        } else {
            data.reverse().forEach(blog => { 
                const blogDiv = document.createElement('div');
                blogDiv.classList.add('news');
                blogContainer.appendChild(blogDiv);

                const blogImage = document.createElement('img');
                blogImage.src = blog.image;
                blogImage.alt = blog.title;
                blogImage.classList.add('blog-image');
                blogDiv.appendChild(blogImage);

                const newsContainer = document.createElement('div');
                newsContainer.classList.add('main-news');
                blogDiv.appendChild(newsContainer);


                const newsDetails = document.createElement('div');
                newsDetails.classList.add('headline');
                newsContainer.appendChild(newsDetails);
    
                const blogTitle = document.createElement('h1');
                blogTitle.textContent = blog.title;
                newsDetails.appendChild(blogTitle);
    
                const blogSubtitle = document.createElement('span');
                blogSubtitle.textContent = blog.subtitle;
                newsDetails.appendChild(blogSubtitle);
    
                const blogContent = document.createElement('p');
                blogContent.textContent = blog.content;
                newsDetails.appendChild(blogContent);
    

                const blogIcons = document.createElement('div');
                blogIcons.classList.add('icons');
                newsContainer.appendChild(blogIcons);

                const likeIconContainer = document.createElement('div');
                likeIconContainer.classList.add('likeIcon', 'icon');
                blogIcons.appendChild(likeIconContainer);
                
                const likeIcon = document.createElement('i');
                likeIcon.classList.add('fa-solid', 'fa-heart');
                likeIcon.setAttribute('onclick',  `toggleLike('${blog.id}')`);
                likeIconContainer.appendChild(likeIcon);
    
                const commentIconContainer = document.createElement('div');
                commentIconContainer.classList.add('commentIcon', 'icon');
                blogIcons.appendChild(commentIconContainer);

                const commentIcon = document.createElement('i');
                commentIcon.classList.add('fa-solid', 'fa-comment');
                commentIcon.setAttribute('onclick', `openoverlay('${blog.id}')`);
                commentIconContainer.appendChild(commentIcon);

                const shareIconContainer = document.createElement('div');
                shareIconContainer.classList.add('shareIcon', 'icon');
                blogIcons.appendChild(shareIconContainer);

                const shareIcon = document.createElement('i');
                shareIcon.classList.add('fas', 'fa-share');
                shareIconContainer.appendChild(shareIcon);
            });
        }
        
    })
} catch (error) {

}


function addLike(){
    const usertoken = localStorage.getItem('guest_token');
    fetch(`https://my-brand-ken-ganza-1.onrender.com/v1/blog/like/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usertoken}`
            }
    })
    .then(response => {
        if (!response.ok) {
            openalert('log in to like this blog');
            setTimeout(() => {
                closealert();
            }, 3000);
        }
        return response.json();
    })
    .then(data => {
        openalert('Blog liked successfully');
        setTimeout(() => {
            closealert();
        }, 3000);
    })
    .catch(error => {
        console.error('Error liking blog:', error);
    });
}
function unlike(){
    const usertoken = localStorage.getItem('guest_token');
    const id = localStorage.getItem('blogId');
    fetch(`https://my-brand-ken-ganza-1.onrender.com/v1/blog/delete/like/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usertoken}`
            }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        openalert('Blog unliked successfully');
        setTimeout(() => {
            closealert();
        }, 3000);
    })
    .catch(error => {
        console.error(error);
    });
}
function toggleLike(element) {
    if (element.classList.contains('liked')) {
      element.classList.remove('liked');
      unlike();
      const nlikes = parseInt(localStorage.getItem('likes'));
        const likes = document.querySelector('.lcount');
        likes.textContent = nlikes;
      console.log('unliked');
    } else {
      element.classList.add('liked');
      addLike();
      const nlikes = parseInt(localStorage.getItem('likes')) + 1;
      const likes = document.querySelector('.lcount');
      likes.textContent = nlikes;
      console.log('liked');
    //   setTimeout(() => {
    //     element.classList.remove('liked');
    //   }, 2000);
    }
  }

    
    const addCommentForm = document.getElementById('commentForm');
    const message = document.getElementById('message');
    
    addCommentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const comment = message.value;

        const id = localStorage.getItem('blogId');
        const usertoken = localStorage.getItem('guest_token');
        fetch(`https://my-brand-ken-ganza-1.onrender.com/v1/blog/comment/${id}`  , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usertoken}`
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
            addCommentForm.reset();
        }, 3000);
    })
    .catch(error => {
        console.log(error);
        openalert('An error occured while adding comment');
    })
    })


