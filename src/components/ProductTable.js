import React, { useState } from "react";
import "../styles/ProductTable.css";

const ProductTable = ({ products, updateProduct, deleteProduct, searchQuery }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [dateFilter, setDateFilter] = useState("all"); // "all", "month", "year", "date"
  const [filterValue, setFilterValue] = useState("");

  const handleUpdate = (product) => {
    updateProduct(product.productId, product);
    setEditingProduct(null);
    console.log("Product updated:", product);
    alert("Product updated successfully!");
  };

  const handleDateFilter = (products) => {
    if (dateFilter === "all") return products;

    return products.filter((product) => {
      const productDate = new Date(product.date);
      switch (dateFilter) {
        case "month":
          return productDate.getMonth() + 1 === parseInt(filterValue);
        case "year":
          return productDate.getFullYear() === parseInt(filterValue);
        case "date":
          return product.date === filterValue;
        default:
          return true;
      }
    });
  };

  const filteredProducts = handleDateFilter(products);

  return (
    <div className="product-table-container">
      <div className="date-filter">
        <label>Filter by Date:</label>
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="date">Exact Date</option>
        </select>
        {dateFilter !== "all" && (
          <input
            type={dateFilter === "date" ? "date" : "number"}
            placeholder={`Enter ${dateFilter}`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        )}
      </div>
      {filteredProducts.length === 0 ? (
        <p className="no-products">No products available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Date</th>
              <th>Select Product</th>
              <th>Bulk Stock Count</th>
              <th>Current Availability Stock</th>
              <th>Wholesale Price (₹)</th>
              <th>Sale Price (₹)</th>
              <th>Total Wholesale Price (₹)</th>
              <th>Total Sales Price (₹)</th>
              <th>Total Profit (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.date}</td>
                <td>
                  <select
                    value={product.productName}
                    onChange={(e) =>
                      setEditingProduct({
                        ...product,
                        productName: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Product</option>
                    {products.map((p, index) => (
                      <option key={index} value={p.productName}>
                        {p.productName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{product.bulkStockCount}</td>
                <td>{product.currentAvailabilityStock}</td>
                <td>{product.wholesalePricePerProduct}</td>
                <td>{product.salePricePerProduct}</td>
                <td>{product.totalWholesalePrice}</td>
                <td>{product.totalSalesPrice}</td>
                <td>{product.totalProfit}</td>
                <td>
                  <button
                    className="update-button"
                    onClick={() => setEditingProduct(product)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteProduct(product.productId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingProduct && (
        <div className="edit-modal">
          <h3>Edit Product</h3>
          <div>
            <label>Product ID</label>
            <input
              type="text"
              value={editingProduct.productId}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, productId: e.target.value })
              }
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              value={editingProduct.date}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, date: e.target.value })
              }
            />
          </div>
          <div>
            <label>Bulk Stock Count</label>
            <input
              type="number"
              value={editingProduct.bulkStockCount}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  bulkStockCount: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Wholesale Price per Product (₹)</label>
            <input
              type="number"
              value={editingProduct.wholesalePricePerProduct}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  wholesalePricePerProduct: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Sale Price per Product (₹)</label>
            <input
              type="number"
              value={editingProduct.salePricePerProduct}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  salePricePerProduct: e.target.value,
                })
              }
            />
          </div>
          <div className="modal-buttons">
            <button className="save-button" onClick={() => handleUpdate(editingProduct)}>
              Save
            </button>
            <button className="cancel-button" onClick={() => setEditingProduct(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;