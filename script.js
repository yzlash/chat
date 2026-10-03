const mainTitle = document.querySelector("#mainTitle");
const subtitle = document.querySelector("#subtitle");
const themeButton = document.querySelector("#themeButton");
const card = document.querySelector(".card");
const changeName =
document.querySelector("#changeName");
const imageInput =
document.querySelector("#imageInput");
const profileImage =
document.querySelector("#profileImage");
const header = document.query.Selector(".header");

imageInput.addEventListener("change", function() {
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", function() {
            profileImage.src = reader.result;
            localStorage.setItem("profileImage", reader.result);
        });

        reader.readAsDataURL(file);
    }
});

themeButton.addEventListener("click", function() {
    document.body.style.background = "#111111";
    card.style.backgroundColor = "#1c1c1c";
    changeName.style.background = "#1c1c1c";
    imageInput.style.background = "#1c1c1c";
    document.body.classList.toggle("light");
     header.style.background = " #4700ff, #1c1c1c";
    if (document.body.classList.contains("light")) {
        document.body.style.background = "#ffffff";
        card.style.backgroundColor = "#999999";
        changeName.style.background = "#999999";
        imageInput.style.background = "#999999";
        themeButton.textContent = "⭐ Light Mode";
        header.style.background = " #4700ff, #999999";
    } else {
        themeButton.textContent = "🌙 Dark Mode";
    }
});

const profileName =
document.querySelector("#profileName");


const savedName =
localStorage.getItem("profileName");

if (savedName) {
    profileName.textContent = savedName;
    changeName.value = savedName;
}

const savedPicture =
localStorage.getItem("profileImage");
if (savedPicture) {
    profileImage.src = savedPicture;
}

const changeProfileButton = 
document.querySelector("#changeProfileButton");
changeProfileButton.addEventListener("click", function() {
    profileName.textContent = changeName.value;

    localStorage.setItem("profileName", changeName.value);
});

const chatMessages = document.querySelector("#chatMessages");
const textBox = document.querySelector("#textBox");
const sendButton = document.querySelector("#sendButton");

function sendMessage() {
 if (textBox.value.trim() === "") {
return
    }
    socket.send(profileName.textContent + ": " + textBox.value);
    textBox.value = "";
};

sendButton.addEventListener("click", function() {
   sendMessage();
});

textBox.addEventListener("keydown", function(event) {
    if(event.key === "Enter") {
        sendMessage();
    }
});

const socket = new WebSocket("wss://chat-j1z3.onrender.com");
socket.addEventListener("open", function() {
    console.log("connected");
});

socket.addEventListener("message", async function(event) {
    const message = await event.data.text();

    const newMessage = document.createElement("li");

    newMessage.textContent = message;

    chatMessages.appendChild(newMessage);
});
