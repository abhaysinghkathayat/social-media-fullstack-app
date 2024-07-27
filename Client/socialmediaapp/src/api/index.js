import axios from "axios";
const API = axios.create({ baseURL: 'http://localhost:5000' })

// const url = 'http://localhost:5000/posts';
// export const FetchPost = () => API.get(url);
// export const createPost = (newPost) => API.post(url, newPost);
// export const updatePost = (id, updatedPost) => API.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`${url}/${id}`);
// export const likePost = (id) => API.patch(`${url}/${id}/likePost`);


API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authrization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

export const FetchPost = (page) => API.get(`/posts?page=${page}`);
// export const FetchPost = (page) => API.get('/posts');
export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags !== undefined ? searchQuery.tags : ''}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`${'/posts'}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${'/posts'}/${id}`);
export const likePost = (id) => API.patch(`${'/posts'}/${id}/likePost`);

//for userAauthaantigation to login and Signup
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData)










