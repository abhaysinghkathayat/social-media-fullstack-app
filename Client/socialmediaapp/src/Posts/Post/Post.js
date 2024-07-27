import React from 'react';
import style from "./style.js";
import useStyles from "./style";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, IconButton } from '@material-ui/core';
import moment from 'moment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../actions/Posts';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Like = () => {
        const userLiked = post.likes.find((like) => like === (user?.result?.googleId || user?.result._id));
        return (
            <>
                <IconButton size="small" color={userLiked ? "primary" : "default"} onClick={() => (dispatch(likePost(post._id)))}>
                    {userLiked ? <ThumbUpAltIcon fontSize="small" /> : <ThumbUpAltOutlinedIcon fontSize='small' />} &nbsp;
                    {userLiked ? 'Liked' : 'Like'}&nbsp;&nbsp;
                    <span>{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</span>
                </IconButton>
               
            </>
        );
    };

    return (
        <>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div className={classes.overlay2}>
                    <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>

                <Typography className={classes.title} variant="h5" gutterBottom >{post.title}</Typography>
                <CardContent>
                    <Typography variant="h2" color='textSecondary' component="p" gutterBottom>{post.message}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    {(!post.likes.length || !post.likes.includes(user?.result?.googleId || user?.result?._id)) && (
                        <Button size="small" color="primary" disabled={!user?.result} onClick={() => (dispatch(likePost(post._id)))}>
                            <ThumbUpAltOutlinedIcon fontSize='small' />&nbsp;Like
                        </Button>
                    )}
                    {(post.likes.length > 0) && <Like />}
                   

                    <Button size="small" disabled={!user?.result} color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
                </CardActions>
           </Card>
        </>
    )
}

export default Post;