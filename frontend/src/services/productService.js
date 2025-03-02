import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/products"; // Backend URL

// Helper function to get the token
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found in localStorage");
        throw new Error("No token found. Please log in again.");
    }

    const headers = { Authorization: `Bearer ${token}` };
    console.log("Auth Headers:", headers); // ✅ Debugging
    return headers;
};

// ✅ Fetch all products
export const getProducts = async () => {
    const response = await axios.get(`${API_BASE_URL}/allproducts`, {
        headers: getAuthHeaders(),
        withCredentials: true,
    });
    return response.data;
};

// ✅ Add a product
export const addProduct = async (productData) => {
    try {
        console.log("Sending product data:", productData); // ✅ Debugging
        const response = await axios.post(
            `${API_BASE_URL}/createproduct`,
            productData,
            {
                headers: getAuthHeaders(),
                withCredentials: true,
            }
        );
        console.log("Product added successfully:", response.data); // ✅ Debugging
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// ✅ Update a product
export const updateProduct = async (id, updatedData) => {
    const response = await axios.put(
        `${API_BASE_URL}/updateproduct/${id}`,
        updatedData,
        {
            headers: getAuthHeaders(),
            withCredentials: true,
        }
    );
    return response.data;
};

// ✅ Delete a product
export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/deleteproduct/${id}`, {
        headers: getAuthHeaders(),
        withCredentials: true,
    });
    return response.data;
};