import "./style.css";

const messagesToShow = "__MESSAGES_TO_SHOW_";

messagesToShow.forEach(message => console.log(message));

const containerDiv = document.createElement("div");
containerDiv.classList.add("ims-modal");

const bodyDiv = document.createElement("div");
containerDiv.appendChild(bodyDiv);
const ul = document.createElement("ul");
bodyDiv.appendChild(ul);
messagesToShow.forEach(message => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(message.content));
    ul.appendChild(li);
});
document.body.appendChild(containerDiv);

function closeListener(event) {
    document.body.removeChild(containerDiv);
    window.removeEventListener("click", closeListener);
}
window.addEventListener("click", closeListener);