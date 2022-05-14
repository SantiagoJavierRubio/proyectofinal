import transporter from "./nodemailer.js"
import 'dotenv/config'

export const enviarNuevoRegistro = (data) => {
    const date = new Date(data.edad)
    transporter.sendMail({
        from: `Proyecto final <${process.env.EMAIL_USER}>`,
        to: `${process.env.ADMIN_EMAIL || process.env.EMAIL_USER}`,
        subject: 'Nuevo registro',
        html: `
            <h2>Se ha registrado un nuevo usuario</h2>
            <h4>Información:</h4>
            <img src="${data.foto}" alt="foto de perfil">
            <p>
                Nombre: ${data.nombre} <br>
                Email: ${data.email} <br>
                Direccion: ${data.direccion} <br>
                Fecha de nacimiento: ${date.toLocaleDateString()} <br>
                Telefono: ${data.telefono}
            </p>
            `
    }, (err, info) => {
        if(err) return { error: err.message }
        if(info.accepted.length > 0) return true
        else return { rejeced: info.rejected }
    })
}

export const enviarNuevoPedido = (data) => {
    const dataProductos = data.productos.map(producto => {
        return(`
            <div style="border: 1px solid black; padding: 1rem;">
                <h5>${producto.nombre}</h5>
                <p>Código: ${producto.codigo}</p>
                <p>Precio: ${producto.precio}</p>
            </div>
            <br>
            <br>
        `)
    })
    transporter.sendMail({
        from: `Proyecto final <${process.env.EMAIL_USER}>`,
        to: `${process.env.ADMIN_EMAIL || process.env.EMAIL_USER}`,
        subject: `Nuevo pedido de ${data.user.nombre} <${data.user.email}>`,
        html: `
            <h2>Se ha registrado un nuevo pedido</h2>
            <h4>Información:</h4>
            ${dataProductos.toString()}
            `
    }, (err, info) => {
        if(err) return { error: err.message }
        if(info.accepted.length > 0) return true
        else return { rejeced: info.rejected }
    })
}