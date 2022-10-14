export default class SendCarritoDTO {
    constructor(carritoData) {
        this.id = carritoData._id || carritoData.id;
        this.productos = carritoData.productos
    }
}