import sendMessage from './twilio.js'
import 'dotenv/config'

export const avisarNuevoPedido = async (data) => {
    try {
        const dataProductos = data.productos.map(producto => {
            return(`\n ✅*${producto.nombre}*(_${producto.codigo}_) - $${producto.precio}`)
        })
        const options = {
            body: `🛒 Se ha registrado un nuevo pedido de ${data.user.nombre}: ${dataProductos.toString()}`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${process.env.ADMIN_PHONE || process.env.DEFAULT_ADMIN_PHONE}`
        }
        const msg = await sendMessage(options)
        if(msg.error) throw new Error(msg.error)
        return msg
    }
    catch(err) {
        return { error: err.message }
    }
}

export const enviarSmsAlUsuario = async (user) => {
    try {
        const options = {
            body: 'Hemos recibido tu pedido! Tu orden se encuentra en proceso',
            to: user.telefono,
            from: '(980) 375-5201'
        }
        const msg = await sendMessage(options)
        if(msg.error) throw new Error(msg.error)
        return msg
    }
    catch(err) {
        return { error: err.message }
    }
}