const WS_URL = "ws://kevin-chapron.fr:8080/ws";
let ws;

function createWebSocket(callback)
{
    ws = new WebSocket(WS_URL);

    ws.onopen = () =>
    {
        console.log("Connected");
        ws.send(JSON.stringify({"auth" : auth_token}));
    }

    ws.onclose = () => console.log("Disconnected");

    ws.onmessage = (event) => callback(JSON.parse(event.data));

    ws.onerror = (event) => console.log("Error : " + event.message);
}

function sendWS_Message(message)
{
    ws.send(JSON.stringify({"message" : message}));
}