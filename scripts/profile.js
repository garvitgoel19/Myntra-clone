const profileContainer = document.getElementById("profileContainer");

window.onload = function () {
  const user = JSON.parse(localStorage.getItem("userProfile"));
  if (user && user.name && user.email) {
    showGreeting(user);
  } else {
    showLoginForm();
  }
};

function showLoginForm() {
  profileContainer.innerHTML = `
    <h2>Login to Your Myntra Profile</h2>
    <form class="profile-form" onsubmit="handleLogin(event)">
      <input type="text" placeholder="Enter your name" id="username" required><br>
      <input type="email" placeholder="Enter your email" id="useremail" required><br>
      <button type="submit">Login</button>
    </form>
  `;
}

function handleLogin(e) {
  e.preventDefault();
  const name = document.getElementById("username").value.trim();
  const email = document.getElementById("useremail").value.trim();

  localStorage.setItem("userProfile", JSON.stringify({ name, email }));
  showGreeting({ name, email });
}

function showGreeting(user) {
  profileContainer.innerHTML = `
    <div class="greeting">Welcome back, <strong>${user.name}</strong>!</div>
    <p>Email: ${user.email}</p>
    <button class="logout-btn" onclick="handleLogout()">Logout</button>
  `;
}

function handleLogout() {
  localStorage.removeItem("userProfile");
  location.reload();
}
