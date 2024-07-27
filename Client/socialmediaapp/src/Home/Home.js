import React from "react";
import { useState,useEffect } from "react";
import { useDispatch} from 'react-redux';
import { getPosts, fetchPostBySearch } from '../actions/Posts';
import Posts from "../Posts/Posts.js";
import Forms from "../components/Form/Form.js";
import ChipInput from "material-ui-chip-input";
import { Container, AppBar, Typography, Grow, Grid, Paper ,TextField,Button} from "@material-ui/core";
import PaginationControl from "../components/Pagination";
import { useHistory, useLocation } from "react-router-dom";
import useStyles from "../style.js";
import { spacing } from '@mui/system';



function useQuery(){
    return new URLSearchParams(useLocation.search);
}

const Home = () =>{
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get("searchQuery");
    const [search,setSearch] = useState('');
    const [tags, setTags] = useState([]); 

    useEffect(() => {
        dispatch(getPosts());
        //add current is when we change the current Id
    }, [currentId, dispatch]);

    const handlekeypress = (e)=>{
        if (e.keyCode===13){

        }
       
    }

    const searchPost = () =>{
        if (search.trim() || tags){
    //  console.log(tags);
     dispatch(fetchPostBySearch({search,tags:tags.join(',')}))
     history.push(`/posts/search?searchQuery/=${search || 'none'}&${tags.join(',')}`)
       }else{
        history.push('/')
       }
    }

    const handleAdd = (tag) => setTags([...tags,tag])
    const handledelete = (tagDelete) => setTags(tags.filter((tag) => tag !== tagDelete));
    return(
        <Grow in>
            <Container maxWidth="xl">
                <Grid container className={classes.gridContainer}   justifyContent='center' alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.appBarSearch}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                       <TextField
                       name="search"
                       variant="outlined"
                       label="Search..."
                       fullWidth
                       onKeyPress={handlekeypress}
                       value={search}
                       onChange={(e)=>{setSearch(e.target.value)}}
                       
                       />
                         <ChipInput
                            style={{"margin":"0px 20px"}}
                            value={tags}
                            onAdd={handleAdd}
                            onDelete={handledelete}
                            label="Search tags"
                         
                            variant="outlined"

                            />
                        </AppBar>
                        <Button onClick={searchPost} color="primary">Search</Button>
                        <Forms currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6}>
                            <PaginationControl page={page} className={classes.pagination}/>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;