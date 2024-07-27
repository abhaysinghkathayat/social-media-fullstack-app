import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { Typography, Button, TextField, Paper } from '@material-ui/core';
import useStyle from './style.js';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/Posts';

const Forms = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });

    const post = useSelector((state) =>
        currentId ? state.posts.find((p) => p._id === currentId) : null
    );

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const classes = useStyle();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        } else {
            dispatch(
                updatePost(currentId, { ...postData, name: user?.result?.name })
            );
        }
        clear();
    };

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please SignIn to create your memories and Like other memories
                </Typography>
            </Paper>
        );
    }
    return(
        <>
        <Paper className={classes.paper}>
                 <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}> 
            <Typography variant='h6'>
                 {currentId ? 'Editing' : 'Creating'} a Memory
                </Typography>
                    {/* <TextField name='creator' variant='outlined' label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({...postData,creator:e.target.value})}/> */}
                    <TextField name='title' variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                    <TextField name='message' variant='outlined' label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                    <TextField name='tags' variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

                <div className={classes.fileInput}>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/>

                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                 <Button className={classes.buttonSubmit} variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
                </div>
           </form> 
        </Paper>
        </>
    
 )
}

export default Forms;