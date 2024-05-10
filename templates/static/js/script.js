// when we click the send icon this fuction run
function SendMessage() {
    const inputField = document.getElementById("input");
    console.log("Enter is click", inputField.value);
    let msg = [inputField.value];
    loading(true)
    const lang = localStorage.getItem('lang')
    $.ajax({
        type: "POST",
        crossDomain: true,
        url: "/ftech_message"
        data: JSON.stringify({'prompt': msg, 'transcripted': 'en' }),
        processData: false,
        contentType: false,
        success: function (response) {
            loading(false)
            addChat(msg, response.res_msg[0])
        }, error: function () {
            console.log('error')
        }
    });

}
// when we click on enter this function run
document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", function (e) {
        console.log(e, "e enter")
        let msg = [inputField.value];
        let lang = localStorage.getItem("lang");
        if (e.keyCode === 13 && !e.shiftKey) {
            console.log("enter is msg", inputField.value);
            loading(true)
            $.ajax({
                type: "POST",
                crossDomain: true,
                url: "/ftech_message",
                data: JSON.stringify({ 'prompt': msg, 'transcripted': lang }),
                processData: false,
                contentType: false,
                success: function (response) {
                    loading(false)
                    addChat(msg, response.res_msg[0])
                },
                error: function () { console.log('error'); }
            }); e.preventDefault();
        }
    });
});

function compare(triggerArray, replyArray, string) {
    let item;
    for (let x = 0; x < triggerArray.length; x++) {
        for (let y = 0; y < replyArray.length; y++) {
            if (triggerArray[x][y] == string) {
                items = replyArray[x];
                item = items[Math.floor(Math.random() * items.length)];
            }
        }
    }
    if (item) return item;
    else return containMessageCheck(string);
}

function ftech_welcome_message(lang){
    console.log(lang)
    loading(true)
    $ajax({

        type: "POST",
        crossDomain:true,
        url: "/fetch_message",
        data: JSON.stringify({'prompt':[lang],'transcripted':localStorage.getItem("lang")}),
        processData:false,
        contentType:false,
        success:function(response){
            console.log(response,"response")
            addChat(lang,response.res_msg)
        },error:function(){
            console.log('error');
        }
    })
}

function addChat(input,product){
const inputField =document.getElementById("input");
console.log("add and product",input,product)
const mainDiv =document.getElementById("message-section")
let userDiv =document.createElement("div");
userDiv.id ="user"
userDiv.classList.add("message");
userDiv.innerHTML=`
<div class="d-flex"> 
<div id="user-res-msg"><span id="user-response">${input}</span></div>
<div class="user-svg"> <?xml version="1.0" encoding ="utf-8" ?>
<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="https://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule ="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22c6.47715 22 2 17.52228 2 12C2 6.477715 6.4715 2 12"
</svg></div></div>`;

mainDiv.appendChild(userDiv);
inputField.value=""
let botDiv =document.createElement("div");

botDiv.id ="bot";
botDiv.classList.add("message");
botDiv.innerHTML=`
<div class="d-flex"> 
<div class="bot-svg"><?xml version="1.0" encoding ="utf-8" ?><svg fill="#000000" width="30px" viewBox="0 0 32 32" id="icon" >
<div id="bot-res-msg"> <span id="bot-response">${product}</span></div></div>
`;
mainDiv.appendChild(botDiv);
var scroll = document.getElementById("message-section");
scroll.scrollTop =scroll.scrollHeight;
inputField.value = ""
}