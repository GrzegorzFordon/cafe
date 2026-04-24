// //map for messages from and map for massages to

// const ClientToServerEvents = new Map();
// ClientToServerEvents.set("SendMessage", "chat:message");
// ClientToServerEvents.set("JoinRoom", "room:join");
// ClientToServerEvents.set("CreateRoom", "room:create");
// ClientToServerEvents.set("LeaveRoom", "room:leave");
// ClientToServerEvents.set("GameStart", "game:start");
// ClientToServerEvents.set("GamePlay", "game:play");

// const ServerToClientEvents = new Map();
// ServerToClientEvents.set("SendMessage", "chat:message");
// ServerToClientEvents.set("LobbyChange", "lobby:change"); //updates to the lobby (like a new room opening)
// ServerToClientEvents.set("RoomChange", "room:change"); //updates to the room/lobby user is in (like another player joining)
// ServerToClientEvents.set("GameState", "game:state"); //used by the server to transmit new game states

// export { ClientToServerEvents, ServerToClientEvents };
