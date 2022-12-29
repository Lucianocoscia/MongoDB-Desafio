const date = new Date();
let dateOficial = date.toLocaleString();

db.mensajes.insert([
  { username: "John", message: "Hola0", time: dateOficial },
  { username: "Pepe", message: "Hola1", time: dateOficial },
  { username: "Jose", message: "Hola2", time: dateOficial },
  { username: "Carlos", message: "Hola3", time: dateOficial },
  { username: "Marcelo", message: "Hola4", time: dateOficial },
  { username: "Mariano", message: "Hola5", time: dateOficial },
  { username: "Segundo", message: "Hola6", time: dateOficial },
  { username: "Tomas", message: "Hola7", time: dateOficial },
  { username: "Lucas", message: "Hola8", time: dateOficial },
  { username: "Pedro", message: "Hola9", time: dateOficial },
]);
db.mensajes.find();

db.productos.insert([
  { title: "Tornillo", price: 120, thumbnail: "url1" },
  { title: "Martillo", price: 580, thumbnail: "url2" },
  { title: "Perno", price: 900, thumbnail: "url3" },
  { title: "Lija", price: 1280, thumbnail: "url4" },
  { title: "Alambre", price: 1700, thumbnail: "url5" },
  { title: "Canio", price: 2300, thumbnail: "url6" },
  { title: "Destornillador", price: 2860, thumbnail: "url7" },
  { title: "Masa", price: 3350, thumbnail: "url8" },
  { title: "Cinta", price: 4320, thumbnail: "url9" },
  { title: "Tuercas", price: 4990, thumbnail: "url10" },
]);
db.productos.find();

db.mensajes.estimatedDocumentCount();
db.productos.estimatedDocumentCount();

//CRUD

//agrego un producto mas en la coleccion productos
db.productos.insertOne({ title: "Mesa", price: "3800", thumbnail: "url11" });

//Busco por nombre especifico
db.productos.find({ title: "Tornillo" });

//busco producto con precio menor a 1000
db.productos.find({ price: { $lt: 1000 } });

// busca producto con precio entre los 1000 y los 3000
db.productos.find({
  $and: [{ price: { $gte: 1000 } }, { price: { $lte: 3000 } }],
});

//busco producto con precio mayor a 3000
db.productos.find({ price: { $gt: 3000 } });

// busqueda q traiga solo el nombre del tercer producto mas barato
db.productos
  .find({ $and: [{ price: { $lt: 1000 } }] }, { title: 1, _id: 0 })
  .sort({ precio: 1 })
  .limit(1)
  .skip(2);

//update sobre todos los productos y agregar campo stock con un valor de 100
db.productos.updateMany({}, { $set: { stock: 100 } }, { upsert: true });

// cambiar stock a cero de los productos con precios mayores a 4000
db.productos.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } });

// borrar producto con precio menor a 1000
db.productos.findOneAndDelete({ price: { $lt: 1000 } });

//crear usuario pepe clave asd456 q soolo puieda leer la base de datos ecommerce, y verificar q no pueda cambiar la info
// use admin
db.createUser({
  user: "pepe",
  pwd: "asd456",
  roles: [{ role: "read", db: "ecommerce" }],
});
