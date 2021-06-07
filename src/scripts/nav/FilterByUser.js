import {getUsers, getPosts, getLikes} from "../data/provider.js"
import { PostList } from "../feed/PostList.js"

export const footerUsers = () => {
    const users = getUsers()
    return `
    <select name="footerNames">
    ${users.map(
        user => {
            return `
            <option value="${user.id}">${user.name}</option>
            `
        }
    )}
    </select>`
}

export const filterWallByUser = (userID) => {
    const posts = getPosts()
    const filteredPosts = []

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].userId === userID) {
            filteredPosts.push(posts[i])
        }
    }

    filteredPosts.sort(function(x, y){
        return y.timestamp - x.timestamp;
    })

    const filteredWall = PostList(filteredPosts)
    return filteredWall
}