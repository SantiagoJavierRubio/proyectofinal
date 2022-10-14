function handleRegister(e) {
    e.preventDefault();
    const errInfo = document.querySelector('.alert');
    errInfo.style.visibility = 'hidden';
    const formData = new FormData(e.target);
    const jsonForm = Object.fromEntries(formData);
    fetch('/auth/register', { 
        method: "POST", 
        credentials: 'include',
        body: JSON.stringify(jsonForm), 
        headers: { 'Content-Type': 'application/json' } }
        )
        .then((res) => {
            if (res.status === 201) return window.location.href = '/'
            return res.json()
        })
        .then(data => {
            if (data.error) {
                errInfo.style.visibility = 'visible';
                errInfo.innerHTML = data.error.toString();
            }
        })
        .catch(err => {
            window.alert(err)
            return window.location.reload();
        })
}

window.onload = document.querySelector('form').addEventListener('submit', handleRegister)