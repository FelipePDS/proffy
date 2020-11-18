const menuButton = document.querySelector('#menu-button');
const navSidebar = document.querySelector('#nav-sidebar');
const closeSidebar = document.querySelector('#button-close-sidebar');

menuButton.addEventListener('click', openAndCloseSidebar);
closeSidebar.addEventListener('click', openAndCloseSidebar);

function openAndCloseSidebar() {
    if (navSidebar.style.display === 'inline') {
        setTimeout(function() {
            navSidebar.style.display = 'none';
        }, 175)

        navSidebar.animate([
            { transform: 'translateX(0%)' },
            { transform: 'translateX(-100%)' }
        ], {
            duration: 200
        })
    } else {
        navSidebar.style.display = 'inline';

        navSidebar.animate([
            { transform: 'translateX(-100%)' },
            { transform: 'translateX(0%)' }
        ], {
            duration: 200
        });
    };
};

const homeContainer = document.querySelector('#home');
homeContainer.addEventListener('click', () => {
    window.location.href = '/';
});

const proffysContainer = document.querySelector('#proffys');
proffysContainer.addEventListener('click', () => {
    window.location.href = '/study';
});

const themeContainer = document.querySelector('#themes');
const buttonSetTheme = document.querySelector('.button-set-theme');
themeContainer.addEventListener('click', () => {
    buttonSetTheme.checked ? buttonSetTheme.checked = false : buttonSetTheme.checked = true
})

const optionsContainer = document.querySelector('#options');
optionsContainer.addEventListener('click', () => {
    console.log('Click')
})