import React, { useState, useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "@material-ui/core";
import useStyles from "./style.js";
import { getPosts } from "../actions/Posts.js";
import { useDispatch, useSelector } from "react-redux";

const PaginationControl = ({ page }) => { 
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const { numberofPages } = useSelector((state) => state.posts)

    useEffect(() => {
        if (page) dispatch(getPosts(page));
    }, [page, dispatch]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberofPages}
            page={page ? Number(page) : 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?page=${alert(item.page)}`}
                />
            )}
        />
    );
};

export default PaginationControl;
