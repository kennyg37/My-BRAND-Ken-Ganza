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

document.getElementById('blog-form').addEventListener('submit', function(event) {
    
  event.preventDefault();

    var title = blogTitle.value;
    var subtitle = blogSubtitle.value;
    var content = blogContent.value;
    var image = blogImage.files[0];

    var reader = new FileReader();
    reader.onload = function(event) {
      var imageUrl = event.target.result;
      if (title === '') {
        blogError.textContent = '*Title is required';
        return;
      } else if (subtitle === '') {
          blogError.textContent = '*Subtitle is required';
          return;
      } else if (content === '') {
          blogError.textContent = '*Content is required';
          return;
      } else if (image === '') {
          blogError.textContent = '*Image is required';
          return;
      } else {
          alert('Blog uploaded successfully');
          blogForm.reset();
    }

      var divElement = document.createElement('div');
      divElement.classList.add('news');

      var divContainer = document.createElement('div');
      divContainer.classList.add('main-news');

      var divContent = document.createElement('div');
      divContent.classList.add('headline');

      var imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.alt = title;

      var h1Element = document.createElement('h1');
      h1Element.textContent = title;

      var spanElement = document.createElement('span');
      spanElement.textContent = subtitle;

      var pContent = document.createElement('p');
      pContent.textContent = content;

      var iconsDiv = document.createElement('div');
      iconsDiv.classList.add('icons');
      iconsDiv.innerHTML = `
        <div id="views">
            <i class="fa-regular fa-eye"></i>
            <p id="viewsCount"></p>
        </div>
        <div id="likes">
            <i class="fa-solid fa-thumbs-up"></i>
            <p id="likesCount"></p>
        </div>
        <div id="comments">
            <i class="fa-solid fa-comment"></i>
            <p id="commentsCount"></p>
        </div>
      `;

      
      divElement.appendChild(imgElement);
      divElement.appendChild(divContainer);
      divContainer.appendChild(divContent);
      divContainer.appendChild(iconsDiv);
      divContent.appendChild(h1Element);
      divContent.appendChild(spanElement);
      divContent.appendChild(pContent);

      localStorage.setItem('blog', divElement.innerHTML);
      window.location.href = 'blog.html';

};
  
      reader.readAsDataURL(image);

});