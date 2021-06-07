import { sendGif } from "../data/provider.js"

export const PostEntry = () => {
    let html = `
    <div class="newPost__entry">
    <div class="field">
        <label class="label" for="gifTitle"></label>
        <input type="text" name="gifTitle" class="input inputTitle" placeholder="Title"/>
    </div>
    <div class="field">
        <label class="label" for="gifURL"></label>
        <input type="URL" name="gifURL" class="input inputGifURL" placeholder="URL of Gif"/>
    </div>
    <div class="field">
        <label class="label" for="gifStory"></label>
        <input type="text" name="gifStory" class="input inputStory" placeholder="Story behind your Gif..."/>
    </div>  
    
    <button class="button" id="submitGif">Submit</button>
    <button class="button" id="cancelGif">Cancel</button>
    </div>
    `
return html
}

// click event to send GIF to API
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitGif") {

        const usergifTitle = document.querySelector("input[name='gifTitle']").value
        const usergifURL= document.querySelector("input[name='gifURL']").value
        const usergifStory = document.querySelector("input[name='gifStory']").value
        const userId = parseInt(localStorage.getItem("gg_user"))
        // checkpoints to see whether input fields are blank
        if (usergifTitle === "") {
            document.querySelector("input[name='gifTitle']").style.background = "#fc7878"
            alert("Please enter title.")
            return
        } else if (usergifURL === "") {
            document.querySelector("input[name='gifURL']").style.background = "#fc7878"
            alert("Please enter URL.")
            return
        } else if (usergifStory === "") {
            document.querySelector("input[name='gifStory']").style.background = "#fc7878"
            alert("Please enter story to go along with your GIF.")
            return
        }
        // sends data to API
        const dataToSendToAPI = {
            title: usergifTitle,
            imageURL: usergifURL,
            description: usergifStory,
            userId: userId,
            timestamp: Date.now()
        }
        sendGif(dataToSendToAPI)
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "cancelGif") {
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
})