let popUpContainer = document.querySelector(".pop-up-container");
let messageBox = document.querySelector(".message-box");
let sendMsgBtn = document.querySelector(".send-btn");
let resetMsg = document.querySelector(".reset-btn");
let closeMsgBtn = document.querySelector(".xmark");
let writeMsgBtn = document.querySelector(".write-msg-btn");
let overLay = document.querySelector("#overlay");
let messageView = document.querySelector(".view-messages");

function toggleBtnForPopUp() {
  popUpContainer.style.display = "block";
  overLay.style.display = "block";
  messageBox.focus();
}
function closeMessage() {
  popUpContainer.style.display = "none";
  overLay.style.display = "none";
  messageBox.value = "";
}
function resetMessage() {
  messageBox.value = "";
}

writeMsgBtn.addEventListener("click", toggleBtnForPopUp);
resetMsg.addEventListener("click", resetMessage);
closeMsgBtn.addEventListener("click", closeMessage);

// For Message Handling
let messages = [];
let output = "";

const renderMessages = () => {
  let msgOut = "";

  messages.reverse().forEach((msg) => {
    msgOut += `<div class="preview">
    <div class="preview-image">
      <img src="./asset/images/message-box-img.jpeg" alt="" />
    </div>
    <div class="preview-add">
      <div class="preview-info">
        <h3>Anonymous</h3>
        <span>9:12am</span>
      </div>
      <div class="para">
        <p>
          ${msg.message}
        </p>
      </div>
    </div>
  </div>`;
    messageView.innerHTML = msgOut;
  });
};
const sendMsgToBackend = (e) => {
  e.preventDefault();
  let msgWriteUp = messageBox.value;
  const newMsg = {
    message: msgWriteUp,
  };
  messages.push(newMsg);
  renderMessages();
  resetMessage();
  closeMessage();
};
sendMsgBtn.addEventListener("click", sendMsgToBackend);
