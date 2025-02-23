document.addEventListener('DOMContentLoaded', () => {
    class Rotator {
        constructor(container) {
            this.cases = Array.from(container.querySelectorAll('.rotator__case'));
            this.currentIndex = 0;
            this.timeout = null;
            this.init();
        }

        init() {
            this.activateCase();
            this.scheduleNext();
        }

        activateCase() {
            const activeCase = this.cases[this.currentIndex];
            this.cases.forEach(c => c.classList.remove('rotator__case_active'));
            activeCase.classList.add('rotator__case_active');
            
            // Применяем настройки из data-атрибутов
            activeCase.style.color = activeCase.dataset.color || '#000';
            this.speed = parseInt(activeCase.dataset.speed) || 1000;
        }

        next() {
            this.currentIndex = (this.currentIndex + 1) % this.cases.length;
            this.activateCase();
            this.scheduleNext();
        }

        scheduleNext() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.next(), this.speed);
        }
    }

    // Инициализация всех ротаторов на странице
    document.querySelectorAll('.rotator').forEach(rotator => new Rotator(rotator));
});