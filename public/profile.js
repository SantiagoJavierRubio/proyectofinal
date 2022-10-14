window.onload = loadProfile

function getAgeFromDOB(DOB) {
    const dob = new Date(DOB)
    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    if(today.getMonth() > dob.getMonth()) return age
    if(today.getMonth() < dob.getMonth()) return age-1
    if(today.getDate() < dob.getDate()) return age-1
}

function loadProfile() {
    fetch('/auth', { method: "GET", credentials: 'include'})
        .then(res => res.json())
        .then(data => {
            const edad = getAgeFromDOB(data.edad)
            const profile = document.querySelector('#profile')
            profile.innerHTML = `
            <h3>${data.nombre}</h3>
            <img src="${data.foto}" alt="profile picture">
            <p>Email: ${data.email}</p>
            <p>Edad: ${edad}</p>
            <p>Tel: ${data.telefono}</p>
            <p>Direccion: ${data.direccion}</p>
            `
        })
}