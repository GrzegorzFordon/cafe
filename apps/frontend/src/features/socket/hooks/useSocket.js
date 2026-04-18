import io from "socket.io-client";

const socket = io("http://localhost:3500");

const useSocket = () => {

  socket.on("send_message", (value) => {
    console.log(value.message);
  });

  socket.on("connect", () => {
    console.log(socket.id);
  });

  return { socket };
};

export default useSocket;
