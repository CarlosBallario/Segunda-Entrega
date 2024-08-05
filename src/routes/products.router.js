import { Router } from "express";
import { readProducts, writeProducts } from '../utils/utils.js'; 

const router = Router();
const getProducts = () => readProducts();

export default (io) => {
    // Endpoint get para leer todos los productos
    router.get('/', (req, res) => {
        try {
            const products = getProducts();
            const limit = req.query.limit;
            if (limit) {
                res.json(products.slice(0, limit));
            } else {
                res.json(products);
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
    });

    // Endpoint get para leer un producto por su Id
    router.get('/:id', (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const products = getProducts();
            const product = products.find(product => product.id === id);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ ERROR: "El producto no fue encontrado" });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
    });

    // Endpoint post para agregar un nuevo producto
    router.post('/', (req, res) => {
        const { title, description, code, price, status, stock, category } = req.body;
        try {
            const products = getProducts();
            const id = products.length ? products[products.length - 1].id + 1 : 1;
            const newProduct = { id, title, description, code, price, status, stock, category };
            products.push(newProduct);
            writeProducts(products);
            io.emit('updateProducts', products); 
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
    });

    // Endpoint put para actualizar un producto por su Id
    router.put('/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const { title, description, code, price, status, stock, category } = req.body;
        try {
            let products = getProducts();
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex !== -1) {
                products[productIndex] = { id, title, description, code, price, status, stock, category };
                writeProducts(products);
                io.emit('updateProducts', products); 
                res.json(products[productIndex]);
            } else {
                res.status(404).json({ ERROR: "El producto no fue encontrado" });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
    });

    // Endpoint delete para eliminar un producto por su Id
    router.delete('/:id', (req, res) => {
        const id = parseInt(req.params.id);
        try {
            let products = getProducts();
            const newProducts = products.filter(product => product.id !== id);
            if (products.length !== newProducts.length) {
                writeProducts(newProducts);
                io.emit('updateProducts', newProducts); 
                res.status(204).json({ message: "Producto eliminado correctamente" });
            } else {
                res.status(404).json({ ERROR: "El producto no fue encontrado" });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
    });

    return router;
};
