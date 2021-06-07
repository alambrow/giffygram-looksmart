import { NavBar } from "./nav/NavBar.js"
import { PostList } from "../scripts/feed/PostList.js"
import { footer } from "../scripts/nav/Footer.js"
import { postButton } from "./feed/Post.js"
import { DMBox } from "./friends/DirectMessage.js"
import { messageBox } from "./message/MessageForm.js"
import { getPosts } from "./data/provider.js"



// main HTML rendering function, displays most components
export const GiffyGram = () => {
    const posts = getPosts()
  
    posts.sort(function(x, y){
        return y.timestamp - x.timestamp;
    })


    return `
    ${NavBar()}
    <section class="mainflex">
    <div class="leftAside">${postButton()}</div>
    <div class="postingWall">
    ${PostList(posts)}
    </div>
    <div class="asideWall">
    ${messageBox()}
    ${DMBox()}
    </div>
    </section>
    ${footer()}
    `
}