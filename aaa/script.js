window.addEventListener('scroll', function () {
  const name = document.querySelector('.bg')
  const position = name.getBoundingClientRect()

  if (position.top < window.innerHeight) {
    name.classList.add('active')
  } else {
    name.classList.remove('active')
  }

  if (window.scrollY === 0) {
    name.classList.remove('active')
  }
})
