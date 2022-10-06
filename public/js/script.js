const logOutButton = document.querySelector('#logOutButton');

const logout = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    };
};

logOutButton.addEventListener('click', logout);

function logoutDisplay() {
    if (document.location.pathname === '/login') {
        logOutButton.style.display = 'none';
    } else {
        logOutButton.style.display = 'block';
    }
};

logoutDisplay();