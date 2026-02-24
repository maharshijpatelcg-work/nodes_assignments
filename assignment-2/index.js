const express = require('express');
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
app.get("/products" , (req,res)=>{
    res.json(products);
})
app.get("/products/:id" , (req,res)=>{
    const id = Number(req.params.id);
    const product = products.find(p=>p.id === id);
    if(!product){
        return res.status(404).json({message : "Product not found"});
    }
    res.json(product);
})
app.get("/products/category/:categoryName" , (req,res)=>{
const categoryName = req.params.categoryName;
const productCategory = products.filter(s=>s.category === categoryName);
if(productCategory.length === 0){
    return res.status(404).json({message : "Product not found"});
}
res.json(productCategory);
})

app.listen(3000 , () =>{
    console.log("Server running at http://localhost:3000")
})