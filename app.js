import Progress from './progress.js';

class App {
    constructor() {
        this.progress = new Progress(0, 100, 0);
        
        this.progressBar = document.querySelector('.progress__bar');
        this.valueInput = document.querySelector('.value-input');
        this.animateToggle = document.querySelector('.animate-toggle');
        this.hideToggle = document.querySelector('.hide-toggle');
        
        this._bindEvents();
    }

    _bindEvents() {
        this.valueInput.addEventListener('input', (e) => {
            this.progress.setValue(Number(e.target.value) || 0);
            this._renderProgressBarValue();
        });
        
        this.animateToggle.addEventListener('change', (e) => {
            this.progress.setAnimation(e.target.checked);
            this._renderAnimateToggle();
        });
        
        this.hideToggle.addEventListener('change', (e) => {
            this.progress.setVisibility(!e.target.checked);
            this._renderHideToggle();
        });
    }

    _renderProgressBarValue() {
        this.valueInput.value = this.progress.value;
        this.progressBar.style.background = 
            `conic-gradient(#005dff ${this.progress.getAngle()}deg, #eef3f6 0deg)`;
    }

    _renderAnimateToggle() {
        this.animateToggle.checked = this.progress.isAnimated;
        this.progressBar.classList.toggle('progress-bar-animated', this.progress.isAnimated);
    }

    _renderHideToggle() {
        this.hideToggle.checked = this.progress.isHidden;
        if (this.progress.isHidden) {
            this.progressBar.style.background = "unset";
        } else {
            this.progressBar.style.background =
                `conic-gradient(#005dff ${this.progress.getAngle()}deg, #eef3f6 0deg)`;
        }
    }

    setValue(value) {
        this.progress.setValue(Number(value) || 0);
        this._renderProgressBarValue();
    }

    toggleAnimation() {
        this.progress.setAnimation(!this.progress.isAnimated);
        this._renderAnimateToggle();
    }

    toggleVisibility() {
        this.progress.setVisibility(this.progress.isHidden);
        this._renderHideToggle();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});