message = ["Hello anonymous friends! Welcome to our safe space. Feel free to share your thoughts, dreams, or anything on your mind. Remember, your identity is protected here. Let the conversations begin!"],
time = ["Maiden Launch"]
     

//Auto-Reload
//this part tells the messages to reload every 1 sec as long as
// the indicater(no of times ran) is smaller than or equal to
//the arrayLength(no of messages in the array)


indicater = 0;

arrayLength = message.length;
// console.log(message.length)

autoReload = () => {
    setInterval( Reload = () => {
        if(indicater < arrayLength){
            addDiv();
        }
    }, 1000);
}
autoReload();

//this bit updates the message and time

// i made Xe contain the message from the array
// console.log(Xe);
// mesage = data.message;





addDiv= () => {//this function adds a new div to the website with the new message on every call
    // UpdateInfo();
    Xe = message[indicater];
    Xe2 = time[indicater];

    document.querySelector('.heading').insertAdjacentHTML('afterend', //still having little issue with 
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
` ); 

indicater++;
}


//--------------------------------- part two ---------------------------------------------
// messAge = [];
// timeR = [];




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
    
    console.log(formatAMPM(new Date));
// timeUpdate= () => {
//     timeNow = formatAMPM(new Date);
//     // tiMenow = timeNow.getHours() + ":" + timeNow.getMinutes();
//     // console.log(timeNow);
//     timeR.push(timeNow);
//     console.log(timeR);

//     var value = document.getElementById("text").innerHTML;
//     messAge.push(value);
//     console.log(messAge);
// }
// timeUpdate()
// timeUpdate()
//----------------------------------- part two end ----------------------------------------


// UpdateInfo = () => {//the function below changes the message values to be added to the new div
    //     console.log("For Update Info")}

    const sendMsgToBackend = (e) => {
        e.preventDefault();
        newMessage = messageBox.value;
        newTime = formatAMPM(new Date);

        message.push(newMessage);
        time.push(newTime);

        addDiv();
        closeMessage();
        resetMessage()
    }
    //Xe = message[indicater];// i made Xe contain the message from the array
    // console.log(Xe);
    // console.log(data.message)
    
    // Xe2 = time[indicater];
    // indicater++;

sendMsgBtn.addEventListener("click", sendMsgToBackend);

// sendFunction = () => {
//     console.log("Testing send button function")
//     console.log(mesage)
// }

// sendMsgBtn.addEventListener("click", sendFunction());