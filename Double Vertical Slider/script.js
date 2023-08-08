const sliderContainer = document.querySelector('.slider-container')
const leftSlide = document.querySelector('.left-side')
const rightSlide = document.querySelector('.right-side')
const downBtn = document.querySelector('.down-button')
const upBtn = document.querySelector('.up-button')
const slidesLength = rightSlide.querySelectorAll('div').length

console.log(slidesLength)
leftSlide.style.top = `-${(slidesLength - 1) * 100}vh`

/* background: linear-gradient(90deg, rgba(0,0,0,1) 49%, rgba(254,253,253,1) 49%, rgba(255,215,0,1) 100%);
    BEST LINEAR GRADIENT
*/
let activeIndexSlide = 0

upBtn.addEventListener('click', () => changeSlide('up'))
downBtn.addEventListener('click', () => changeSlide('down'))

const changeSlide = (direction) => {
  const sliderHeight = sliderContainer.clientHeight
  if (direction === 'up') {
    activeIndexSlide++
    if (activeIndexSlide > slidesLength - 1) {
      activeIndexSlide = 0
    }
  } else if (direction === 'down') {
    activeIndexSlide--
    if (activeIndexSlide < 0) {
      activeIndexSlide = slidesLength - 1
    }
  }

  rightSlide.style.transform = `translateY(-${
    activeIndexSlide * sliderHeight
  }px)`

  leftSlide.style.transform = `translateY(${activeIndexSlide * sliderHeight}px)`
}
