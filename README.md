# proyectofinal
Proyecto final para el curso de backend de Coderhouse

Para probar el código:
```bash
# Clonar el repositorio
$ git clone https://github.com/cabrerarodrigo/proyectofinal

# Instalar dependencias y librerias utilizadas
$ npm install

# Correr el servidor (utiliza el puerto 8080)
$ npm run start

```
```bash
# Alternativamente se puede utilizar con nodemon con el comando
$ npm run dev
```

Primera entrega -> 
- Almacena el carrito del cliente en localStorage, si está deshabilitado (por ej en modo incógnito) las funciones del carrito no estarán disponibles
- Vienen cargados los .json de almacenamiento para facilitar las pruebas, pero se puede borrar manualmente (vaciándolos o eliminándolos) o mediante las funciones del front para probar desde 0
- Desde el lado del servidor sólo se manejan los errores estipulados en la consigna (rutas incorrectas y falta de autorización)
- Para ver como sería sin autorización de administrador cambiar el siguiente valor a false: https://github.com/cabrerarodrigo/proyectofinal/blob/master/rutas/productos.js#:~:text=const%20auth%20%3D-,true,-//%20%2D%2D%20//
