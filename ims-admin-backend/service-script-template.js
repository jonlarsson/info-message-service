(function () {
    const messagesToShow = __MESSAGES_TO_SHOW_;

    messagesToShow.forEach(message => console.log(message));

    const containerDiv = document.createElement("div");
    containerDiv.style.position = "fixed";
    containerDiv.style.width = "400px";
    containerDiv.style["margin-left"] = "-200px";
    containerDiv.style.height = "400px";
    containerDiv.style.top = "20px";
    containerDiv.style.left = "50%";
    containerDiv.style.position = "fixed";
    containerDiv.style.border = "2px solid black";
    containerDiv.style.background = "white";


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
})();