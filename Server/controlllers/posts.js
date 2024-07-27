

import mongoose from "mongoose";
import PostMessage from "../modals/postMessage.js";

export const getPosts = async (req, res) => {
   const { page } = req.query;
   try {
      const LIMIT = 8;
      const startIndex = (Number(page) - 1) * LIMIT;
      const total = await PostMessage.countDocuments({});
      const postMessage = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
      res.status(200).json({ data: postMessage, currentpage: Number(page), numberOfPage: Math.ceil(total / LIMIT) });
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
}



export const createPost = async (req,res)=>{
   const post = req.body;
   // const newPost = new PostMessage(post);
   const newPost = new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()})
   try {
    await newPost.save();
       res.status(201).json(newPost);
   } catch (error) {
       res.status(409).json({ message: error.message });
   }
}


export const updatePost = async (req,res)=>{
   const {id:_id} = req.params;
   const post = req.body;
   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post With That Id");
   //when we are not add [currentId,dispatch] this
   // const upDatePosts = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
   //when we are add this [currentId,dispatch] this
   const upDatePosts = await PostMessage.findByIdAndUpdate(_id, {...post,_id},{new:true});
   res.json(upDatePosts);

}


export const deletePost = async(req,res)=>{
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post With That Id");
   await PostMessage.findOneAndRemove(id);
   res.json({message:"Post Deleted"});
}

export const likePost = async (req, res) => {
   const { id } = req.params;

   //check user is authatigate to like a post
   if (!req.userId || req.userId.trim() === '') return res.json({message:"User Not Authantigate"});

   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

   const post = await PostMessage.findById(id);

   //likes is a realtime component of node js
   //check user is alerady like or not post then continue 
   const index = post.likes.findIndex((id)=>id===String(req.userId));

   if(index===-1){
      //like the post 
      post.likes.push(req.userId);
   }else{
      //unlike the post 
      post.likes = post.likes.filter((id)=>id!==String(req.userId));
   }

   // const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
   const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

   res.json(updatedPost);
}


export const getPostBySearch = async(req,res) =>{
   const { searchQuery, tags } = req.query;
  try {
   const title = new RegExp(searchQuery,'i');
   const posts = await PostMessage.find({$or:[{title},{tags:{$in:tags.split(",")}}]}); 
   res.json({data:posts})
  } catch (error) {
   res.status(404).json({message:error.message});
  }
}