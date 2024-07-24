import { Router } from "express";
import fs from 'fs'

const router = Router();

// Endpoind para crear un nuevo carrito
router.post('/carrito', (req, res) => {
    const { id, products } = req.body;
    if (id && products) {
        fs.readFile('data/carts.json', "utf8", (error, data) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ ERROR: "Error interno del Servidor" });
            }
            const carts = JSON.parse(data);
            carts.push({ id, products });
            fs.writeFile('data/carts.json', JSON.stringify(carts, null, 2), error => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ ERROR: "Error interno del Servidor" });
                }
                res.json({ id, products });
            });
        });
    } else {
        res.status(400).json({ ERROR: "Se requiere ingresar el Id y el producto" });
    }
});

//Endpoint get para obtener un carrito por su Id
router.get('/carrito/:cid', (req, res) => {
    const id = req.params.cid;
    fs.readFile('data/carts.json', "utf8", (error, data) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ Error: "Error 1 interno del Servidor" });
        }
        const carts = JSON.parse(data);
        const cart = carts.find(cart => cart.id === parseInt(id));
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ ERROR: " Carrito no encontrado" });
        }
    });
});

// Endpoint post para agregar un producto en el carrito
router.post('/:cid/carrito/:id', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.id;

    const productToAdd = {
        product: productId,
        quantity: 1
    };
    fs.readFile('data/carts.json', "utf8", (error, data) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ ERROR: " Error interno del Servidor" });
        }
        const carts = JSON.parse(data);
        const cartIndex = carts.findIndex(cart => cart.id === parseInt(cartId));
        if (cartIndex !== -1) {
            carts[cartIndex].products.push(productToAdd);

            fs.writeFile('data/carts.json', JSON.stringify(carts, null, 2), error => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ ERROR: "Error interno del Servidor" });
                }
                res.status(200).json({ Mensaje: "EL producto se a agregado correctamente al carrito" });
            });
        } else {
            res.status(404).json({ Error: "Carrito no encontrado" });
        }
    });
});

// Endpoint put para actualizar la cantidad de un producto en el carrito
router.put('/:cid/carrito/:id', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.id;
    const { quantity } = req.body;

    fs.readFile('data/carts.json', "utf8", (error, data) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
        const carts = JSON.parse(data);
        const cart = carts.find(cart => cart.id === parseInt(cartId));
        if (cart) {
            const product = cart.products.find(product => product.id === parseInt(productId));
            if (product) {
                product.quantity = quantity;
                fs.writeFile('data/carts.json', JSON.stringify(carts, null, 2), error => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ ERROR: "Error interno del Servidor" });
                    }
                    res.json(cart);
                });
            } else {
                res.status(404).json({ ERROR: "Producto no encontrado en el carrito" });
            }
        } else {
            res.status(404).json({ ERROR: "Carrito no encontrado" });
        }
    });
});

// Endpoint delete para eliminar un producto del carrito
router.delete('/:cid/carrito/:id', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.id;

    fs.readFile('data/carts.json', "utf8", (error, data) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
        const carts = JSON.parse(data);
        const cart = carts.find(cart => cart.id === parseInt(cartId));
        if (cart) {
            const productIndex = cart.products.findIndex(product => product.id === parseInt(productId));
            if (productIndex !== -1) {
                cart.products.splice(productIndex, 1);
                fs.writeFile('data/carts.json', JSON.stringify(carts, null, 2), error => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ ERROR: "Error interno del Servidor" });
                    }
                    res.json({ Mensaje: "El producto se ha eliminado correctamente del carrito" });
                });
            } else {
                res.status(404).json({ ERROR: "Producto no encontrado en el carrito" });
            }
        } else {
            res.status(404).json({ ERROR: "Carrito no encontrado" });
        }
    });
});

// Endpoint delete para eliminar un carrito completo
router.delete('/carrito/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    fs.readFile('data/carts.json', "utf8", (error, data) => {
        if (error) {
            return res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
        const carts = JSON.parse(data);
        const cartIndex = carts.findIndex(cart => cart.id === cartId);    
        if (cartIndex !== -1) {
            carts.splice(cartIndex, 1);
            fs.writeFile('data/carts.json', JSON.stringify(carts, null, 2), error => {
                if (error) {
                    return res.status(500).json({ ERROR: "Error interno del Servidor" });
                }
                res.json({ Mensaje: "El carrito se ha eliminado correctamente" });
            });
        } else {
            res.status(404).json({ ERROR: "Carrito no encontrado" });
        }
    });
});






export default router;


