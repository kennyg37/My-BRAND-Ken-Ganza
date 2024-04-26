// Function to check if JWT token exists in local storage
function checkToken() {
  const token = localStorage.getItem('token');
  if (!token) {
      window.location.href = '/src/pages/404.html'; 
  }
}

window.onload = function() {
  checkToken();
};

    
function logout() {
  localStorage.removeItem('token');
  showPreloader();
  setTimeout(() => {
    hidePreloader();
    window.location.href = '/index.html';
  }, 3000);
}

// responsive navbar
function mobileMenu() {
  console.log('mobile menu clicked');
  document.querySelector('.admin-sidebar').style.left = '0';
  window.addEventListener('click', function(event) {
      if (event.target !== document.querySelector('.expand')) {
          document.querySelector('.admin-sidebar').style.left = '-100%';
      }
  });
}


// alertbox
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


var tabmenu = document.getElementsByClassName('tab-menu');
var tabcontent = document.getElementsByClassName('admin-main');

function openMenu(tab) {
    console.log(tab);
    let selectedTab = document.getElementById(tab);
    if (selectedTab) {
        console.log("Element with ID " + tab + " found.");
    } else {
        console.log("Element with ID " + tab + " not found.");
    }
    for (tab of tabmenu) {
        tab.classList.remove("active-tab");
    }
    for (content of tabcontent) {
        content.classList.remove("default-content");
    }
    event.currentTarget.classList.add('active-tab');
    selectedTab.classList.add('default-content');
    if (selectedTab.classList.contains('default-content')) {
        console.log("success");
    } else {
        console.log("failed");
    }
}

var settingContent = document.getElementsByClassName('setting-content');

function opensetting(setting) {
    let selectedSetting = document.getElementById(setting);
    console.log(selectedSetting);
    for (setcontent of settingContent) {
        setcontent.classList.remove("default-setting");
    }
    selectedSetting.classList.add('default-setting');
}




