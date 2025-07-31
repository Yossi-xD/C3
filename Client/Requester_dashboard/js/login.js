document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Login successful!");

      // ✅ Store token and role properly
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      // ✅ Redirect based on role
     window.location.href = "/choose_profile/main.html";

    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    alert("⚠️ Server error");
    console.error(err);
  }
});
