// script.js
const wrapper = document.querySelector(".wrapper");
const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");

registerLink.addEventListener("click", (e) => {
  e.preventDefault(); // previne o # de subir a página
  wrapper.classList.add("active"); // mostra o registro
});

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  wrapper.classList.remove("active"); // volta pro login
});