const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Views', 'Likes', 'Comments'],
    datasets: [{
      label: 'Past Month Statistics',
      data: [1200, 800, 300], 
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)', 
        'rgba(54, 162, 235, 0.2)', 
        'rgba(255, 206, 86, 0.2)' 
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
const ctz = document.getElementById('myChart2').getContext('2d');
const myChart2 = new Chart(ctz, {
  type: 'bar',
  data: {
    labels: ['Views', 'Likes', 'Comments'],
    datasets: [{
      label: 'Past Month Statistics',
      data: [5000, 3000, 2000], 
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)', 
        'rgba(54, 162, 235, 0.2)', 
        'rgba(255, 206, 86, 0.2)' 
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const uploadPic = document.getElementById('change-pic');
const profilePic = document.getElementById('upload-pic');

uploadPic.addEventListener('click', function() {
    profilePic.style.display = 'block';
}); 

const changeProfile = document.getElementById('change-profile');
const profileEdit = document.querySelector('.profile-edit');
const oldProfile = document.querySelector('.profile-main');

changeProfile.addEventListener('click', function() {
    profileEdit.style.display = 'block';
    oldProfile.style.display = 'none';
});


const addBlog = document.getElementById('add-blog');
const newBlog = document.querySelector('.new');
const allButton = document.getElementById('all-blogs');
const allBlogs = document.querySelector('.all'); 

addBlog.addEventListener('click', function() {
    newBlog.style.display = 'block';
    allBlogs.style.display = 'none';
    addBlog.style.display = 'none';
});
allButton.addEventListener('click', function() {
    newBlog.style.display = 'none';
    allBlogs.style.display = 'block';
    addBlog.style.display = 'block';
    retrieveAllBlogs();
})



document.getElementById('change-password-form').addEventListener('submit', function(event) {
    const newPasswordSettings = document.getElementById('new-password').value;
    const confirmPasswordSettings = document.getElementById('confirm-password').value;
    const newPasswordErrorSettings = document.getElementById('new-password-error');
    const confirmPasswordErrorSettings = document.getElementById('confirm-password-error');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    

    newPasswordErrorSettings.textContent = '';
    confirmPasswordErrorSettings.textContent = '';
    newPasswordInput.classList.remove('error-border');
    confirmPasswordInput.classList.remove('error-border');


    if (newPasswordSettings !== confirmPasswordSettings) {
        confirmPasswordErrorSettings.textContent = '*New Password and Confirm Password must match';
        confirmPasswordInput.classList.add('error-border');
        event.preventDefault();
        return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(newPasswordSettings)) {
        newPasswordErrorSettings.textContent = '*New Password must be at least 8 characters long and contain at least one digit and one uppercase letter';
        newPasswordInput.classList.add('error-border');
        event.preventDefault();
    }
});

document.getElementById('delete-account-form').addEventListener('submit', function(event) {
    const confirmation = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    
    if (!confirmation) {
        event.preventDefault();
    }
});

const openDeleteForm = document.getElementById('password-box');
const deleteForm = document.querySelector('.change-password');

openDeleteForm.addEventListener('click', function() {
    deleteForm.style.display = 'block';
});

const publishButton = document.getElementById('publish');

publishButton.addEventListener('click', function() {
    const confirmation = confirm('Are you sure you want to publish this blog?');
    if (!confirmation) {
        event.preventDefault();
    } else {
        window.location.href = './blog.html';
    }
});


// Blog upload

const blogForm = document.getElementById('blog-form');
const blogTitle = document.getElementById('blogTitle');
const blogSubtitle = document.getElementById('blogSubtitle');
const blogContent = document.getElementById('blogContent');
const uploadedImage = document.getElementById('uploadedImage');
const blogError = document.querySelector('.blog-error');


blogForm.addEventListener('submit', function(event) {
    
  event.preventDefault();
  verifyBlog();
});

const verifyBlog = () => {
    const title = blogTitle.value;
    const subtitle = blogSubtitle.value;
    const content = blogContent.value;
    const image = uploadedImage.files[0];
      if (title === '') {
        blogError.textContent = '*Title is required';
        return;
      } else if (subtitle === '') {
          blogError.textContent = '*Subtitle is required';
          return;
      } else if (content === '') {
          blogError.textContent = '*Content is required';
          return;
      }else if (image === undefined) {
          blogError.textContent = '*Image is required';
          return;
      } else {         
          sendBlog();
          blogForm.reset();
    }

};

const storedBlogInfo = [];

const sendBlog = () => {

    const title = blogTitle.value;
    const subtitle = blogSubtitle.value;
    const content = blogContent.value;
    const image = uploadedImage.files[0];

    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('content', content);
    formData.append('image', image);

    showPreloader();
    fetch('https://my-brand-ken-ganza-1.onrender.com/v1/blog/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
      },
        body: formData
    })
    .then(response =>{
      if (!response.ok) {
          hidePreloader();
          openalert('An error occured while uploading blog');
          setTimeout(() => {
              closealert();
          }, 3000);
      } else if (response.status === 401) {
          hidePreloader();
          openalert('session timeout redirecting to login page');
          setTimeout(() => {
              closealert();
              window.location.href = '/index.html';
          }, 3000);
        
    } else {
          hidePreloader();
          openalert('Blog uploaded successfully');
          setTimeout(() => {
              closealert();
          }, 3000);
      }
  })
    .then(data => {
      let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
      blogPosts.push({
        title: title,
        timestamp: new Date().toLocaleString(),
    });
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    
    const notificationContainer = document.querySelector('.activity');
    notificationContainer.innerHTML = '';
    if (blogPosts.length === 0) {
      notificationContainer.innerHTML = '<p>No recent activity </p>';
    } else {
      blogPosts.forEach(blog => {
        const notification = document.createElement('div');
        notification.classList.add('activity-card');

        const activityDetails = document.createElement('div');
        activityDetails.classList.add('activity-details');

        const activityTitle = document.createElement('p');
        activityTitle.textContent = blog.title;

        const activityTimestamp = document.createElement('p');
        activityTimestamp.textContent = blog.timestamp;

        const manipulate = document.createElement('div');
        manipulate.classList.add('manipulate');
        manipulate.innerHTML = `<button id="home-edit-button" onclick="editBlogHome()">Edit</button>
        <i class="fa-solid fa-trash" onclick="deleteBlogHome()"></i>`

        activityDetails.appendChild(activityTitle);
        activityDetails.appendChild(activityTimestamp);
        notification.appendChild(activityDetails);
        notification.appendChild(manipulate);
        notificationContainer.appendChild(notification);

      });
    }
  })
    .catch(error => {
      openalert('An error occured while uploading blog');
    });
};

//  users overlay

const overlay = document.querySelector('.overlay');

function openoverlay() {
  overlay.style.display = 'block';
  console.log('overlay opened')
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

//  messages overlay
function openSecOverlay() {
  document.querySelector('.ooverlay').style.display = 'block';
  document.querySelector('.ooverlay').style.opacity = '1';
}

function closeSecOverlay() {
  document.querySelector('.ooverlay').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.ooverlay').style.display = 'none';
  }, 300); 
}


document.addEventListener('click', function(event) {
  if (event.target === overlay) {
    closeoverlay();
  }
});


//  Retreive users

document.getElementById('show-users').addEventListener('click', function() {
  document.querySelector('.users').style.display = 'flex';
  setTimeout(() => {
    document.querySelector('.users').style.opacity = '1';   
  }, 300);

  try {
    const token = localStorage.getItem('token');
    fetch('https://my-brand-ken-ganza-1.onrender.com/v1/auth/data', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('User fetch failed');
      } else {
          return response.json();
      }
    })
    .then(data => {
      console.log(data);
      const users = data;
      const usersList = document.querySelector('.users');
      usersList.innerHTML = '';
      if (users.length === 0) {
        usersList.innerHTML = '<p>No users found</p>';
      } else {
        users.forEach(user => {
          const userCard = document.createElement('div');
          userCard.classList.add('user-card');
          
          const userDetails = document.createElement('div');
          userDetails.classList.add('user-details');
  
          const userName = document.createElement('p');
          userName.textContent = user.username;
  
          const userEmail = document.createElement('p');
          userEmail.textContent = user.email;
  
          const accountType = document.createElement('p');
          accountType.textContent = user.account;
  
          const profileIcon = document.createElement('i');
          profileIcon.classList.add('fa-solid', 'fa-user');
  
          const threeDots = document.createElement('i');
          threeDots.classList.add('fa-solid', 'fa-ellipsis-vertical');
          threeDots.setAttribute('onclick', 'openoverlay()');
  
          userDetails.appendChild(userName);
          userDetails.appendChild(userEmail);
          userDetails.appendChild(accountType);
          userCard.appendChild(profileIcon);
          userCard.appendChild(userDetails);
          userCard.appendChild(threeDots);
          usersList.appendChild(userCard);
        });
      }
      
    })
  
  }
  catch(error) {
    console.log(error);
  }
})

