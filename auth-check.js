// auth-check.js
function roleCheck(requiredRole) {
    const userStr = localStorage.getItem("user");
    
    if (!userStr) {
        window.location.href = "student-login.html";
        return;
    }

    const user = JSON.parse(userStr);

    if (user.role !== requiredRole) {
        alert("Access Denied");
        window.location.href = "index.html";
    }
}

// Function to handle logout
function logoutUser() {
    localStorage.removeItem("user");
    window.location.href = "student-login.html";
}