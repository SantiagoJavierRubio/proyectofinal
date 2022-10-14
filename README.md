# proyectofinal
Proyecto final para el curso de backend de Coderhouse

Para probar el código:
- Completar las variables de entorno necesarias en un archivo .env (siguiendo el formato de .env.example)

```bash
# Clonar el repositorio
$ git clone https://github.com/cabrerarodrigo/proyectofinal

# Instalar dependencias y librerias utilizadas
$ npm install

# Correr el servidor
$ npm run start

# O indicar las constantes globales que quiera
    # ADMIN_EMAIL es el correo donde se enviarán los avisos de registro y orden
    # ADMIN_PHONE el celular donde se enviarán los whatsapp de aviso de orden
    # ADMIN_MODE añadir cualquier valor para acceder al modo de administrador
    # puerto indica el puerto en el que correrá el servidor (8080 por defecto)
    # modo indica si el servidor iniciará en modo cluster o fork (fork por defecto)
    # localDB indica si mongo se conectará a una base de datos local (cuya dirección debe estar especificada en .env)

$ [ADMIN_EMAIL={email}] [ADMIN_PHONE={telefono}] [ADMIN_MODE={}] node index.js --puerto={puerto} [--modo=cluster] [--localDB=true]
```

Entrega final ->
- Mejor manejo de errores. Uso más apropiado de los códigos de estado HTTP en las respuestas.
- Separación de capa de controladores y capa de lógica
- Reorganización de la estructura de carpetas
- Creación de factories para facilitar escalabilidad
- Eliminación de redirects y procedimientos similares a favor de respuestas con objetos
- Incorporación de handlebars para simplificar el renderizado

