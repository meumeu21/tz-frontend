class Progress {
    static MIN_VALUE = 0;
    static MAX_VALUE = 100;

    static #BLOCK = 'progress';
    static #STYLE_VALUE = '--progress-value';
    static #ANIMATED = 'progress_animated';
    static #HIDDEN = 'progress_hidden';

    #min;
    #max;
    #value;
    #animated;
    #hidden;
    #element;

    constructor(root, {
        min = Progress.MIN_VALUE,
        max = Progress.MAX_VALUE,
        value = min,
        animated = false,
        hidden = false
    } = {}
    ) {
        if (!(root instanceof Element)) {
            throw new TypeError('Progress: root должен быть DOM-элементом');
        }
        if (!Number.isInteger(min) || !Number.isInteger(max)) {
            throw new TypeError('Progress: min и max должны быть целыми числами');
        }
        if (min < 0) {
            throw new RangeError('Progress: min не может быть отрицательным');
        }
        if (min >= max) {
            throw new RangeError('Progress: min должен быть меньше max');
        }

        this.#min = min;
        this.#max = max;
        this.#value = this.#normalize(value);
        this.#animated = animated;
        this.#hidden = hidden;

        this.#element = document.createElement('div');
        this.#element.className = Progress.#BLOCK;
        root.append(this.#element);
        this.#render();
    }

    setValue(value) {
        this.#value = this.#normalize(value);
        this.#render();
        return this;
    }

    getValue() {
        return this.#value;
    }

    setAnimated(animated) {
        this.#animated = Boolean(animated);
        this.#render();
        return this;
    }

    isAnimated() {
        return this.#animated;
    }

    setHidden(hidden) {
        this.#hidden = Boolean(hidden);
        this.#render();
        return this;
    }

    isHidden() {
        return this.#hidden;
    }

    getPercent() {
        return (this.#value - this.#min) * 100 / (this.#max - this.#min);
    }

    getMin() {
        return this.#min;
    }

    getMax() {
        return this.#max;
    }

    destroy() {
        if (this.#element === null) {
            return;
        }
        this.#element.remove();
        this.#element = null;
    }

    #render() {
        if (this.#element === null) {
            throw new Error('Progress: компонент уничтожен');
        }

        this.#element.style.setProperty(Progress.#STYLE_VALUE, this.getPercent());
        this.#element.classList.toggle(Progress.#ANIMATED, this.#animated);
        this.#element.classList.toggle(Progress.#HIDDEN, this.#hidden);
    }

    #normalize(value) {
        if (!Number.isInteger(value)) {
            throw new TypeError('Progress: value должен быть целым числом');
        }

        return Math.min(this.#max, Math.max(this.#min, value));
    }
}

export default Progress;