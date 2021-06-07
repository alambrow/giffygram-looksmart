import {getPosts, getLikes, getUsers} from "../data/provider.js"
import { PostList } from "../feed/PostList.js"

export const filterWallByYear = (postingYear) => {
    const posts = getPosts()
    const filteredPosts = []

    for (let i = 0; i < posts.length; i++) {

        let newDate = new Date(posts[i].timestamp).toLocaleDateString(`en-US`)

        const [,,postYear] = newDate.split("/")
        const postDateYear = parseInt(postYear)

        if (postDateYear === postingYear) {
            filteredPosts.push(posts[i])
        }
    }

    filteredPosts.sort(function(x, y){
        return y.timestamp - x.timestamp;
    })
    
    const filteredWall = PostList(filteredPosts)
    return filteredWall
}