editUsernameHandler = async () => {
    const username = document.querySelector('#newUsername').value.trim();
    if (username) {
        const response = await fetch('/api/users', {
            method: 'PUT',
            body: JSON.stringify({ username }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};