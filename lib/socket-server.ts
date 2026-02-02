import { Server, Socket } from 'socket.io';
import http from 'http';

let io: Server;

export function initSocketServer(server: http.Server) {
  io = new Server(server, {
    cors: {
      origin: process.env.SOCKET_IO_CORS_ORIGIN,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_order', (orderId: string) => {
      socket.join(`order_${orderId}`);
    });

    socket.on('update_location', (data) => {
      socket.to(`order_${data.orderId}`).emit('location_update', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
}

export function emitOrderUpdate(orderId: string, data: any) {
  if (io) {
    io.to(`order_${orderId}`).emit('order_update', data);
  }
}
