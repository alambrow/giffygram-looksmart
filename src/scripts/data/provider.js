const apiURL = "GiffyGramX.us-east-1.elasticbeanstalk.com/api"
const applicationElement = document.querySelector(".giffygram")

let applicationState = {
    users: [],
    posts: [],
    likes: [],
    messages: []
}

// fetch call to access USER database in API
export const fetchUsers = () => {
    return fetch (`${apiURL}/users`)
    .then(response => response.json())
    .then(users =>{
        applicationState.users = users
    })
}

export const getUsers = () => {
    return [...applicationState.users]
}

// post call to add new user to database
export const sendUserToDatabase = (newUser) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    }
    return fetch(`${apiURL}/users`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const sendMessageToDatabase = (message) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    }
    return fetch(`${apiURL}/messages`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const fetchPosts = () => {
    return fetch(`${apiURL}/posts`)
    .then(response => response.json())
    .then(posts =>{
        applicationState.posts = posts
    })
}

export const getPosts = () => {
    return [...applicationState.posts]
}

//Setter function for new posts
export const sendGif = (userGifSubmission) => {
    const fetchOptions = {
        method:"POST", 
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userGifSubmission) 
    }
    return fetch(`${apiURL}/posts`, fetchOptions)
    .then(res => res.json()) 
    .then(() => {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const deletePost = (id) => {
    return fetch(`${apiURL}/posts/${id}`, { method: "DELETE"})
        .then(
            () => {
                applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
            }
                )}

export const fetchLikes = () => {
    return fetch(`${apiURL}/likes`)
    .then(response => response.json())
    .then(likes =>{
        applicationState.likes = likes
    })
}

export const getLikes = () => {
    
    return [...applicationState.likes]
}

//setter function for favoriting posts
export const sendFavorite = (userPostFavorite) => {
    const fetchOptions = {
        method:"POST", 
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userPostFavorite)
    } 
    return fetch(`${apiURL}/likes`, fetchOptions)
    .then(res => res.json()) 
    .then(() => {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    })
}


//function to delete from favorites upon clicking star
// passes in argument of LikeId
export const favoriteDeleteRequest = (id) => {
    return fetch(`${apiURL}/likes/${id}`, {method:"DELETE"})
    .then(
        () =>{
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        }
    )
}


export const fetchMessages = () => {
    return fetch(`${apiURL}/messages`)
    .then(response => response.json())
    .then(
        (message) => {
            applicationState.messages = message
        }
    )
}

export const getMessages = () => {
    return[...applicationState.messages]
}

export const fetchFollows = () => {
    return fetch(`${apiURL}/follows`)
    .then(response => response.json())
    .then(
        (follow) => {
            applicationState.follows = follow
        }
    )
}

export const getFollows = () => {
    return[...applicationState.follows]
}

// Patch fetch call: allows you to change the properties of an object in your database
// here, this call changes the 'read' property of an object in messages database of a certain id (line 167)
// then this function dispatches new CustomEvent to re-render site with DM box appearing
export const markMessageAsRead = (messageId) => {
    return fetch(`${apiURL}/messages/${messageId}`,
    {
        headers: {"Content-Type": "application/json"},
        method: 'PATCH',
        body: JSON.stringify({
            read: true
        })
    })
    .then(
        () => {
            applicationElement.dispatchEvent(new CustomEvent("stateChanged2"))
        }
    )
}


// fetch call to delete object from database
// CustomEvent2 re-renders the site with the DM box appearing
export const deleteMessage = (id) => {
    return fetch(`${apiURL}/messages/${id}`, { method: "DELETE"})
        .then(
            () => {
                applicationElement.dispatchEvent(new CustomEvent("stateChanged2"))
            }
        )
    }