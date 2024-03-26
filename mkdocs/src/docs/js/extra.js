document.addEventListener('DOMContentLoaded', (event) => {
    let items = document.querySelectorAll('.announce-wrapper .item')
    let currentIndex = 0

    function rotateItem() {
      items.forEach(item => item.classList.remove('active'))
      items[currentIndex].classList.add('active')
      currentIndex = (currentIndex + 1) % items.length
      setTimeout(rotateItem, 3000)
    }

    rotateItem()
  })
