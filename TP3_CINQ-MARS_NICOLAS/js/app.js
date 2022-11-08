const PERMANENT_CODE = "CINN03100201";
let auth_token = "";

let usernameDiv;
let messageInput;

let chat;
let messageContainerCopy;

window.onload = initialization;

async function initialization()
{
    usernameDiv = document.getElementById("username");
    messageInput = document.getElementById("message-input");

    document.getElementById("send-message-button").addEventListener("click", sendMessage)
    document.getElementById("message-input").addEventListener("keypress", onMessageInputKeypress)

    chat = document.getElementById("chat");
    messageContainerCopy = document.getElementById("message-container-copy").cloneNode(true);
    messageContainerCopy.id = "";

    document.getElementById("message-container-copy").remove();

    await loginRequest();

    if (auth_token !== "")
    {
        await getInitialMessages();
        createWebSocket(treatMessage)
    }
}

function onMessageInputKeypress(keypress) {
    if (keypress.code === "Enter")
    {
        sendMessage();
    }
}

async function loginRequest()
{
    let data = await sendAJAXRequest("POST", LOGIN_ENDPOINT, JSON.stringify({"Code" : PERMANENT_CODE}));
    treatLogin(data);
}

function treatLogin(JSONData)
{
    usernameDiv.innerText = JSONData['Name'];
    auth_token = JSONData['Token'];
}

async function getInitialMessages()
{
    let data = await sendAJAXRequest("GET", MESSAGES_ENDPOINT, "", "Authorization", "Basic " + auth_token);
    treatInitialMessages(data);
}

function treatInitialMessages(JSONData)
{
    JSONData.forEach(message => {
        treatMessage(message)
    });
}

function treatMessage(message)
{
    let messageContainer = messageContainerCopy.cloneNode(true);
    messageContainer.children[0].innerText = "[" + message['Date'].replace("T", " ") + "]";
    messageContainer.children[1].innerText = "(" + message['From'] + ")";
    messageContainer.children[2].innerText = message['Text'];
    chat.appendChild(messageContainer);
    chat.scrollTop = chat.scrollHeight;
}

function sendMessage()
{
    if (messageInput.value !== "")
    {
        sendWS_Message(messageInput.value);
        messageInput.value = "";
    }
}
