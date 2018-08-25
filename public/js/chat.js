
setPage();

function setPage() {
    var socket = io.connect('http://localhost:3000');

    // Query DOM
    var username = generateUsername();
    var message = document.getElementById('message');
    var btn = document.getElementById('send');
    var output = document.getElementById('output');
    var feedback = document.getElementById('feedback');

    // Create the events
    btn.addEventListener('click', sendMessage);

    function sendMessage(){
        var today = new Date();
        var hour = today.getHours();
        var minutes = today.getMinutes();
        var min = "";
        if(minutes < 10){
            min = "0" + minutes.toString();
        } else {
            min = minutes.toString();
        }
        var end = ' AM';
        if(hour > 12){
            hour = hour - 12;
            end = ' PM';
        }
        var full = hour.toString() + ":" + min + end;
        if(message.value != '' && message.value != null){
            socket.emit('chat', {
                message: message.value,
                username: username,
                time: full
            });
            socket.emit('send', {
                message: message.value,
                username: username
            });
            message.value = '';
        }
    }

    message.addEventListener('keypress', function(e){
        if(e.keyCode == 13){
            sendMessage();
            
        } else {
            socket.emit('typing', username);
        }
    });

    // Listen for the events

    socket.on('chat', function(data){
        
        output.innerHTML += `<p class="tooltip"><strong class='username-style darkblue-text'>` + data.username +`: </strong>` + data.message + `<span class="tooltiptext">`+ data.time + `</span></p>`;
        feedback.innerHTML = '';

    });

    socket.on('send', function(data){
        
        showNotification(data.username, data.message);
    });

    socket.on('typing', function(data){
        feedback.innerHTML = '<p><em>' + data + ' is typing... </em></p>'
        setTimeout(function(){
            feedback.innerHTML = '';
        }, 3000);
    });

}

function generateUsername(){
    var name = "User";
    var num = Math.floor(Math.random() * 1500);
    name += num.toString();
    return name;
}



$('#split-bar').mousedown(function (e) {
    e.preventDefault();
    $(document).mousemove(function (e) {
        e.preventDefault();
        var x = $(window).width() - e.pageX;
        $('#chat').css("width", x);
    })
});

$(document).mouseup(function (e) {
    $(document).unbind('mousemove');
});

$('#chat-window').height($(window).height() - ($('#message').outerHeight() + $('#send').outerHeight()) - 83);
$('#left-div').width($(window).width() - $('#chat-container').width());  
$('#split-bar').height($(window).height() - 82);


$(window).resize(function() {
    $('#chat-window').height($(window).height() - ($('#message').outerHeight() + $('#send').outerHeight()) - 83);
    $('#split-bar').height($(window).height() - 82);
    $('#left-div').width($(window).width() - $('#chat-container').width());  
})


// var close = document.getElementById('close-btn');
var chatwindow = document.getElementById('chat-container');
chatwindow.style.display = "none";
// close.addEventListener("click", function(){
//     if(chatwindow.style.display == 'none'){
//         chatwindow.style.display = 'block';
//     } else {
//         chatwindow.style.display = 'none';
//     }
// });

function toggleChat(){
    if(chatwindow.style.display == 'none'){
        chatwindow.style.display = 'block';
    } else {
        chatwindow.style.display = 'none';
    }
}

function showNotification(username, message){
    Push.create(username, {
      body: message,
      icon: "images/logo-icon.png",
      timeout: 3000,
      silent: true,
      onClick: function(){
        chatwindow.style.display = 'block';
      }
    });
  }

