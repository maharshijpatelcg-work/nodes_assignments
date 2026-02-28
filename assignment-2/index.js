// const express = require('express');
// const app = express();
// app.use(express.json());
// const products = [
//   {
//     id: 1,
//     name: "Wireless Mouse",
//     category: "Electronics",
//     price: 799,
//     stock: 25,
//     rating: 4.3
//   },
//   {
//     id: 2,
//     name: "Running Shoes",
//     category: "Footwear",
//     price: 2499,
//     stock: 40,
//     rating: 4.5
//   },
//   {
//     id: 3,
//     name: "Laptop Stand",
//     category: "Accessories",
//     price: 999,
//     stock: 30,
//     rating: 4.2
//   },
//   {
//     id: 4,
//     name: "Smart Watch",
//     category: "Electronics",
//     price: 4999,
//     stock: 12,
//     rating: 4.4
//   },
//   {
//     id: 5,
//     name: "Backpack",
//     category: "Fashion",
//     price: 1599,
//     stock: 50,
//     rating: 4.1
//   }
// ];
// app.get("/products" , (req,res)=>{
//     res.json(products);
// })
// app.get("/products/:id" , (req,res)=>{
//     const id = Number(req.params.id);
//     const product = products.find(p=>p.id === id);
//     if(!product){
//         return res.status(404).json({message : "Product not found"});
//     }
//     res.json(product);
// })
// app.get("/products/category/:categoryName" , (req,res)=>{
// const categoryName = req.params.categoryName;
// const productCategory = products.filter(s=>s.category === categoryName);
// if(productCategory.length === 0){
//     return res.status(404).json({message : "Product not found"});
// }
// res.json(productCategory);
// })

// app.listen(3000 , () =>{
//     console.log("Server running at http://localhost:3000")
// })

const express = require("express");

const app = express();

app.use(express.json());

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    stock: 25,
    rating: 4.3
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 40,
    rating: 4.5
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 999,
    stock: 30,
    rating: 4.2
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 12,
    rating: 4.4
  },
  {
    id: 5,
    name: "Backpack",
    category: "Fashion",
    price: 1599,
    stock: 50,
    rating: 4.1
  }
];

app.get("/products", (req, res) => {
  res.status(200).json(products);
})

app.get("/products/:id", (req, res) => {
  const productID = Number(req.params.id);
  const product = products.find(u => u.id === productID);
  if (!products) {
    return res.status(404).json({ message: "User not found" })
  }
  res.status(200).json(product)
})

app.get("/products/category/:categoryName", (req, res) => {
  const categoryName = req.params.categoryName;
  const cat = products.filter(products =>
    products.category.toLowerCase() == categoryName.toLowerCase()
  );
  res.status(200).json(cat);
})

app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    rating: req.body.rating
  }

  products.push(newProduct);

  res.status(200).json({
    message: "New user is created",
    products: newProduct
  })
})

app.use(express.json());

app.put("/products/:id", (req, res) => {
  const productID = Number(req.params.id);

  const index = products.findIndex(u => u.id === productID);

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  products[index] = {
    id: productID,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    ratings: req.body.ratings
  };

  res.status(200).json({
    message: "Product replaced",
    product: products[index]
  });
});

app.put("/products/:id/stock", (req, res) => {
  const proId = Number(req.params.id)
  const index = products.findIndex(u => u.id == proId);

  products[index] = {
    stock: req.body.stock
  }
  res.status(200).json({
    message: "Product Updated",
    product: products[index]
  })

})

app.put("/products/:id/price", (req, res) => {
  const proId = Number(req.params.id)
  const index = products.findIndex(u => u.id == proId)

  products[index] = {
    price: req.body.price
  }
  res.status(200).json({
    message: "price got replaced",
    product: products[index]
  })
})


app.listen(3000, () => {
  console.log("Server started on port 3000");
});