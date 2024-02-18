const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket.IO

const connectedClients = new Map();

io.on("connection", (socket) => {
  socket.on("userConnected", (user_id) => {
    connectedClients.set(user_id, socket.id);
  });

  socket.on("groupUserConnected", (group_id) => {
    socket.join(group_id);
  });

  socket.on(
    "sendMessage",
    ({
      message_id,
      sender_id,
      recipient_id,
      message_text,
      message_date,
      username,
      profile_picture_src,
    }) => {
      const recipientSocketId = connectedClients.get(recipient_id);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receiveMessage", {
          message_id,
          sender_id,
          message_text,
          message_date,
          username,
          profile_picture_src,
        });
      }
    }
  );

  socket.on(
    "sendGroupMessage",
    ({
      message_id,
      sender_id,
      group_id,
      message_text,
      message_date,
      username,
      profile_picture_src,
    }) => {
      socket.to(group_id).emit("receiveMessage", {
        message_id,
        sender_id,
        message_text,
        message_date,
        username,
        profile_picture_src,
      });
    }
  );

  socket.on("typing", ({ myId, recipient_id }) => {
    const recipientSocketId = connectedClients.get(recipient_id);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("isTyping", myId);
    }
  });

  socket.on("groupTyping", ({ myId, group_id, myUsername }) => {
    socket.to(group_id).emit("gTyping", { myId, myUsername });
  });

  socket.on("disconnect", () => {
    for (const [user_id, socketId] of connectedClients.entries()) {
      if (socketId === socket.id) {
        connectedClients.delete(user_id);
        break;
      }
    }
  });
});

const port = 3000;

server.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
