import React, {useState} from "react"
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = props => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
          id: Date.now(),
          title,
          body
        }

        props.create(newPost)
    
        setTitle('')
        setBody('')
    }

    return (
        <form>
            <MyInput 
            type="text" 
            placeholder="Название поста"
            value={title}
            onChange={e => setTitle(e.target.value)}
            />
            <MyInput 
            type="text" 
            placeholder="Описание поста"
            value={body}
            onChange={e => setBody(e.target.value)}
            />
            <MyButton onClick={addNewPost}>Добавить пост</MyButton>
        </form>
    )
}

export default PostForm