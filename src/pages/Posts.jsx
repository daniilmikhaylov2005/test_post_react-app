import {useState, useEffect, useRef} from "react"
import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import PostFilter from "../components/PostFilter"
import MyModal from "../components/UI/MyModal/MyModal"
import MyButton from "../components/UI/button/MyButton"
import Loader from "../components/UI/Loader/Loader"
import {usePosts} from "../hooks/usePosts.js"
import {useFetching} from "../hooks/useFetching.js"
import {getPageCount, getPagesArray} from "../utils/pages";
import {useObserver} from "../hooks/useObserver";
import PostService from "../API/PostService.js"
import '../styles/App.css'

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()
    let pagesArray = getPagesArray(totalPages)

    console.log([pagesArray])
    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = +response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1)
    })


    useEffect(() => {
        fetchPosts()
    }, [page])

    const changePage = page => {
        setPage(page)
    }

    const createPost = newPost => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = post => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов'/>
            <div ref={lastElement}/>
            {isPostLoading &&
                <div style={{display: 'flex', justifyContent: "center", marginTop: '50px'}}><Loader /></div>
            }
        </div>
    );
};

export default Posts;