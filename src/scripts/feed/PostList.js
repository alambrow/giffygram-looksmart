import { getUsers, sendFavorite, getLikes, favoriteDeleteRequest, deletePost } from "../data/provider.js"

const mainContainer = document.querySelector(".giffygram")

export const PostList = (posts) => {
    const users = getUsers()
  
    let html = "<div id='postingWall'>"
    const listPosts = posts.map(
        post => {

            let newDate = post.timestamp;
            let upDate = new Date(newDate).toLocaleDateString(`en-US`);

            // /*return the value of the first element in userLikes array
            // where the postId of the current user favorites is equal to the id 
            // of the individual post. i.e for the userLikes array, return the first object where the postId
            // is equal to the post.id*/
            // // const findFavorite = userLikes.find(postLike => {
            // //     return (postLike.postId === post.id)
            // // })

            // /*if the postId of the user favorites != post.id, then display a blank star on the 
            // homepage, otherwise the user has already liked it so display a gold star*/
            // // const starImage = (findFavorite === undefined ? './images/favorite-star-blank.svg' : './images/favorite-star-yellow.svg')
            // // const altText = (findFavorite === undefined ? 'blank star' : 'yellow star')
            
            // /*for each post in the posts array(what we are mapping), return HTML to display 
            // it's title, image, and description, as well as post details.*/

            const starImage = favoriteIcon(post)

            return `
            <div class="individPost">
                <div class="postTitle"> ${post.title} </div>            
                <div class="postedByFlex">
                ${users.map(user => {
                    if (user.id === post.userId) {
                        return `<div class="postedBy"> Posted by ${user.name} on ${upDate} </div>`
                    }
                }).join("")}
                <img class="actionIcon" id="favoritePost--${post.id}" src=${starImage} />
                ${deleteIcon(post)}
                </div>
                <img class="postGIF" src=" ${post.imageURL}"> 
                <div class="postDescript"> ${post.description}</div>
            </div>
        `
        })
    html += listPosts.join("")
    html += "</div>"
    return html
}

const favoriteIcon = (post) => {
    const likes = getLikes()
    const userLikes = likes.filter(like => {
        return (parseInt(localStorage.getItem("gg_user")) === like.userId)

    })
    const findFavorite = userLikes.find(postLike => {
        return (postLike.postId === post.id)
    })
    if (findFavorite) {
        return './images/favorite-star-yellow.svg'
    } else {
        return './images/favorite-star-blank.svg'
    }
}

const deleteIcon = (post) => {
    if (post.userId === parseInt(localStorage.getItem("gg_user"))) {
        return `<img class="actionIcon deletePostButton" id="deletePost--${post.id}" src="./images/block.svg"  alt="Delete Icon"/>`
    } else return ``
}


mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("favoritePost--")) {

        const [, postId] = clickEvent.target.id.split("--")
        const postID = parseInt(postId)
        const userId = parseInt(localStorage.getItem("gg_user"))
        const likesArray = getLikes()


        // this catches to see whether post is already liked;
        // if it is, the clickEvent deletes the like
        for (let i = 0; i < likesArray.length; i++) {
            if (likesArray[i].postId === postID && likesArray[i].userId === userId) {
                const likeId = likesArray[i].id

                favoriteDeleteRequest(likeId)
                document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
                return
            }
        }

        // creates temporary favorite object, then sends it to API
        const newFavorite = {
            postId: postID,
            userId: userId
        }
        sendFavorite(newFavorite)
    }
})

// clickEvent to delete a post
mainContainer.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("deletePost--")) {
      const [, postId] = clickEvent.target.id.split("--")  
        deletePost(parseInt(postId))
    }
})