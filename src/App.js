import React, { useState, useEffect } from "react";
import AddProduct from "./components/AddProduct";
import ProductTable from "./components/ProductTable";
import BarChart from "./components/BarChart";
import SearchFilter from "./components/SearchFilter";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
    setFilteredProducts(savedProducts);
  }, []);

  // Save data to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const newProducts = [...products, product];
    setProducts(newProducts);
    setFilteredProducts(newProducts);
  };

  const updateProduct = (id, updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.productId === id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.productId !== id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div className="App">
      <h1>Product Management System</h1>
      <SearchFilter handleSearch={handleSearch} />
      <AddProduct addProduct={addProduct} products={products} />
      <ProductTable
        products={filteredProducts}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
        searchQuery={searchQuery}
      />
      <BarChart products={filteredProducts} />
    </div>
  );
}

export default App;