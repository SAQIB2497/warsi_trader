import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/products`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});


export const getProducts = async () => {
    try {
        const response = await API.get("/allproducts");
        console.log('API Response:', response.data); // For debugging

        // Handle both possible response structures
        return response.data.data || response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const addProduct = async (productData) => {
    const response = await API.post("/createproduct", productData);
    return response.data;
};

export const updateProduct = async (id, updatedData) => {
    const response = await API.put(`/updateproduct/${id}`, updatedData);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await API.delete(`/deleteproduct/${id}`);
    return response.data;
};