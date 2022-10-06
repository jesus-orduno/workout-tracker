editPasswordHandler = async () => {
    const password = document.querySelector('#updatePasswordInput').value.trim();
    const confirmPassword = document.querySelector('#updatePasswordConfirmInput').value.trim();

    if (password === confirmPassword) {
        const response = await fetch('/api/users', {
            method: 'PUT',
            body: JSON.stringify({ password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};