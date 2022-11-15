const burger = document.querySelector('.burger');
const popup = document.querySelector('.popup');
const menu = document.querySelector(".nav__ul").cloneNode(1);
console.log(menu)

burger.addEventListener("click", burgerHandler);

function burgerHandler (event) {
  event.preventDefault();
  popup.classList.toggle("open");
  burger.classList.toggle("active");
  renderPopup();
}

function renderPopup () {
  popup.appendChild(menu);
}