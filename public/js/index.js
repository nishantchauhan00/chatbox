 
var socket = io();

function scrollToBottom(){

    
    var messages=jQuery("#messages");
    var newMessage = messages.children("li:last-child");
   
    var clientHeight=messages.prop("clientHeight");
    var scrollTop=messages.prop("scrollTop");
    var scrollHeight=messages.prop("scrollHeight");
    var newMessageHeight =  newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

   
    if(scrollTop+clientHeight+newMessageHeight+lastMessageHeight>=scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}



socket.on("connect",function(){

        var params = jQuery.deparam(window.location.search);

        socket.emit("join",params,function(err){
            if(err){
                alert(err);
                window.location.href="/";
            }else{
//                console.log("No error", params)
                
                document.title = "ChatBox - " + params.room;
            }
        })
 
    console.log("Connected to server");
});



socket.on("newMessage",function(message){
    // console.log("Got it",message)
    // var li = jQuery("<li></li>");
    // li.text(`${message.from}:${message.text}`);
    // jQuery("#messages").append(li);


    var formatTime= moment(message.createdAt).format("h:mm a");
    var template = jQuery("#message_template").html();
    
    var html = Mustache.render(template,{
      text:message.text,
      from:message.from,
      createdAt:formatTime
    })
    jQuery("#messages").append(html);
    scrollToBottom();
})

socket.on("newLocationMessage",function(message){

    // var li = jQuery("<li></li>");
    // var a = jQuery(`<a target="_blank">My Current location</a>`);

    // li.text(`${message.from}`);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery("#messages").append(li);

    var formatTime= moment(message.createdAt).format("h:mm a");
    var template = jQuery("#location_message_template").html();
    
    var html = Mustache.render(template,{
      url:message.url,
      from:message.from,
      createdAt:formatTime
    })
    jQuery("#messages").append(html);
    scrollToBottom();
});

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}
socket.on("disconnect",function(){
    console.log("Disconnected from server");
})

socket.on("updateUserList",function(users){
    console.log("Users list",users);
    var ol =jQuery('<ol></ol>')

    users.forEach(function(user){
        ol.append(jQuery("<li></li>").text(user));
    })
    jQuery("#users").html(ol);

})



var message_text=jQuery('[name=message]');
socket.on("disconnect",function(){
    console.log("Disconnected from server");
})

jQuery("#message_form").on("submit",function(e){
    e.preventDefault();

    socket.emit("createMessageEvent",{
        text:message_text.val()
    },function(){
        message_text.val("");

    })
})


var locationbutton = jQuery("#send_location");

locationbutton.on("click",function(){
        navigator.permissions.query({name:'geolocation'}).then(function(result) {
          if (result.state === 'granted') {
                    locationbutton.attr("disabled","disabled").text("Sending location...") ;       
                navigator.geolocation.getCurrentPosition(function(position){
                    locationbutton.removeAttr("disabled").text("Send location");
                    socket.emit("create_location_message",{
                        latitude:position.coords.latitude,
                        longitude:position.coords.longitude
                })
            }),function(err){
                locationbutton.removeAttr("disabled").text("Send location");
                    alert("Unable to fetch location");
                    showError(err);
            };
          } else if (result.state === 'prompt') {
            showButtonToEnableMap();
          }else{
            return alert("Geolocation not suppourted by your browser")
          }
        });
}); 