import {getPosts, getLikes} from "../data/provider.js"
import { PostList } from "../feed/PostList.js"

export const filterByLikes= () => {
    
    const posts = getPosts()
    const likes = getLikes()
    const filteredLikes = []
    const filteredPosts = []

    const userId = parseInt(localStorage.getItem("gg_user"))
    //Pulling out likeId into filteredLikes (likes.userId = userId)
    for (let i = 0; i < likes.length; i++) {
        if (likes[i].userId === userId) {
            filteredLikes.push(likes[i])
        }
    }
    // this loop checks, for each like, the whole posts array; 
    // if there is an id match, it adds that post to a new array (filteredPosts)
    // for (let i = 0; i < filteredLikes.length; i++) {
    //     for(let n = 0; n < posts.length; n++) {
    //         if (filteredLikes[i].postId === posts[n].id) {
    //             filteredPosts.push(posts[n])
    //         }
    //     }
    // }

    //This for of loop works the same way as above.
    for (const like of filteredLikes) {
        for (const post of posts) {
            if (like.postId === post.id) {
                filteredPosts.push(post)
            }
        }
    }
    filteredPosts.sort(function(x, y){
        return y.timestamp - x.timestamp;
    })
    const filteredWall = PostList(filteredPosts)
    return filteredWall
}