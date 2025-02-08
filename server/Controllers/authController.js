import loginSchema from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await loginSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = loginSchema.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await loginSchema.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "user not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        email: existingUser.email,
        name: existingUser.name,
        id: existingUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "20d" }
    );
    res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
