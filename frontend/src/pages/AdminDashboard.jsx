import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
    stock: "",
    image: "", // Added image field
  });
  const [editingProductId, setEditingProductId] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.price ||
        !formData.brand ||
        !formData.category ||
        !formData.stock ||
        !formData.image
      ) {
        toast.error("Please fill out all required fields.");
        return;
      }

      if (editingProductId) {
        await updateProduct(editingProductId, formData);
        toast.success("Product updated successfully!");
      } else {
        await addProduct(formData);
        toast.success("Product added successfully!");
      }

      // Reset form and refresh product list
      setFormData({
        name: "",
        price: "",
        brand: "",
        category: "",
        stock: "",
        image: "",
      });
      setEditingProductId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product.");
    }
  };

  // Edit a product
  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      brand: product.brand,
      category: product.category,
      stock: product.stock,
      image: product.image, // Populate image URL when editing
    });
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Admin Dashboard - Manage Products
      </h2>

      {/* Product Form (Add/Edit) */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 m-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="border p-2 m-2"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
          className="border p-2 m-2"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="border p-2 m-2"
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
          <option value="Accessories">Accessories</option>
        </select>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
          className="border p-2 m-2"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="border p-2 m-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editingProductId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border">
              <td className="border p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">${product.price}</td>
              <td className="border p-2">{product.brand}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
