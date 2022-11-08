const URL = "http://kevin-chapron.fr:8080";
const LOGIN_ENDPOINT = "/login";
const MESSAGES_ENDPOINT = "/messages";

function sendAJAXRequest(method, endpoint, jsonToSend = null, headerName = "", headerValue = "")
{
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open(method, URL + endpoint);

        if (headerName !== "")
        {
            xhr.setRequestHeader(headerName, headerValue);
        }

        xhr.onload = function () {
            if (xhr.status === 200)
            {
                resolve(JSON.parse(xhr.responseText));
            }
            else
            {
                alert("Erreur lors de l'envoie de la requête avec le code : " + xhr.status);
                reject();
            }
        }

        xhr.send(jsonToSend);
    })
}