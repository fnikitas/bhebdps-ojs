document.addEventListener('DOMContentLoaded', () => {
    const sliderItems = Array.from(document.querySelectorAll('.slider__item'));
    const prevArrow = document.querySelector('.slider__arrow_prev');
    const nextArrow = document.querySelector('.slider__arrow_next');
    const dotsContainer = document.querySelector('.slider__dots');
    let currentSlide = 0;

    
    if (dotsContainer) {
        sliderItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `slider__dot${index === 0 ? ' slider__dot_active' : ''}`;
            dot.addEventListener('click', () => changeSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    const dots = Array.from(document.querySelectorAll('.slider__dot'));

  
    function updateSlider(newIndex) {
        
        if (newIndex >= sliderItems.length) newIndex = 0;
        if (newIndex < 0) newIndex = sliderItems.length - 1;

        
        sliderItems[currentSlide].classList.remove('slider__item_active');
        sliderItems[newIndex].classList.add('slider__item_active');
        
        
        if (dots.length) {
            dots[currentSlide].classList.remove('slider__dot_active');
            dots[newIndex].classList.add('slider__dot_active');
        }
        
        currentSlide = newIndex;
    }

    
    nextArrow.addEventListener('click', () => updateSlider(currentSlide + 1));
    prevArrow.addEventListener('click', () => updateSlider(currentSlide - 1));
});