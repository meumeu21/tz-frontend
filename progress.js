class Progress {
    constructor(min = 0, max = 100, value = 0) {
        this.min = min;
        this.max = max;
        this.value = this._clamp(value, min, max);
        this.isAnimated = false;
        this.isHidden = false;
    }

    _clamp(n, min, max) {
        return Math.min(max, Math.max(min, n));
    }

    setValue(value) {
        this.value = this._clamp(value, this.min, this.max);
    }

    setAnimation(enabled) {
        this.isAnimated = enabled;
    }

    setVisibility(visible) {
        this.isHidden = !visible;
    }

    getAngle() {
        return (this.value / this.max) * 360;
    }
}

export default Progress;