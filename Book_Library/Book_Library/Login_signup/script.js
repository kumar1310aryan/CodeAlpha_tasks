const sign_up_link = document.querySelector("#sign-up-link");
const sign_in_link = document.querySelector("#sign-in-link");
const container = document.querySelector(".container");
const sign_in_form = document.querySelector("#sign-in-form");
const sign_up_form = document.querySelector("#sign-up-form");
const auth_message = document.querySelector("#auth-message");
const logout_btn = document.querySelector("#logout-btn");

sign_up_link.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
  auth_message.textContent = "";
});

sign_in_link.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
  auth_message.textContent = "";
});

sign_in_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector("#signin-username").value;
  const password = document.querySelector("#signin-password").value;

  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  if (username === storedUsername && password === storedPassword) {
    window.location.href = "../index.html";
  } else {
    auth_message.textContent = "Incorrect username or password.";
  }
});

sign_up_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector("#signup-username").value;
  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#signup-password").value;

  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  auth_message.textContent = "Signed up successfully!";
  container.classList.remove("sign-up-mode");
});

logout_btn.addEventListener("click", () => {
  auth_message.textContent = "";
  hideLogoutButton();
});

function showLogoutButton() {
  logout_btn.style.display = "block";
  sign_in_form.style.display = "none";
  sign_up_form.style.display = "none";
}

function hideLogoutButton() {
  logout_btn.style.display = "none";
  sign_in_form.style.display = "block";
  sign_up_form.style.display = "block";
}
