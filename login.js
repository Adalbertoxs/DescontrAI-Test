// ----------------------
// Login/Register Logic
// ----------------------
const wrapper = document.querySelector(".wrapper");
const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const popupMessage = document.getElementById("popup-message");

registerLink.addEventListener("click", (e) => {
  e.preventDefault();
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  wrapper.classList.remove("active");
});

function showPopup(message, isSuccess = true) {
  popupMessage.textContent = message;
  popupMessage.classList.add("show", isSuccess ? "success" : "error");
  setTimeout(() => {
    popupMessage.classList.remove("show", "success", "error");
  }, 3000);
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // URL correta do seu backend
  const apiUrl = "http://localhost:5145/api/account/login";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      showPopup("Login bem-sucedido!", true);
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } else {
      const errorText = await response.text();
      showPopup(`Erro: ${errorText}`, false);
    }
  } catch (error) {
    showPopup(
      "Erro de conexão com o servidor. Certifique-se de que o backend está rodando em http://localhost:5145.",
      false
    );
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  // URL correta do seu backend
  const apiUrl = "http://localhost:5145/api/account/register";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      showPopup("Registro bem-sucedido! Faça login agora.", true);
      wrapper.classList.remove("active");
    } else {
      const errorText = await response.text();
      showPopup(`Erro: ${errorText}`, false);
    }
  } catch (error) {
    showPopup(
      "Erro de conexão com o servidor. Certifique-se de que o backend está rodando em http://localhost:5145.",
      false
    );
  }
});
