 var sidemenu = document.getElementById("mobile-menu");
function openmenu(){
    sidemenu.style.right = "0"
}
function closemenu() {
    sidemenu.style.right = "-350px"
}

// preloader

function showPreloader() {
    document.getElementById('preloader').style.display = 'flex';
  }
  function hidePreloader() {
    document.getElementById('preloader').style.display = 'none';
  }
  
//   alert box

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
                const blogId = blog.id;
                likeIconContainer.id = `likeIconContainer_${blogId}`; 
                likeIconContainer.classList.add('likeIcon', 'icon');
                blogIcons.appendChild(likeIconContainer);

                const likeIcon = document.createElement('i');
                likeIcon.classList.add('fa-solid', 'fa-heart');
                likeIcon.setAttribute('onclick',  `toggleLike('${blogId}')`);
                likeIconContainer.appendChild(likeIcon);


                const likeCount = document.createElement('p');
                likeCount.classList.add('lcount');
                likeCount.textContent = blog.likes;
                likeIconContainer.appendChild(likeCount);
    
                const commentIconContainer = document.createElement('div');
                commentIconContainer.classList.add('commentIcon', 'icon');
                blogIcons.appendChild(commentIconContainer);


                const commentIcon = document.createElement('i');
                commentIcon.classList.add('fa-solid', 'fa-comment');
                commentIcon.setAttribute('onclick', `openoverlay('${blogId}')`);
                commentIconContainer.appendChild(commentIcon);

                const commentCount = document.createElement('p');
                commentCount.classList.add('ccount');
                commentCount.textContent = blog.commentsCount;
                commentIconContainer.appendChild(commentCount);


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

function toggleLike(blogId) {
    const likeIcon = document.getElementById(`likeIconContainer_${blogId}`);
    
    if (likeIcon.classList.contains('liked')) {
        likeIcon.classList.remove('liked');
        unlike(blogId);
        const likeCount = likeIcon.querySelector('.lcount');
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
        console.log('unliked');
    } else {
        likeIcon.classList.add('liked');
        addLike(blogId);
        const likeCount = likeIcon.querySelector('.lcount');
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
        console.log('liked');
    }
}


function addLike(blogId){
    const usertoken = localStorage.getItem('guest_token');
    const id = blogId;
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
        } else if(response === 401){
            openalert('log in to like this blog');
            setTimeout(() => {
                closealert();
                const likeIcon = document.getElementById(`likeIconContainer_${blogId}`);
                likeIcon.classList.remove('liked');
            }, 3000);
        } else{
            console.log('like request successful');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error liking blog:', error);
    });
}
function unlike(blogId){
    const usertoken = localStorage.getItem('guest_token');
    const id = blogId;
    fetch(`https://my-brand-ken-ganza-1.onrender.com/v1/blog/delete/like/${id}`, {
            method: 'DELETE',
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
        } else if(response === 401){
            openalert('log in to perform this action');
            setTimeout(() => {
                closealert();
            }, 3000);
        }
        return response.json();
    
    })
    .catch(error => {
        console.error(error);
    });
}

const overlay = document.querySelector('.overlay');

function openoverlay(blogId) {
    blogToggle(blogId);
    fetchComments(blogId)
        .then(comments => {
            displayComments(comments);
            overlay.style.display = 'block';
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 50);
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
}
function closeoverlay() {
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
}

async function fetchComments(blogId) {
    const response = await fetch(`https://my-brand-ken-ganza-1.onrender.com/v1/blog/data/comments/${blogId}`);
    if (!response.ok) {
        openalert('An error occured while fetching comments');
    }
    return await response.json();
}

function displayComments(comments) {
    const commenter = localStorage.getItem('gusername');
    const commentContainer = document.querySelector('.comments');
    commentContainer.innerHTML = '';

    if (comments.length === 0) {
        const noComment = document.createElement('p');
        noComment.textContent = 'No comments yet';
        commentContainer.appendChild(noComment);
    } else {
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentContainer.appendChild(commentDiv);
    
            const commentUser = document.createElement('h2');
            commentUser.textContent = commenter;
            commentUser.classList.add('cname');
            commentDiv.appendChild(commentUser);
    
            const commentContent = document.createElement('p');
            commentContent.classList.add('commentparagraph');
            commentContent.textContent = comment;
            commentDiv.appendChild(commentContent);
        });
    }
}

function blogToggle(blogId){
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
    });

        const addCommentForm = document.getElementById('commentForm');
        const message = document.getElementById('message');

        addCommentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            submitCommentForm(blogId);
            addCommentForm.reset();

            function submitCommentForm(blogId){
                const comment = message.value;
            const usertoken = localStorage.getItem('guest_token');

            showPreloader();
            fetch(`https://my-brand-ken-ganza-1.onrender.com/v1/blog/comment/${blogId}`  , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usertoken}`
            },
            body: JSON.stringify({
                comment: comment
            })
            })
            .then(response => {
                if (!response.ok) {
                    openalert('log in to comment on this blog');
                    setTimeout(() => {
                        hidePreloader();
                        closealert();
                        commentForm.reset();
                    }, 3000);
                } else if(response === 401){
                    openalert('log in to comment on this blog');
                    setTimeout(() => {
                        hidePreloader();
                        closealert();
                        commentForm.reset();
                        closeoverlay();
                    }, 3000);
                }
                else{
                    openalert('Comment added successfully');
                    setTimeout(() => {
                        hidePreloader();
                        closealert();
                        commentForm.reset();
                    }, 3000);
                }
                return response.json();
            })
            .catch(error => {
                console.log(error);
                openalert('An error occured while adding comment');
                setTimeout(() => {
                    closealert();
                }, 3000);
            });
        }
    });
}
    