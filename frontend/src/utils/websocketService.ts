import { io, Socket } from 'socket.io-client';
import { user } from './user';
import { Notification } from '../interfaces/Notification';

class WebSocketService {
  private socket: Socket | null = null;

  connect(userId: string): void {
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      this.socket?.emit('join', JSON.stringify({ userId: user().id }));
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }

  onNotification(callback: (notification: Notification) => void): void {
    if (!this.socket) return;

    this.socket.on('notification', (notification) => {
      callback(notification);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
