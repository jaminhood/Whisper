const apiUrl = "https://whisper-backend-kdcz.onrender.com/api/v1/messages"

let message = [
	{
		message:
			"Hello anonymous friends! Welcome to our safe space. Feel free to share your thoughts, dreams, or anything on your mind. Remember, your identity is protected here. Let the conversations begin!",
	},
]
let time = ["Maiden Launch"]
//Auto-Reload
//this part tells the messages to reload every 1 sec as long as
// the indicater(no of times ran) is smaller than or equal to
//the arrayLength(no of messages in the array)

let indicater = message.length

let arrayLength = message.length

const autoReload = () => {
	setInterval(() => {
		retrieveMsgs(apiUrl)
	}, 1000)
}
autoReload()

//this bit updates the message and time

// i made Xe contain the message from the array
// console.log(Xe);
// message = data.message;

let addDiv = msg => {
	let output = ``

	console.log(msg)
	Xe = msg
	Xe2 = time[indicater]

	document.querySelector(".heading").insertAdjacentHTML(
		"afterend", //still having little issue with
		//loading them from the top.
		//afterend-below/after, afterbegin-firstchild, beforeend-lastchild, beforebegin-before/above
		`<div class="preview">
        <div class="preview-image">
          <img src="./asset/images/message-box-img.jpeg" alt="" onclick="clicked()" />
        </div>
<div class="preview-add">
<div class="preview-info">
  <h3>Anonymous</h3>
  <span>${Xe2}</span>
</div>
<div class="para">
  <p>
  ${Xe}
  </p>
</div>
</div>
</div>
`,
	)

	// indicater++;
}

//--------------------------------- part two ---------------------------------------------
// messAge = [];
// timeR = [];

function formatAMPM(date) {
	var hours = date.getHours()
	var minutes = date.getMinutes()
	var ampm = hours >= 12 ? "pm" : "am"
	hours = hours % 12
	hours = hours ? hours : 12 // the hour '0' should be '12'
	minutes = minutes < 10 ? "0" + minutes : minutes
	var strTime = hours + ":" + minutes + " " + ampm
	return strTime
}

console.log(formatAMPM(new Date()))

//----------------------------------- part two end ----------------------------------------

// UpdateInfo = () => {//the function below changes the message values to be added to the new div
//     console.log("For Update Info")}

const sendMsgToBackend = e => {
	e.preventDefault()
	newMessage = messageBox.value
	newTime = formatAMPM(new Date())

	// message.push(newMessage);
	time.push(newTime)
	fetch(apiUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ message: newMessage }),
	})
		.then(res => res.json())
		.then(() => {
			retrieveMsgs(apiUrl)
			if (message.length > 0) {
				addDiv()
			}

			closeMessage()
			resetMessage()
		})
		.catch(error => {
			// Handle errors
			console.log("Error:", error)
		})
}

sendMsgBtn.addEventListener("click", sendMsgToBackend)

async function retrieveMsgs(apiUrl) {
	await fetch(apiUrl)
		.then(res => res.json())
		.then(data => {
			appendToBody(data.messages)
		})
}

function appendToBody(arr) {
	arr.forEach(element => {
		addDiv(element)
	})
}

//------------------------------------------To Actually connect with the backend-----------------------------
