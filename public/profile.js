function loadProfile() {
  fetch('/auth', { method: 'GET', credentials: 'include' })
  .then((res) => res.json())
  .then((data) => {
    const dob = new Date(data.edad);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth()) age++;
    if (today.getDate() < dob.getDate()) age--;
    const profile = document.querySelector('#profile');
    profile.innerHTML = `
    <h3>${data.nombre}</h3>
    <img src="${data.foto}" alt="profile picture">
    <p>Email: ${data.email}</p>
    <p>Edad: ${age}</p>
    <p>Tel: ${data.telefono}</p>
    <p>Direccion: ${data.direccion}</p>
    `;
  });
}

window.onload = loadProfile;