// import { Server as SocketIOServer } from "socket.io";
// import Lobby from "./lobby/lobby.js";
// import {
//   ClientToServerEvents,
//   ServerToClientEvents,
// } from "../../shared/protocol.js";

// const createWebSocketServer = (httpServer) => {
//   const server = new SocketIOServer(httpServer, {
//     cors: {
//       origin: ["http://localhost:5173", "http://192.168.2.115:5173"],
//       methods: ["GET", "POST"],
//     },
//   });

//   const roomsManager = new Lobby();

//   // HANDLER FUNCTIONS
//   const onJoinRoom = async (socket, data) => {
//     //change to see if the room exists, send error back otherwise
//     await socket.join(data.roomID);
//     socket.emit(ServerToClientEvents.get("JoinRoom"), {
//       message: `successfully joined room ${data.roomID}.}`,
//       roomID: data.roomID,
//     });
//   };

//   const onSendMessage = (socket, data) => {
//     // console.log(socket.rooms);
//     for (const room in socket.rooms) {
//       // console.log(room);
//       socket.to(room).emit(ServerToClientEvents.get("SendMessage"), data);
//     }
//     socket.rooms.forEach((element) => {
//       // console.log(element);
//       if (element === socket.id) return;
//       server.to(element).emit(ServerToClientEvents.get("SendMessage"), data);
//     });
//     // server.emit(ServerToClientEvents.get("SendMessage"), data);
//   };
//   const broadcastLobbyChange = (val) => {
//     // const roomIDs = roomsManager.getAllRooms();
//     const roomIDs = "foo";
//     server.emit(ServerToClientEvents.get("LobbyChange"), roomIDs);
//   };
//   const onCreateRoom = (socket, data, callback) => {
//     console.log(`received request to create room from ${socket.id}`);
//     try {
//       const res = roomsManager.createRoom();
//       socket.join(res.roomID);
//       socket.leave("general"); //change to leave other rooms too (other than own id)
//       broadcastLobbyChange();
//       callback({ status: "ok", roomID: res.roomID });
//     } catch (error) {
//       console.log(error);
//       callback({ status: "error" });
//     }
//   };

//   // WIRE UP
//   server.on("connection", async (socket) => {
//     console.log(`User connected (${socket.id})`);

//     //Add player to general room
//     socket.join("general");

//     socket.on(ClientToServerEvents.get("JoinRoom"), (data) =>
//       onJoinRoom(socket, data),
//     );

//     socket.on(ClientToServerEvents.get("SendMessage"), (data) =>
//       onSendMessage(socket, data),
//     );

//     socket.on(ClientToServerEvents.get("CreateRoom"), (data, callback) =>
//       onCreateRoom(socket, data, callback),
//     );

//     socket.on("disconnect", () =>
//       console.log(`User disconnected (${socket.id})`),
//     );
//   });
// };

// //OWN SERVERSIDE EMITTERS

// const broadcastRoomUpdate = (val) => {
//   // const room =
//   server.emit(ServerToClientEvents.get("RoomChange"), val);
// };

// export default createWebSocketServer;
