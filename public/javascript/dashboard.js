
const dashboardHomepageBtn = document.querySelector('#dashboard-homepage');
const dashboardHomepageButtonHandler = function(event) {
    event.preventDefault();
    // if location is dashboard button says homepage and routes there
    const location = window.location.toString().split('/')[window.location.toString().split('/').length-1]
    if(location === 'dashboard') {
        document.location.replace('/');
        return;
    } else {
        document.location.replace('/dashboard');
    }
};

const renameBtn = function() {
    const location = window.location.toString().split('/')[window.location.toString().split('/').length-1]
    if(location === 'dashboard') {
        dashboardHomepageBtn.textContent = 'homepage';
        return;
    } else {
        dashboardHomepageBtn.textContent = 'dashboard';
    }
};

renameBtn();

dashboardHomepageBtn.addEventListener('click', dashboardHomepageButtonHandler);