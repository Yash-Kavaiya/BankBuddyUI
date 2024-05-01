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
        data: JSON.stringify({ 'prompt': msg, 'transcripted': 'en' }),
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