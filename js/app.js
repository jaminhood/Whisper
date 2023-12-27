let popUpContainer = document.querySelector(".pop-up-container")
let messageBox = document.querySelector(".message-box")
let sendMsgBtn = document.querySelector(".send-btn")
let resetMsg = document.querySelector(".reset-btn")
let closeMsgBtn = document.querySelector(".xmark")
let writeMsgBtn = document.querySelector(".write-msg-btn")
let overLay = document.querySelector("#overlay")
let messageView = document.querySelector(".view-messages")

const messagesURI = "https://whisper-backend-kdcz.onrender.com/api/v1/messages"

function toggleBtnForPopUp() {
	popUpContainer.style.display = "block"
	overLay.style.display = "block"
	messageBox.focus()
}
function closeMessage() {
	popUpContainer.style.display = "none"
	overLay.style.display = "none"
	messageBox.value = ""
}
function resetMessage() {
	messageBox.value = ""
}

writeMsgBtn.addEventListener("click", toggleBtnForPopUp)
resetMsg.addEventListener("click", resetMessage)
closeMsgBtn.addEventListener("click", closeMessage)

const renderMessages = messages => {
	let msgOut = ""
	messages.forEach(msg => {
		msgOut += `
    <div class="preview">
      <div class="preview-image">
        <img src="./asset/images/message-box-img.jpeg" alt="" />
      </div>
      <div class="preview-add">
        <div class="preview-info">
          <h3>Anonymous</h3>
          <span>${new Date(msg.createdAt).toLocaleString()}</span>
        </div>
        <div class="para">
          <p>
            ${msg.message}
          </p>
        </div>
      </div>
    </div>
    `
	})
	messageView.innerHTML = msgOut
}

const sendMsgToBackend = async e => {
	e.preventDefault()
	await sendMessage({ message: messageBox.value })
}

sendMsgBtn.addEventListener("click", sendMsgToBackend)

const sendCred = data => ({
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(data),
})

const sendMessage = async data =>
	await fetch(messagesURI, sendCred(data))
		.then(res => res.json())
		.then(() => closeMessage())
		.catch(error => console.log("Error:", error))

const retrieveMsgs = async apiUrl => {
	try {
		const result = await fetch(apiUrl)
		const data = await result.json()
		return data
	} catch (error) {
		console.error(error.message)
	}
}

const init = async () => {
	setInterval(async () => {
		await retrieveMsgs(messagesURI).then(({ messages }) => renderMessages(messages))
	}, 1000)
}

window.addEventListener(`DOMContentLoaded`, init)
