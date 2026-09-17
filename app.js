import Progress from './progress/progress.js';

class App {
    static #PROGRESS_SELECTOR = '.panel__progress';
    static #VALUE_SELECTOR = '.field__input';
    static #ANIMATE_SELECTOR = '.panel__animation';
    static #HIDE_SELECTOR = '.panel__visibility';

    static #DIGITS = /^\d*$/;

    #progress;
    #valueInput;
    #animateToggle;
    #hideToggle;

    #controller = new AbortController();
    
    constructor(root) {
        if (!(root instanceof Element)) {
            throw new TypeError('App: root должен быть DOM-элементом');
        }

        const progressRoot = root.querySelector(App.#PROGRESS_SELECTOR);
        this.#valueInput = root.querySelector(App.#VALUE_SELECTOR);
        this.#animateToggle = root.querySelector(App.#ANIMATE_SELECTOR);
        this.#hideToggle = root.querySelector(App.#HIDE_SELECTOR);

        if (!(progressRoot instanceof Element)) {
            throw new TypeError(`App: ${App.#PROGRESS_SELECTOR} должен быть DOM-элементом`);
        }
        if (!(this.#valueInput instanceof HTMLInputElement)) {
            throw new TypeError(`App: ${App.#VALUE_SELECTOR} должен быть input`);
        }
        if (!(this.#animateToggle instanceof HTMLInputElement)) {
            throw new TypeError(`App: ${App.#ANIMATE_SELECTOR} должен быть input`);
        }
        if (!(this.#hideToggle instanceof HTMLInputElement)) {
            throw new TypeError(`App: ${App.#HIDE_SELECTOR} должен быть input`);
        }

        this.#progress = new Progress(progressRoot);

        this.#setValueInputAttributes();
        this.#bindEvents();
        this.#syncControls();
    }

    setValue(value) {
        this.#progress.setValue(value);
        this.#syncControls();
        return this;
    }

    setAnimated(animated) {
        this.#progress.setAnimated(animated);
        this.#syncControls();
        return this;
    }

    setHidden(hidden) {
        this.#progress.setHidden(hidden);
        this.#syncControls();
        return this;
    }

    destroy() {
        this.#controller.abort();
        this.#progress.destroy();
    }

    #setValueInputAttributes() {
        this.#valueInput.setAttribute('min', this.#progress.getMin());
        this.#valueInput.setAttribute('max', this.#progress.getMax());
    }

    #bindEvents() {
        const { signal } = this.#controller;
        this.#valueInput.addEventListener('beforeinput', (event) => this.#onValueBeforeInput(event), {signal});
        this.#valueInput.addEventListener('input', () => this.#onValueInput(), {signal});
        this.#animateToggle.addEventListener('change', () => this.#onAnimateChange(), {signal});
        this.#hideToggle.addEventListener('change', () => this.#onHideChange(), {signal});
    }

    #onValueBeforeInput(event) {
        const data = event.data ?? event.dataTransfer?.getData('text');
        if (data && !App.#DIGITS.test(data)) {
            event.preventDefault();
        }
    }

    #onValueInput() {
        const value = this.#valueInput.valueAsNumber;
        this.#progress.setValue(Number.isNaN(value) ? this.#progress.getMin() : value);
        this.#syncValueInput();
    }

    #syncValueInput() {
        const value = String(this.#progress.getValue());
        if (this.#valueInput.value !== value) {
            this.#valueInput.value = value;
        }
    }

    #onAnimateChange() {
        this.#progress.setAnimated(this.#animateToggle.checked);
    }

    #onHideChange() {
        this.#progress.setHidden(this.#hideToggle.checked);
    }

    #syncControls() {
        this.#syncValueInput();
        this.#animateToggle.checked = this.#progress.isAnimated();
        this.#hideToggle.checked = this.#progress.isHidden();
    }
}

window.app = new App(document.querySelector('.panel'));