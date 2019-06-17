var stompClient = null;

//建立连接
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#notice").html("");
}

//连接
function connect() {
    var socket = new SockJS('/endpoint-websocket'); //连接上端点(基站)
    
    stompClient = Stomp.over(socket);			//用stom进行包装，规范协议
    stompClient.connect({}, function (frame) {	
        setConnected(true);
        console.log('Connected: ' + frame);
        //订阅
        stompClient.subscribe('/topic/game_chat', function (result) {
        	console.info(result)
        	showContent(JSON.parse(result.body));
        });
    });
}

//断开连接
function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

//发送消息
function sendName() {
	
    stompClient.send("/app/v1/chat", {}, JSON.stringify({'content': $("#content").val()}));
}

//展示消息，将消息内容加进去
function showContent(body) {
    $("#notice").append("<tr><td>" + body.content + "</td> <td>"+new Date(body.time).toLocaleString()+"</td></tr>");
}




//入口
$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();//阻止默认事件发生
    });
    //绑定事件
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});

