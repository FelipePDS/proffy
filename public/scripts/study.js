function selectAllProffys() {
    window.location.href = '/study';
}

function breakRowBio(bioContent) {
    const bioContentText = bioContent.innerHTML;
    const breakRow = bioContentText.replace(/&lt;br&gt;/g, '<br>');
    bioContent.innerHTML = breakRow;
}

const biosContent = document.querySelectorAll('#bioContent');
biosContent.forEach(bioContent => {
    breakRowBio(bioContent);
});