import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        brand: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            enum: ["Electronics", "Clothing", "Furniture", "Accessories"],
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
        image: {
            type: [String],
            default: [],
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
