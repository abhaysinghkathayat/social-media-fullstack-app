import express from "express";
import { getPostBySearch, getPosts, createPost, updatePost, deletePost,likePost } from "../controlllers/posts.js";
const router = express.Router();
import auth from "../middlewere/auth.js";

router.get('/search',getPostBySearch)
router.get("/", getPosts);
router.post('/',auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likepost', auth, likePost);
export default router;

