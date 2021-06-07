import { getMessages, getUsers, deleteMessage, markMessageAsRead } from "../data/provider.js"

// empty HTML string to target through document.querySelector()
export const DMBox = () => {
    return `<div class="DMBox"></div>`
}

// HTML generating function for DM Box
export const receivedMessages = () => {
    const messagesArray = getMessages()
    const userId = parseInt(localStorage.getItem("gg_user"))
    const inbox = []
    const readInbox = []

    for (let i = 0; i < messagesArray.length; i++) {
        if (messagesArray[i].recipientId === userId) {
            if (messagesArray[i].read === false) {
                inbox.push(messagesArray[i])
            } else {
                    readInbox.push(messagesArray[i])
                }
        }
    }
    
    return `<div class="DMDisplay"> 
    <div class="DMTopflex">
    <h1>Your DMs</h1>
    <button id="closeMessageBox">Close</button>
    </div>
    <div class="inbox"> inbox
    ${inbox.map(inboxList).join("\n")}
    </div>
    <div class="readInbox">read messages
    ${readInbox.map(readList).join("\n")}
    </div>
    `
}
// html-generating function for unread messages map()
const inboxList = (message) => {
    const usersArray = getUsers()
    let senderName = "..."

    for (let i = 0; i < usersArray.length; i++) {
        if (usersArray[i].id === message.userId) {
            senderName = usersArray[i].name
        }
    }

    return `
    <div class="unreadMessage">
    <div>
    ${senderName}: 
    </div>
    <div class="newMessageBody">
    ${message.text}
    </div>
    <button id="markAsRead--${message.id}">read</button>
    <button id="deleteMessage--${message.id}">delete</button>
    </div>
    `
}
// html-generating function for read messages map()
const readList = (message) => {
    const usersArray = getUsers()

    let senderName = "..."

    for (let i = 0; i < usersArray.length; i++) {
        if (usersArray[i].id === message.userId) {
            senderName = usersArray[i].name
        }
    }

    return `
    <div class="readMessage">
    <div>${senderName}: </div>
    <div class="readMessageBody">${message.text}</div>
    <button id="deleteMessage--${message.id}">delete</button>
    </div>
    `
}
// resets to empty HTML string (closes the box)
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "closeMessageBox") {
        document.querySelector(".DMBox").innerHTML = DMBox()
    }
})
// invokes the PATCH fetch call through targeting the messageId contained in the html
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("markAsRead--")) {
        const [, messageId] = clickEvent.target.id.split("--")
        markMessageAsRead(parseInt(messageId))
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteMessage--")) {
        const [, messageId] = clickEvent.target.id.split("--")
        deleteMessage(parseInt(messageId))
    }
})