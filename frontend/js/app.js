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
const time = [];

const renderMessages = () => {
  let msgOut = "";

  messages.reverse().forEach((msg, index) => {
  //   console.log(time);
  //   console.log(msg);
  //   console.log(messages);

    msgOut += `<div class="preview">
    <div class="preview-image">
      <img src="./asset/images/message-box-img.jpeg" alt="" />
    </div>
    <div class="preview-add">
      <div class="preview-info">
        <h3>Anonymous</h3>
        <span>${time[index]}</span>
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

  let timevar = (formatAMPM(new Date))
    time.unshift(timevar);
    indtime = time[messages.length - 1];
  // console.log(time.indexOf(timevar))

  renderMessages();
  resetMessage();
  closeMessage();
};
sendMsgBtn.addEventListener("click", sendMsgToBackend);

//to get the time of posting
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
  }
  
  // console.log(formatAMPM(new Date));