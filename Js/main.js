const searchBar = document.querySelector(".search-box");
const btnCart = document.querySelector(".cart");
const btnUser = document.querySelector(".user");

const scrollHeader = () => {
  const header = document.getElementById("header");
  this.scrollY >= 50
    ? header.classList.add("bg-header")
    : header.classList.remove("bg-header");
};
window.addEventListener("scroll", scrollHeader);

document.querySelector("#btn-busqueda").addEventListener("click", () => {
  searchBar.classList.toggle("active");
  btnCart.classList.remove("active");
  btnUser.classList.remove("active");
});

document.querySelector("#btn-carrito").addEventListener("click", () => {
  btnCart.classList.toggle("active");
  searchBar.classList.remove("active");
  btnUser.classList.remove("active");
});

document.querySelector("#btn-usuario").addEventListener("click", () => {
  btnUser.classList.toggle("active");
  btnCart.classList.remove("active");
  searchBar.classList.remove("active");
});

var swiper = new Swiper(".new-arrival", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
