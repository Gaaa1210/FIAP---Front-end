// inout da mensagem digitada pelo usuario
let inputMessage = document.getElementById("message");

// DIV  ONDE IRERI EXIBIR AS MENSAGENS
let chatLog = document.getElementById("chat-log");

// array que armazena o historico local de mensagens trocadas
let messagesGemini = [];

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let messageText = inputMessage.value; //texto digitado pelo usuario

    let newMessageGemini = {
        "role": "user",
        "parts": [{ "text": messageText}],
    };

    messagesGemini.push(newMessageGemini);

    inputMessage.value = "";

    let messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add("message--sent");
    messageElement.innerHTML = `
        <div class="message__text">${messageText}</div>
    `;

    chatLog.appendChild(messageElement);

    // REQUISIÇÃO PARA A API LOCAL
    fetch("http://localhost:3000/sendMessage/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messagesGemini
        })

    })
        .then(res => res.json())
        .then(data => {
            console.log(data.chat_completion);

            let messageElement = document.createElement("div");
            messageElement.classList.add("message");
            messageElement.classList.add("message--assistant");
            messageElement.innerHTML = `
                <div class="message__text">${data.chat_completion}</div>
            `;

            chatLog.appendChild(messageElement);
        })
});
