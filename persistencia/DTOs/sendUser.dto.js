export default class SendUserDTO {
    constructor(userData) {
        this.nombre = userData.nombre;
        this.direccion = userData.direccion;
        this.edad = userData.edad;
        this.telefono = userData.telefono;
        this.email = userData.email;
        this.foto = userData.foto
    }
}