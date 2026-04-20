//map for messages from and map for massages to

const ClientToServerEvents = new Map();
ClientToServerEvents.set("SendMessage", "chat:message");
ClientToServerEvents.set("JoinRoom", "room:join");

const ServerToClientEvents = new Map();
ServerToClientEvents.set("SendMessage", "chat:message");
ServerToClientEvents.set("JoinRoom", "room:join");

export { ClientToServerEvents, ServerToClientEvents };
