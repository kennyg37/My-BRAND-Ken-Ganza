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
const oldBlog = document.querySelector('.old');
const oldButton = document.getElementById('old-blogs'); 

addBlog.addEventListener('click', function() {
    newBlog.style.display = 'block';
    oldBlog.style.display = 'none';
    addBlog.style.display = 'none';
    oldButton.style.display = 'none';
});

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

var blogForm = document.getElementById('blog-form');
var blogTitle = document.getElementById('blog-title');
var blogSubtitle = document.getElementById('blog-subtitle');
var blogContent = document.getElementById('blog-content');
var blogImage = document.getElementById('blog-image');
var blogError = document.querySelector('.blog-error');


blogForm.addEventListener('submit', function(event) {
    
  event.preventDefault();
  verifyBlog();
});

const verifyBlog = () => {
    const title = blogTitle.value;
    const subtitle = blogSubtitle.value;
    const content = blogContent.value;
    const image = blogImage.files[0];
      if (title === '') {
        blogError.textContent = '*Title is required';
        return;
      } else if (subtitle === '') {
          blogError.textContent = '*Subtitle is required';
          return;
      } else if (content === '') {
          blogError.textContent = '*Content is required';
          return;
      } else {
          alert('Blog uploaded successfully');
          sendBlog();
          blogForm.reset();
    }

};

const sendBlog = () => {

    const title = blogTitle.value;
    const subtitle = blogSubtitle.value;
    const content = blogContent.value;
    const image = blogImage.files[0];

    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('content', content);
    formData.append('image', image);

    fetch('https://my-brand-ken-ganza-1.onrender.com/v1/blog/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
      },
        body: formData
    })
    .then(response =>{
      if (!response.ok) {
          throw new Error('Blog upload failed');
      } else {
          return response.json();
      }
  })
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

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

    setTimeout(() => {
      document.querySelector('.contacts').style.opacity = '1';   
    }, 300);
    
});

document.getElementById('show-subs').addEventListener('click', function() {
    document.querySelector('.subscribers').style.display = 'block';

    setTimeout(() => {
      document.querySelector('.subscribers').style.opacity = '1';   
    }, 300);
});