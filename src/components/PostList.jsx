import React from "react"
import PostItem from "./PostItem"

const PostList = (props) => {
    if(!props.posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>Посты не найдены</h1>
        )
    }
    return (
        <div>
            <h2 style={{textAlign: 'center'}}>{props.title}</h2>
            {props.posts.map((post, index) =>
                <PostItem remove={props.remove} number={index + 1} post={post} key={post.id}/>
            )}
      </div>
    )
}

export default PostList