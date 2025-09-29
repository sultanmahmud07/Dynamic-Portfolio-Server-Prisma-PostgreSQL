import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db";
import { AuthService } from "./auth.service";

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    // set httpOnly cookie
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 7 * 24 * 3600 * 1000 });
    res.json({ message: "Logged in" });
};

const logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
};
const loginWithEmailAndPassword = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.loginWithEmailAndPassword(req.body)
       console.log(result)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}


export const AuthController = {
    login,
    logout,
     loginWithEmailAndPassword
};
