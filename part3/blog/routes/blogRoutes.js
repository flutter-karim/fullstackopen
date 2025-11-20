import express from "express";
import { createNewBlog, getAllBlogs } from "../controllers/BlogController.js";

const router = express.Router();

router.route("/blogs").get(getAllBlogs).post(createNewBlog);

export default router;
