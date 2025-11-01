// Form toggle
const loginForm = document.getElementById("loginForm");
const signUpForm = document.getElementById("signUpForm");
const toSignUp = document.getElementById("toSignUp");
const toLogin = document.getElementById("toLogin");

toSignUp.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.remove("active");
  signUpForm.classList.add("active");
});

toLogin.addEventListener("click", (e) => {
  e.preventDefault();
  signUpForm.classList.remove("active");
  loginForm.classList.add("active");
});

// Sign Up functionality
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("signUpUsername").value.trim();
  const email = document.getElementById("signUpEmail").value.trim();
  const password = document.getElementById("signUpPassword").value.trim();

  if (username && email && password) {
    const user = { username, email, password };
    localStorage.setItem("rizzalianUser", JSON.stringify(user));
    alert("Account created successfully! You can now log in ❤️");
    signUpForm.reset();
    signUpForm.classList.remove("active");
    loginForm.classList.add("active");
  } else {
    alert("Please fill out all fields!");
  }
});

// Login functionality
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const loginUsername = document.getElementById("loginUsername").value.trim();
  const loginPassword = document.getElementById("loginPassword").value.trim();
  const storedUser = JSON.parse(localStorage.getItem("rizzalianUser"));

  if (!storedUser) {
    alert("No account found. Please create one first.");
    return;
  }

  if (
    (loginUsername === storedUser.username || loginUsername === storedUser.email) &&
    loginPassword === storedUser.password
  ) {
    alert("Login successful! Welcome back, " + storedUser.username + " 💕");
    window.location.href = "myaccount.html"; // Redirect to home page after login
  } else {
    alert("Incorrect username or password.");
  }
});
