const popUpContainer = document.querySelector(".pop-up-container")
const messageBox = document.querySelector(".message-box")
const sendMsgBtn = document.querySelector(".send-btn")
const resetMsg = document.querySelector(".reset-btn")
const closeMsgBtn = document.querySelector(".xmark")
const writeMsgBtn = document.querySelector(".write-msg-btn")
const overLay = document.querySelector("#overlay")
const messageView = document.querySelector(".view-messages")

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

export const formatDate = inputDate => {
	const dateObject = new Date(inputDate)

	if (isNaN(dateObject.getTime())) {
		return "Invalid Date"
	}

	const day = dateObject.getDate().toString().padStart(2, "0")
	const month = (dateObject.getMonth() + 1).toString().padStart(2, "0") // Month is zero-based
	const year = dateObject.getFullYear()

	const formattedDate = `${day} - ${month} - ${year}`

	return formattedDate
}

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
          <span>${formatDate(msg.createdAt)}</span>
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
