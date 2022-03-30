/*********************** CLASE 08 ************************/
/********** Desafio Entregable: Router & Multer **********/
/************** Usar este codigo en POSTMAN **************/
/****** Tambien se pueden cargar productos desde el FORM del index *********/

const express = require("express");

const app = express()
const routerProductos = express.Router()

app.use("/api", routerProductos)

routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

/*********** API PRODUCTOS *************/

const productos = []

/********** Me devuelve el array de productos entero **********/

routerProductos.get("/productos", (req, res) => {
    res.json(productos)
})

/********** Guarda un producto nuevo en el array productos **********/

routerProductos.post("/productos", (req, res) => {
    req.body = {...req.body, id: productos.length + 1}
    productos.push(req.body)
    // productos[productos.length].id = productos.length
    res.json(res.body)
})

/********** Me devuelve el producto con el ID requerido en la ruta y muestra **********/

routerProductos.get("/productos/:id", (req, res) => {
    const { id } = req.params
    const result = productos.find((productos) => productos.id == id);
            if(result != undefined){
                res.json(result);
            }else {
                res.json("No se encontro el producto buscado!")
            }
})

/********** Me devuelve el producto con el ID requerido en la ruta y lo sobreescribe **********/

routerProductos.put("/productos/:id", (req, res) => {
    const { id } = req.params
    const producto = productos.find((productos) => productos.id == id);
        if (producto != undefined){
            productos[parseInt(id) - 1] = {...req.body, id: id}
            res.json(productos)
            res.send({ Actualizado: producto.id })
        } else {
            res.json("No se encontro el producto buscado!")
        }
})

/********** Elimina del array el producto con el ID requerido en la ruta **********/

routerProductos.delete("/productos/:id", (req, res) => {
    const { id } = req.params
    const productoEncontrado = productos.find((productos) => productos.id == id);
    if (productoEncontrado != undefined){
        const posicion = productos.indexOf(productoEncontrado)
        productos.splice(posicion, 1);
        res.send({ Eliminado: id })
    } else {
        res.json("No se encontro el producto buscado!")
    }
})

/*************SERVER LISTEN***********/

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en el servidor ${error}`))

/************************************/
