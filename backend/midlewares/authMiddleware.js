import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            role: decoded.role
        };
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const adminMiddleware = (req, res, next) => {
    req.user?.role === "admin"
        ? next()
        : res.status(403).json({ message: "Admin access required" });
};