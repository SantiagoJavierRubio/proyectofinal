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
    # puerto indica el puerto en el que correrá el servidor (8080 por defecto)
    # modo indica si el servidor iniciará en modo cluster o fork (fork por defecto)
    # localDB indica si mongo se conectará a una base de datos local (cuya dirección debe estar especificada en .env)

$ [ADMIN_EMAIL={email}] [ADMIN_PHONE={telefono}] node index.js --puerto={puerto} [--modo=cluster] [--localDB=true]
```

Tercera entrega ->
- Eliminé los contenedores y DAOs que no correspondían al trabajo con MongoDB y mongoose
- Los DAOs ahora devuelven siempre un objeto {error: mensaje} en caso de fallar
- Todos los elementos de configuración pasan a estar en variables de entorno
- Los reportes del profiling hechos con artillery se encuentran en el directorio base (modo_fork.txt y modo_cluster.txt)
- Los emails y mensajes de texto se enviaran a la dirección por default del administrador si no se especifican otros al iniciar el servidor
- Las funcionalidades fueron testeadas por request desde Postman y con el front-end

