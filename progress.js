const progressBar = document.querySelector('.progress__bar');
const valueInput = document.querySelector('.value-input');
const animateToggle = document.querySelector('.animate-toggle');
const hideToggle = document.querySelector('.hide-toggle');

const minNum = Number(valueInput.min);
const maxNum = Number(valueInput.max);

function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
}

valueInput.addEventListener('input', function() {
    let numberValue = Number(this.value) || 0;
    this.value = clamp(numberValue, minNum, maxNum);
    progressBar.style.background = 
        `conic-gradient(#005dff ${numberValue * 360 / maxNum}deg, #eef3f6 0deg)`;
});

animateToggle.addEventListener('change', function () {
    progressBar.classList.toggle('progress-bar-animated', this.checked);
});

hideToggle.addEventListener('change', function () {
    progressBar.classList.toggle('progress-bar-hidden', this.checked);
});