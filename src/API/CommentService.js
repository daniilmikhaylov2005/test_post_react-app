import axios from "axios";

export default class CommentService {
    static async getById(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/` + id + "/comments")

        return response
    }
}