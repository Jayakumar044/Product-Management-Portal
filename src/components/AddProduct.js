import React, { useState } from "react";
import "../styles/AddProduct.css";

const AddProduct = ({ addProduct, products }) => {
  const [product, setProduct] = useState({
    productId: "",
    date: "",
    productName: "",
    bulkStockCount: "",
    currentAvailabilityStock: "",
    wholesalePricePerProduct: "",
    salePricePerProduct: "",
    totalWholesalePrice: "",
    totalSalesPrice: "",
    totalProfit: "",
  });
  const [errors, setErrors] = useState({});
  const [productNames, setProductNames] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (!product.productId) newErrors.productId = "Product ID is required";
    if (!product.date) newErrors.date = "Date is required";
    if (!product.bulkStockCount) newErrors.bulkStockCount = "Bulk Stock Count is required";
    if (!product.wholesalePricePerProduct) newErrors.wholesalePricePerProduct = "Wholesale Price is required";
    if (!product.salePricePerProduct) newErrors.salePricePerProduct = "Sale Price is required";
    return newErrors;
  };

  const handleAddProductName = () => {
    if (product.productName && !productNames.includes(product.productName)) {
      setProductNames([...productNames, product.productName]);
      alert("Product name added to dropdown!");
    }
  };

  const handleCalculate = (e) => {
    const { name, value } = e.target;
    const updatedProduct = { ...product, [name]: value };

    // Calculate Current Availability Stock
    updatedProduct.currentAvailabilityStock = updatedProduct.bulkStockCount;

    // Calculate Total Wholesale Price
    updatedProduct.totalWholesalePrice =
      updatedProduct.bulkStockCount * updatedProduct.wholesalePricePerProduct;

    // Calculate Total Sales Price
    updatedProduct.totalSalesPrice =
      updatedProduct.bulkStockCount * updatedProduct.salePricePerProduct;

    // Calculate Total Profit
    updatedProduct.totalProfit =
      updatedProduct.totalSalesPrice - updatedProduct.totalWholesalePrice;

    setProduct(updatedProduct);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    addProduct(product);
    setProduct({
      productId: "",
      date: "",
      productName: "",
      bulkStockCount: "",
      currentAvailabilityStock: "",
      wholesalePricePerProduct: "",
      salePricePerProduct: "",
      totalWholesalePrice: "",
      totalSalesPrice: "",
      totalProfit: "",
    });
    setErrors({});
    alert("Product added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <div>
        <label>Product ID</label>
        <input
          type="text"
          name="productId"
          value={product.productId}
          onChange={(e) => setProduct({ ...product, productId: e.target.value })}
        />
        {errors.productId && <span className="error">{errors.productId}</span>}
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={product.date}
          onChange={(e) => setProduct({ ...product, date: e.target.value })}
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </div>
      <div>
        <label>Add Product Name</label>
        <input
          type="text"
          name="productName"
          value={product.productName}
          onChange={(e) => setProduct({ ...product, productName: e.target.value })}
        />
        <button type="button" onClick={handleAddProductName}>
          Add Product Name
        </button>
      </div>
      <div>
        <label>Select Product</label>
        <select
          name="productName"
          value={product.productName}
          onChange={(e) => setProduct({ ...product, productName: e.target.value })}
        >
          <option value="">Select Product</option>
          {productNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Bulk Stock Count</label>
        <input
          type="number"
          name="bulkStockCount"
          value={product.bulkStockCount}
          onChange={handleCalculate}
        />
        {errors.bulkStockCount && <span className="error">{errors.bulkStockCount}</span>}
      </div>
      <div>
        <label>Wholesale Price per Product (₹)</label>
        <input
          type="number"
          name="wholesalePricePerProduct"
          value={product.wholesalePricePerProduct}
          onChange={handleCalculate}
        />
        {errors.wholesalePricePerProduct && (
          <span className="error">{errors.wholesalePricePerProduct}</span>
        )}
      </div>
      <div>
        <label>Sale Price per Product (₹)</label>
        <input
          type="number"
          name="salePricePerProduct"
          value={product.salePricePerProduct}
          onChange={handleCalculate}
        />
        {errors.salePricePerProduct && (
          <span className="error">{errors.salePricePerProduct}</span>
        )}
      </div>
      <div>
        <label>Total Wholesale Price (₹)</label>
        <input
          type="number"
          name="totalWholesalePrice"
          value={product.totalWholesalePrice}
          readOnly
        />
      </div>
      <div>
        <label>Total Sales Price (₹)</label>
        <input
          type="number"
          name="totalSalesPrice"
          value={product.totalSalesPrice}
          readOnly
        />
      </div>
      <div>
        <label>Total Profit (₹)</label>
        <input
          type="number"
          name="totalProfit"
          value={product.totalProfit}
          readOnly
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;