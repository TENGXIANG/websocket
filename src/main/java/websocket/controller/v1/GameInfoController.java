package websocket.controller.v1;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import websocket.model.InMessage;
import websocket.model.OutMessage;

@Controller
public class GameInfoController {

    //根据路径，路由到A，方法处理完成后，发送到B；发布订阅模式
    @MessageMapping("/v1/chat")//A根据路由匹配，发送到这里来
    @SendTo("/topic/game_chat")//B发送到哪里
    public OutMessage gameInfo(InMessage message){
        return new OutMessage(message.getContent());
    }


}
