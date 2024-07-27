import { FETCH_ALL, CREATE, LIKE, DELETE, UPDATE } from '../constants/actionType';

export default (posts = [],action) =>{
    switch (action.type) {
     case DELETE:
          return posts.filter((post)=>post._id !== action.payload);
     case UPDATE:
     case LIKE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case FETCH_ALL:
              return {
                   ...posts, posts: action.payload.data,
                   currentpage: action.payload.currentpage,
                   numberOfPage: action.payload.currentpage
               };
    case CREATE:
         return [...posts,action.payload];
    default:
       return posts;
   }
}



// import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, LIKE, DELETE, UPDATE } from '../constants/actionType';

// export default (posts = [], action) => {
//      switch (action.type) {
//           case DELETE:
//                return posts.filter((post) => post._id !== action.payload);
//           case UPDATE:
//           case LIKE:
//                return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
//           case FETCH_ALL:
//                return {
//                     ...posts, posts: action.payload.data,
//                     currentpage: action.payload.currentpage,
//                     numberOfPage: action.payload.currentpage
//                };
//           case CREATE:
//                return [...posts, action.payload];
//           case FETCH_BY_SEARCH:
//                return action.payload;
//           default:
//                return posts;
//      }
// }









