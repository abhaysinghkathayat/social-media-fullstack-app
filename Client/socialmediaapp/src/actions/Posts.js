import * as api from '../api';
import { FETCH_ALL, CREATE, LIKE, DELETE, UPDATE, FETCH_BY_SEARCH } from '../constants/actionType';


export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await api.FetchPost(page);
    console.log(data);
   dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log("Error fetching posts: ", error);
  }
};

export const fetchPostBySearch = (searchquery) => async (dispatch) => {
  try{
    const { data: { data } } = await api.fetchPostBySearch(searchquery); 
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    console.log(data);
  }catch(error){
    console.log("Error fetching posts: ", error);
  }
}


export const createPost = (post) => async(dispatch)=>{
    try {
        const {data} = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log("Error Create posts: ", error);
    }
}


export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    // console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch)=>{
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
}


export const likePost = (id) => async(dispatch)=>{
  try {
    const {data} = await api.likePost(id);
    dispatch({type:LIKE,payload:data});
  } catch (error) {
    console.log(error);
  }
}