//  Delete user
document.querySelector('.userdelete').addEventListener('click', function() {
    document.querySelector('.delete-user-confirmation').style.display = 'block';
    document.getElementById('no').addEventListener('click', function() {
        document.querySelector('.delete-user-confirmation').style.display = 'none';
    
    });
    document.getElementById('yes').addEventListener('click', function() {
        const token = localStorage.getItem('token');
        try {
          fetch('https://my-brand-ken-ganza-1.onrender.com/v1/user/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
      })
      .then(response => {
        if (!response.ok) {
            throw new Error('User delete failed');
        } else {
            return response.json();
        }
          })
        }
        catch(error) {
          console.log(error);
        }
    });

});

//  Report user

document.querySelector('.reportUser').addEventListener('click', function() {
    document.querySelector('.report-user-confirmation').style.display = 'block';
    document.getElementById('nope').addEventListener('click', function() {
      document.querySelector('.report-user-confirmation').style.display = 'none';
    });
    document.getElementById('reportUserForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const reason = document.getElementById('report-reason').value;
        const token = localStorage.getItem('token');
        try {
          fetch('https://my-brand-ken-ganza-1.onrender.com/v1/user/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({reason})
      })
      .then(response => {
        if (!response.ok) {
            throw new Error('User report failed');
        } else {
            return response.json();
        }
          })
        }
        catch(error) {
          console.log(error);
        }
    });
});

