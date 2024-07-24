import express, { json, urlencoded } from "express"
const app = express()
const PORT = 8080
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"



// Middlewares

app.use(json())
app.use(urlencoded({ extended: true }))



app.use("/", cartsRouter)
app.use("/", productsRouter)


// LISTENER

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})