import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}` // Add JWT from storage
    }
});


export const getProducts = async () => {
    try {
        const response = await API.get("/api/products/allproducts"); // Full correct path
        console.log("API Response:", response.data); // Debug log
        return response.data.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return [];
    }
};

export const addProduct = async (productData) => {
    const response = await API.post("/api/products/createproduct", productData);
    return response.data;
};

export const updateProduct = async (id, updatedData) => {
    const response = await API.put(`/api/products/updateproduct/${id}`, updatedData);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await API.delete(`/api/products/deleteproduct/${id}`);
    return response.data;
};