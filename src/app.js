import express, { json, urlencoded } from "express"
import handlebars from "express-handlebars"
import __dirname from "./utils/utils.js"

const app = express()
const PORT = 8080

import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"

// Middlewares
app.use(json())
app.use(urlencoded({ extended: true }))

// Configurar handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
//Utilizar recursos estáticos

app.use(express.static(__dirname, +  '/public'));

app.use("/", cartsRouter)
app.use("/", productsRouter)

// LISTENER
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})