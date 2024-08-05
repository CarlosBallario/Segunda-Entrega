import { Router } from "express";
import { readCarts, writeCarts } from '../utils/utils.js';

const router = Router();
const cartsFilePath = 'data/carts.json';

const getCarts = () => readCarts();

export default (io) => {
    // Endpoint para obtener todos los carritos
    router.get('/', (req, res) => {
        try {
            const carts = getCarts();
            res.json(carts);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
    });

    // Endpoint para crear un nuevo carrito
    router.post('/', (req, res) => {
        const { id, products } = req.body;
        if (id && products) {
            try {
                const carts = getCarts();
                carts.push({ id, products });
                writeCarts(carts);
                io.emit('updateCarts', carts); 
                res.json({ id, products });
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ ERROR: "Error interno del Servidor" });
            }
        } else {
            res.status(400).json({ ERROR: "Se requiere ingresar el Id y el producto" });
        }
    });

    // Endpoint para obtener un carrito por su Id
    router.get('/:cid', (req, res) => {
        const id = req.params.cid;
        try {
            const carts = getCarts();
            const cart = carts.find(cart => cart.id === parseInt(id));
            if (cart) {
                res.json(cart);
            } else {
                res.status(404).json({ ERROR: "Carrito no encontrado" });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
    });

    // Endpoint para agregar un producto en el carrito
    router.post('/:cid/carrito/:id', (req, res) => {
        const cartId = req.params.cid;
        const productId = req.params.id;

        const productToAdd = {
            product: productId,
            quantity: 1
        };

        try {
            const carts = getCarts();
            const cartIndex = carts.findIndex(cart => cart.id === parseInt(cartId));
            if (cartIndex !== -1) {
                carts[cartIndex].products.push(productToAdd);
                writeCarts(carts);
                io.emit('updateCarts', carts); 
                res.status(200).json({ Mensaje: "El producto se ha agregado correctamente al carrito" });
            } else {
                res.status(404).json({ ERROR: "Carrito no encontrado" });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
    });

    // Endpoint para actualizar la cantidad de un producto en el carrito
    router.put('/:cid/carrito/:id', (req, res) => {
        const cartId = req.params.cid;
        const productId = req.params.id;
        const { quantity } = req.body;

        try {
            const carts = getCarts();
            const cart = carts.find(cart => cart.id === parseInt(cartId));
            if (cart) {
                const product = cart.products.find(product => product.id === parseInt(productId));
                if (product) {
                    product.quantity = quantity;
                    writeCarts(carts);
                    io.emit('updateCarts', carts); 
                    res.json(cart);
                } else {
                    res.status(404).json({ ERROR: "Producto no encontrado en el carrito" });
                }
            } else {
                res.status(404).json({ ERROR: "Carrito no encontrado" });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
    });

    // Endpoint para eliminar un producto del carrito
    router.delete('/:cid/carrito/:id', (req, res) => {
        const cartId = req.params.cid;
        const productId = req.params.id;

        try {
            const carts = getCarts();
            const cart = carts.find(cart => cart.id === parseInt(cartId));
            if (cart) {
                const productIndex = cart.products.findIndex(product => product.id === parseInt(productId));
                if (productIndex !== -1) {
                    cart.products.splice(productIndex, 1);
                    writeCarts(carts);
                    io.emit('updateCarts', carts); 
                    res.json({ Mensaje: "El producto se ha eliminado correctamente del carrito" });
                } else {
                    res.status(404).json({ ERROR: "Producto no encontrado en el carrito" });
                }
            } else {
                res.status(404).json({ ERROR: "Carrito no encontrado" });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
    });

    // Endpoint para eliminar un carrito completo
    router.delete('/carrito/:cid', (req, res) => {
        const cartId = parseInt(req.params.cid);
        try {
            const carts = getCarts();
            const cartIndex = carts.findIndex(cart => cart.id === cartId);
            if (cartIndex !== -1) {
                carts.splice(cartIndex, 1);
                writeCarts(carts);
                io.emit('updateCarts', carts); 
                res.json({ Mensaje: "El carrito se ha eliminado correctamente" });
            } else {
                res.status(404).json({ ERROR: "Carrito no encontrado" });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
    });

    return router;
};