//  Message user

document.querySelector('.messageUser').addEventListener('click', function() {
    document.querySelector('.message-user-confirmation').style.display = 'block';
    document.getElementById('messageUser').addEventListener('submit', function(event) {
        event.preventDefault();
        const message = document.getElementById('message-user').value;
        const token = localStorage.getItem('token');
        try {
          fetch('https://my-brand-ken-ganza-1.onrender.com/v1/user/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({message})
      })
      .then(response => {
        if (!response.ok) {
            throw new Error('User message failed');
        } else {
            return response.json();
        }
          })
        }
        catch(error) {
          console.log(error);
        }
    });
});


// retrive subscribed users and messages section

document.getElementById('show-messages').addEventListener('click', function() {
    document.querySelector('.contacts').style.display = 'flex';
    document.querySelector('.subscribers').style.display = 'none';
    setTimeout(() => {
      document.querySelector('.contacts').style.opacity = '1';   
    }, 300);
    
    try {
      const token = localStorage.getItem('token');
      fetch('https://my-brand-ken-ganza-1.onrender.com/v1/contact/data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
      } 
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Messages fetch failed');
      } else {
          return response.json();
      }
    })
    .then(data => {
      console.log(data);
      const messages = data;
      const messagesContainer = document.querySelector('.contacts')
      messagesContainer.innerHTML = '';
      if (messages.length === 0){
        messagesContainer.innerHTML = '<p>No messages yet</p>';
      } else {
        messages.forEach(message => {
          const messageCard = document.createElement('div')
          messageCard.classList.add('contact-card')

          const messageDetails = document.createElement('div')
          messageDetails.classList.add('contact-details')

          const messageSender = document.createElement('p')
          messageSender.textContent = message.name

          const messageEmail = document.createElement('p')
          messageEmail.textContent = message.email

          const messageContent = document.createElement('p')
          messageContent.textContent = message.message

          const messageIcon = document.createElement('i')
          messageIcon.classList.add('fa-solid', 'fa-message')

          const threeDotsIcon = document.createElement('i')
          threeDotsIcon.classList.add('fa-solid', 'fa-ellipsis-vertical')
          threeDotsIcon.setAttribute('onclick', 'openSecOverlay()')


          messagesContainer.appendChild(messageCard)
          messageCard.appendChild(messageIcon)
          messageDetails.appendChild(messageSender)
          messageDetails.appendChild(messageEmail)
          messageDetails.appendChild(messageContent)
          messageCard.appendChild(messageDetails)
          messageCard.appendChild(threeDotsIcon)
        })
      }
    })
  }
    catch(error) {
      console.log(error);
    }
});

// Retreive subscribers

