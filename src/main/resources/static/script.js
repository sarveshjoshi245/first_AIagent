// Get HTML elements

const input = document.getElementById("message-input");

const chatBox = document.getElementById("chat-box");


// Function to display a message

function addMessage(message, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    messageDiv.classList.add(sender);

    messageDiv.innerText = message;

    chatBox.appendChild(messageDiv);

    // Automatically scroll to bottom

    chatBox.scrollTop = chatBox.scrollHeight;
}


// Main chatbot function

async function sendMessage() {

    // Get message from input

    const message = input.value.trim();


    // Don't send empty messages

    if (message === "") {

        return;

    }


    // Display user's message

    addMessage(message, "user");


    // Clear input box

    input.value = "";


    try {

        // Send message to Spring Boot

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                message: message

            })

        });


        // Convert response into JSON

        const data = await response.text();


        // Display AI response
        console.log(data);
        addMessage(data, "bot");


    } catch (error) {

        console.error(error);

        addMessage(
            "Sorry, I could not connect to the server.",
            "bot"
        );

    }

}


// Press Enter to send

input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});