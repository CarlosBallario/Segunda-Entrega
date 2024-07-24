### Primera Entrega Backend I Coderhouse 
_____________________________________________________________________________________________________
Este código corresponde a la Primera Entrega del curso de Backend I de CoderHouse, de acuerdo a los requerimientos solicitados en la consigna.
_____________________________________________________________________________________________________

#### Información del Proyecto:
_____________________________________________________________________________________________________
##### Autor:
Carlos Ballario

##### Descripción:
Se trata de una aplicación creada en Node.js con el framework Express. Su objetivo es administrar productos y un carritode compras mediante la persistencia en un sistema de archivos. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos almacenados en un archivo JSON, además de gestionar los carritos de compra.

##### Características:
- Crea, lista, actualiza y elimina productos.
- Crea carritos de compra.
- Agrega productos a los carritos existentes.
- Visualizar el contenido de los carritos.
- Elimina productos de los carritos.
- Elimina carritos de compra.

#### Endpoints:
_____________________________________________________________________________________________________

##### Products
- **Obtener todos los productos:**
###### GET:
Se coloca la URL: http://localhost:8080/Compus y muestra todos los productos guardados en el archivo product.json.
###### GET:
- **Obtener los productos por su Id:**
Se coloca la URL: http://localhost:8080/Compus/id  y muestra el productos con ese Id guardado en el archivo product.json. Ejemplo: http://localhost:8080/Compus/1.
###### POST:
- **Agregar un nuevo producto:**
Se coloca la URL: http://localhost:8080/Compus y se colocan todos los parámetos del producto ("title, description, price,code, category, stock, cargados en el archivo product.json)en el body del POSTMAN.
###### PUT:
- **Actualizar un producto por su Id:**
Se coloca la URL: http://localhost:8080/id/Compus/id y se modifica algunos/todos los parámetos del producto ("title, description, price,code, category, stock, cargados en el archivo product.json)en el body del POSTMAN. Ejemplo: http://localhost:8080/Compus/2.
###### DELETE:
- **Eliminar un producto por su Id:**
Se coloca la URL: http://localhost:8080/Compus/Id y elimina el producto con ese Id guardado en el archivo product.json. Ejemplo: http://localhost:8080/Compus/5.


##### Carts
###### POST:
- **Agregar un carrito nuevo:**
Se coloca la URL: http://localhost:8080/carrito y se coloca en el body de POSTMAN todos los parametros tal cual se consiguraron en el archivo carts.json, y crea un nuevo carrito con esta misma estrucutura en el archivo carts.json.
###### GET:
- **Obtener el contenido de un carrito por su Id:**
Se coloca la URL: http://localhost:8080/carrito/cid y muestra el contenido del carrito identificado con ese Id en el archivo carts.json. Ejemplo: http://localhost:8080/carrito/3.
###### POST:
- **Agregar un producto a un carrito por su Id:**
Se coloca la URL: http://localhost:8080/carrito/cid y no se coloca nada en el body de POSTMAN.Crea un producto nuevo con una "quantity" :1. Se guarda el cambio en el archivo carts.json. Ejemplo: http://localhost:8080/4/carrito/7.
###### PUT:
- **Actualizar la cantidad un producto en un carrito por su Id:**
Se coloca la URL: http://localhost:8080/cid/carrito/id y actualiza la cantidad de un producto en un carrito identificado por su Id. Ejemplo: http://localhost:8080/5/carrito/1
###### DELETE:
- **Eliminar un producto del carrito por su Id:**
Se coloca la URL: http://localhost:8080/cid/carrito/id y elimina el producto con ese Id almacenado en el archivo carrito.json. Ejemplo: http://localhost:8080/2/carrito/3.
###### DELETE:
- **Eliminar un carrito por su Id:**
Se coloca la URL: http://localhost:8080/carrito/cid y elimina el carrito con ese Id almacenado en el archivo carrito.json. Ejemplo: http://localhost:8080/5/carrito/1.

#### POSTMAN
_________________________________________________________________________________________________________________________

##### Products
- **Obtener todos los productos:**
<image src= "/Image/Compus-GET.jpg" alt= "">

- **Obtener los productos por su Id:**
<image src= "/Image/Compus-GET-2.jpg" alt= "">

- **Agregar un nuevo producto:**
<image src= "/Image/Compus-POST.jpg" alt= "">

- **Actualizar un producto por su Id:**
<image src= "/Image/Compus-PUT.jpg" alt= "">

- **Eliminar un producto por su Id:**
<image src= "Image/Compus-DELETE.jpg" alt= "">

_______________________________________________________________________________________________________________________________
##### Carts
- **Agregar un carrito nuevo:**
<image src= "Image/carrito-POST.jpg" alt= "">

- **Obtener el contenido de un carrito por su Id:**
<image src= "Image/carrito-GET.jpg" alt= "">

- **Agregar un producto a un carrito por su Id:**
<image src= "Image/carrito-POST-2.jpg" alt= "">

- **Actualizar la cantidad un producto en un carrito por su Id:**
<image src= "Image/carrito-PUT.jpg" alt= "">

- **Eliminar un producto del carrito por su Id:**
<image src= "Image/carrito-DELETE.jpg" alt= "">

- **Eliminar un carrito por su Id:**
<image src= "Image/carrito-DELETE-2.jpg" alt= "">


_______________________________________________________________________________________________________________________________

#### NOTAS
Cuando subí el proyecto a Github, revisé que todo estuviera bien, sin embargo se copió la carpeta node_modules estando configurado correctamente el archivo .gitignore. 
Como no encuentro como elimirlo desde Github, en la otra entrega voy a crear un repositorio nuevo.