document.getElementById('show-subs').addEventListener('click', function() {
    document.querySelector('.subscribers').style.display = 'block';
    document.querySelector('.contacts').style.display = 'none';
    setTimeout(() => {
      document.querySelector('.subscribers').style.opacity = '1';   
    }, 300);
    try {
      const tableBody = document.getElementById('table-body');
      const token = localStorage.getItem('token');
      fetch('https://my-brand-ken-ganza-1.onrender.com/v1/subscribe/data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Subscribers fetch failed');
    } else {
        return response.json();
    }
  })
  .then(data => {
    data.forEach(item => {
      const subscribedAt = new Date(item.subscribedAt);
      const now = new Date();

      let timeAgo;
      const diffMs = now - subscribedAt;

      if (diffMs < 60000) {
        timeAgo = 'just now';
      } else if (diffMs < 3600000) { 
        const minutes = Math.floor(diffMs / 60000);
        timeAgo = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else if (diffMs < 86400000) { 
        const hours = Math.floor(diffMs / 3600000);
        timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else { // More than a day
        const days = Math.floor(diffMs / 86400000);
        timeAgo = `${days} day${days > 1 ? 's' : ''} ago`;
      }

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.email}</td>
        <td>Subscribed ${timeAgo}</td>
        <td>${item.subscribed ? 'Yes' : 'No'}</td>
      `;
      tableBody.appendChild(row);
    });
  })

  }
  catch(error) {
    console.log(error);
  }
});

// alertbox

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

// latest blog show
// try {
//   const token = localStorage.getItem('token');
//   fetch('https://my-brand-ken-ganza-1.onrender.com/v1/blog/data', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     })
//   .then(response => response.json())
//   .then(data => {

//       const latestBlog = data[data.length - 1];
//       const blogTitle = document.getElementById('blog-title');
//       const blogSubtitle = document.getElementById('blog-subheader');
//       const blogContent = document.getElementById('blog-content');
//       const blogImage = document.getElementById('blog-image');
      
//       if (data.length === 0) {
//         blogTitle.textContent = 'No blog posted yet';
//       } else {
//         blogTitle.textContent = latestBlog.title;
//       blogSubtitle.textContent = latestBlog.subtitle;
//       blogContent.textContent = latestBlog.content;

//       const imagedata = latestBlog.image;
//       blogImage.src = imagedata;

//       }

//   })
// } catch (error) {
//     console.error('An error occurred while fetching blog data:', error);
//     throw error;
// }


// Assuming 'data' is the array of blogs received from the server


function retrieveAllBlogs(){
  
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
      .then(posts => {
        const blogs = posts;
        console.log(blogs);
        const blogContainer = document.querySelector('.all-blogs-container');
        blogContainer.innerHTML = '';
        if (blogs.length === 0) {
          const noBlog = document.createElement('p');
          noBlog.textContent = 'No blogs available';
          noBlog.classList.add('admin-no-blog');
          blogContainer.appendChild(noBlog);
        } else {
          blogs.reverse().forEach(blog => {
              const blogDiv = document.createElement('div');
              blogDiv.classList.add('admin-blog-post');
              blogContainer.appendChild(blogDiv);

              const blogImage = document.createElement('img');
              blogImage.src = blog.image;
              blogImage.alt = blog.title;
              blogImage.classList.add('admin-blog-image');
              blogDiv.appendChild(blogImage);

              const blogTitle = document.createElement('h2');
              blogTitle.textContent = blog.title;
              blogTitle.classList.add('admin-blog-title');
              blogDiv.appendChild(blogTitle);

              const blogSubtitle = document.createElement('p');
              blogSubtitle.textContent = blog.subtitle;
              blogSubtitle.classList.add('admin-blog-subtitle');
              blogDiv.appendChild(blogSubtitle);

              const blogContent = document.createElement('p');
              blogContent.textContent = blog.content;
              blogContent.classList.add('admin-blog-content');
              blogDiv.appendChild(blogContent);

          });
  }

      })
  }
  catch(error) {
    openalert('An error occured while fetching blog data');
    setTimeout(() => {
        closealert();
    }, 3000);
  }
}

{
  const profile = document.querySelector('.AdminUserProfile');
  const adminUserName = localStorage.getItem('username');
  const adminAccount = localStorage.getItem('account');
  
  profile.innerHTML = `
  <h2>${adminUserName}</h2>
  <p>${adminAccount}</p>
  `;
  
     
  const userSection = document.querySelector('.user-id');
      userSection.innerHTML = `
          <h2>${adminUserName}</h2>
          <p>${adminAccount}</p>
      `;
  }
  
