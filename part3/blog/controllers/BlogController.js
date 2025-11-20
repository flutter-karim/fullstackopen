import BlogModel from "../models/Blog.js";

export const getAllBlogs = async (req, res) => {
  const blogs = await BlogModel.find({});
  res.status(200).json(blogs);
};

export const createNewBlog = async (req, res) => {
  const bnewBlog = req.body;
  const blog = await BlogModel.create(bnewBlog);

  res.status(201).json(blog);
};
