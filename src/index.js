import app from "./app";
import http from "http";

const PORT = 3001;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
