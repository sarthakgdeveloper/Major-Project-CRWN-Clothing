const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const schedule = require("node-schedule");
const {
  startTheAuction,
  getUserDetails,
  placeHigherBid,
  checkAuctionBidEnded,
  endAuction,
} = require("./firebaseConfig");
const {
  addUser,
  removeUser,
  getUser,
  clearAuctionRoom,
} = require("./models/users");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

server.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});

app.post("/schedule_auction", (req, res) => {
  const { date, time, auctionId } = req.body;
  const newdate = new Date(`${date} ${time}`);
  schedule.scheduleJob(newdate, async () => {
    await startTheAuction(auctionId);
  });
  res.send({ success: true });
});

app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "inr",
    description: req.body.description,
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

const auctionCounter = {};

io.on("connection", async (socket) => {
  socket.on("join", async ({ userId, auctionRoom: room }, callBack) => {
    const { user: userDetails, error: errorMessage } = await getUserDetails(
      userId
    );

    if (errorMessage) {
      return callBack(errorMessage);
    }
    const { error, user, message } = addUser({
      userId,
      room,
      userName: userDetails?.displayName,
    });

    if (error) return callBack(error);

    await socket.join(user.room);
    callBack(message ? message : "");
  });

  socket.on("sendAuctionBid", async ({ newBid, userId }, callBack) => {
    if (!newBid || !userId) return callBack("error");
    const { error, user } = getUser(userId);
    if (error) return callBack(error);
    const { auctionEnded, error: auctionEndedError } =
      await checkAuctionBidEnded(user?.room);

    if (auctionEndedError || auctionEnded) {
      return callBack(auctionEnded ? auctionEnded : auctionEndedError);
    }

    const { error: newError } = await placeHigherBid(user.room, newBid, user);

    if (newError) {
      return callBack(newError);
    }

    let Counter = 30;

    socket.broadcast.to(user.room).emit("auctionBid", {
      newBid,
      userId: user.userId,
      userName: user.userName,
    });

    if (auctionCounter[user?.room]) {
      clearInterval(
        auctionCounter[user?.room][auctionCounter[user?.room].length - 1]
      );
      delete auctionCounter[user?.room];
    }
    const counterInterval = setInterval(() => {
      if (Counter >= 0) {
        socket.broadcast.to(user.room).emit("counter", { Counter });
        Counter--;
      } else {
        if (!(auctionCounter[user?.room]?.length > 1)) {
          endAuction(user?.room);
          clearAuctionRoom(user?.room);
          socket.broadcast.to(user.room).emit("auctionEnded");
        }
        clearInterval(counterInterval);
        delete auctionCounter[user?.room];
      }
    }, 1000);

    if (!auctionCounter[user?.room]) {
      auctionCounter[user?.room] = [counterInterval];
    }

    return callBack();
  });

  socket.on("disconnectingUser", ({ userId }) => {
    let { error } = removeUser(userId);
    if (error) return io.emit("error", error);
  });
});
