import Cart from "../models/Cart.js";
import Product from "../models/productsModel.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) cart = new Cart({ userId, items: [] });

        const existingItem = cart.items.find(item =>
            item.productId._id.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json(await Cart.findById(cart._id).populate('items.productId'));
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
};

export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        let cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            cart = new Cart({ userId, items: [] });
            await cart.save();
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId: req.user.id })
            .populate('items.productId');

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(item =>
            item.productId._id.toString() === productId
        );

        if (!item) return res.status(404).json({ message: "Item not found" });
        item.quantity = quantity;

        await cart.save();
        res.status(200).json(await Cart.findById(cart._id).populate('items.productId'));
    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ userId: req.user.id })
            .populate('items.productId');

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item =>
            item.productId._id.toString() !== productId
        );

        await cart.save();
        res.status(200).json(await Cart.findById(cart._id).populate('items.productId'));
    } catch (error) {
        res.status(500).json({ message: "Error removing item", error });
    }
};

export const mergeCart = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) cart = new Cart({ userId, items: [] });

        items.forEach(localItem => {
            const existing = cart.items.find(item =>
                item.productId._id.toString() === localItem.productId
            );
            existing ? existing.quantity += localItem.quantity
                : cart.items.push(localItem);
        });

        await cart.save();
        res.status(200).json(await Cart.findById(cart._id).populate('items.productId'));
    } catch (error) {
        res.status(500).json({ message: "Merge failed", error });
    }
};