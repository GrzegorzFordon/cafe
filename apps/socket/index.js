import "dotenv/config";
import http from "http";
import app from "./app.js";
import Socket from "./socket/socket.js";

const PORT = process.env.PORT || 3500;

const app = express();
app.use(cors(corsOptions));
const httpServer = http.createServer(app);

const socket = new Socket(httpServer);
socket.init();

httpServer.listen(PORT, () => {
  console.log("Server is running");
});
