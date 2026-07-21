import http from "http";

import app from "./app.js";
import { env } from "./config/env.js";
import { initializeSocket } from "./socket/index.js";
import { connectDatabase } from "./config/database.js";

async function bootstrap() {
  await connectDatabase();

  const server = http.createServer(app);

  // Initialize Socket.IO
  initializeSocket(server);

  // Start Server
  server.listen(env.PORT, () => {
    console.log("==================================");
    console.log(`🚀 Server running on port ${env.PORT}`);
    console.log(`🌍 Environment : ${env.NODE_ENV}`);
    console.log(`📡 Client URL  : ${env.CLIENT_URL}`);
    console.log("==================================");
  });
}

bootstrap();
