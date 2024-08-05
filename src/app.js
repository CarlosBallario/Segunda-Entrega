import express from 'express';
import handlebars from 'express-handlebars'; 
import { Server } from 'socket.io'; 
import productsRouter from './routes/products.router.js'; 
import cartsRouter from './routes/carts.router.js'; 
import viewsRouter from './routes/views.router.js'; 
import __dirname, { readProducts, writeProducts, readCarts, writeCarts } from './utils/utils.js'; 

const app = express();
const PORT = 8080; 

const products = readProducts(); 
const carts = readCarts(); 

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars'); 
app.set('views', __dirname + '/views'); 

app.use(express.static('src/public')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const httpServer = app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
const io = new Server(httpServer); 

app.use('/Compus', productsRouter(io)); 
app.use('/carrito', cartsRouter(io)); 

app.use('/', viewsRouter); 

io.on('connection', (socket) => {
    console.log('New client connected'); 

    socket.emit('updateProducts', products);

    socket.on('addProduct', (product) => {
        product.id = products.length ? products[products.length - 1].id + 1 : 1; 
        products.push(product); 
        writeProducts(products); 
        io.emit('updateProducts', products); 
    });

    socket.on('deleteProduct', (productId) => {
        const updatedProducts = products.filter(product => product.id !== productId); 
        writeProducts(updatedProducts); 
        io.emit('updateProducts', updatedProducts); 
    });
});
