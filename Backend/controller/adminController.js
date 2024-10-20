const express = require("express");
const userSchema = require("../schemas/userModel");
const blogSchema = require("../schemas/blogModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../schemas/adminModel');
const config = require('../config');

// Admin Registration
const adminRegister = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            email,
            password: hashedPassword,
            name
        });

        await newAdmin.save();
        return res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error registering admin", error });
    }
};

// Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            console.log("Invalid email or password");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin._id, role: 'admin' }, config.adminSecret, { expiresIn: '1h' });
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in", error });
    }
};

// Get All Users
const getAllUsersController = async (req, res) => {
    try {
        const allUsers = await userSchema.find();
        return res.status(200).send({
            success: true,
            data: allUsers,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: `${error.message}` });
    }
};

// Get All Blogs
const getAllBlogsController = async (req, res) => {
    try {
        const allBlogs = await blogSchema.find();
        return res.status(200).send({
            success: true,
            data: allBlogs,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: `${error.message}` });
    }
};

// Delete a Blog
const deleteBlogController = async (req, res) => {
    const blogId = req.params.blogid;
    try {
        await blogSchema.findByIdAndDelete({ _id: blogId });

        return res.status(200).send({
            success: true,
            message: "The blog is deleted",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error", success: false });
    }
};

// Delete a User
const deleteUserController = async (req, res) => {
    const userId = req.params.userid;
    try {
        await userSchema.findByIdAndDelete({ _id: userId });

        return res.status(200).send({
            success: true,
            message: "The user is deleted",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error", success: false });
    }
};

// Export all controllers
module.exports = {
    adminRegister,
    adminLogin,
    getAllUsersController,
    getAllBlogsController,
    deleteBlogController,
    deleteUserController
};

