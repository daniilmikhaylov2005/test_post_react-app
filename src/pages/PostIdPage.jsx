import React from 'react';
import {useParams} from "react-router-dom"
import PostService from "../API/PostService";
import CommentService from "../API/CommentService"
import {useFetching} from "../hooks/useFetching";
import {useEffect, useState} from "react"
import Loader from "../components/UI/Loader/Loader"

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comment, setComment] = useState([])

    const [fetchPostById, isPostLoading, postError] = useFetching(async id => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })

    const [fetchCommentById, isCommentLoading, commentError] = useFetching(async id => {
        const response = await CommentService.getById(params.id)
        setComment(response.data)
        console.log(response.data)
    })

    useEffect(() => {
        fetchPostById()
        fetchCommentById()
    }, [])

    return (
        <div>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            {isPostLoading
                ? <Loader />
                : <div>{post.title}</div>
            }
            <h1>Комментарии</h1>
            {isCommentLoading
                ? <Loader />
                : <div>{comment.map(c =>
                    <div style={{marginTop: '15px'}}>
                        <h2>{c.name}</h2>
                        <h2>{c.email}</h2>
                        <div>{c.body}</div>
                    </div>
                )}</div>
            }
        </div>
    );
};

export default PostIdPage;