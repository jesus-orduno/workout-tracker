deleteAccountHandler = async () => {
    const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
};