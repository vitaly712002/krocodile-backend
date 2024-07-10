import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

type PaintCoords = {
    x: number;
    y: number;
    dx: number;
    dy: number;
    color: string
}

@WebSocketGateway({ cors: true })
export class AppGateway {
    // Следить за запросом paint
    @SubscribeMessage('paintSend')
    // Вытащить информацию data и отправить всем кроме меня
    painting(@MessageBody() data: PaintCoords, @ConnectedSocket() socket: Socket) {
        socket.broadcast.emit('paintReceive', data)
    }

    // Следить за запросом clear
    @SubscribeMessage('clear')

    clear(@ConnectedSocket() socket: Socket) {
        socket.broadcast.emit('clear_canvas');
    }

    // Следить за запросом clear
    @SubscribeMessage('colorSend')

    color(@MessageBody() color: string, @ConnectedSocket() socket: Socket) {
        socket.broadcast.emit('change_color', color);
    }

    handleConnection(socket: Socket) {
        console.log('connected')
    }
}
