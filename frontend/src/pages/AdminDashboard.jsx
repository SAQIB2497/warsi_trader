const AdminDashboard = () => {
  const products = [
    {
      _id: "1",
      name: "Laptop",
      price: 1200,
      category: "Electronics",
      stock: 10,
    },
    {
      _id: "2",
      name: "Smartphone",
      price: 800,
      category: "Electronics",
      stock: 15,
    },
    {
      _id: "3",
      name: "Headphones",
      price: 150,
      category: "Accessories",
      stock: 20,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Admin Dashboard - Manage Products
      </h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border">
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">${product.price}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">
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
