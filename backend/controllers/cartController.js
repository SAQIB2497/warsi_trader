import Cart from "../models/Cart.js";
import Product from "../models/productsModel.js";

// Add item to cart
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        const populatedCart = await Cart.findById(cart._id).populate("items.productId");
        res.status(200).json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
};

// Get Cart for the logged-in user
export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        let cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart) {
            cart = new Cart({ userId, items: [] });
            await cart.save();
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update cart item quantity
export const updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.user.id })
            .populate({
                path: 'items.productId',
                model: Product
            });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(item =>
            item.productId._id.toString() === productId
        );

        if (!item) return res.status(404).json({ message: "Item not found" });

        item.quantity = quantity;
        await cart.save();

        // Re-populate to get latest data
        const populatedCart = await Cart.findById(cart._id)
            .populate({
                path: 'items.productId',
                model: Product
            });

        res.status(200).json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId: req.user.id })
            .populate("items.productId");

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);
        await cart.save();
        const populatedCart = await Cart.findById(cart._id).populate("items.productId");
        res.status(200).json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: "Error removing from cart", error });
    }
};


export const mergeCart = async (req, res) => {
    const { items } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items });
        } else {
            items.forEach(localItem => {
                const existingItem = cart.items.find(item => item.productId.toString() === localItem.productId);
                if (existingItem) {
                    existingItem.quantity += localItem.quantity;
                } else {
                    cart.items.push(localItem);
                }
            });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error merging cart", error });
    }
};