const auctionRooms = {};
const usersId = {};

const addUser = ({ userId, room, userName, id }) => {
  if (!room || !userId) {
    return {
      error: "User Name and Room are required",
    };
  }

  if (!auctionRooms[room]) {
    const user = { userId, userName };
    usersId[userId] = room;
    auctionRooms[room] = [{ ...user }];
    return {
      user: {
        ...user,
        room,
      },
    };
  }

  const existing = auctionRooms[room].find((user) => user.userId === userId);

  if (existing) {
    return {
      message: "UserId Already in use, you might have joined back",
      user: {
        ...existing,
        room,
      },
    };
  }

  const user = { userId, userName };
  usersId[userId] = room;
  auctionRooms[room].push(user);

  return {
    user: {
      ...user,
      room,
    },
  };
};

const getUserRoom = (id) => {
  return usersId[id];
};

const getIndexOfUser = (id) => {
  const room = getUserRoom(id);
  if (!room) {
    return {
      error: "invalid Id",
    };
  }
  return {
    index: auctionRooms[room].findIndex((user) => user.userId === id),
    room,
  };
};

const getUser = (id) => {
  let { index, room, error } = getIndexOfUser(id);

  if (error) {
    return { error };
  }

  if (index === -1) {
    return {
      error: "Invalid data",
    };
  }

  let user = auctionRooms[room][index];
  return {
    user: {
      ...user,
      room,
    },
  };
};

const removeUser = (id) => {
  let { index, room, error } = getIndexOfUser(id);

  if (error) {
    return { error };
  }

  if (index === -1) {
    return {
      error: "Invalid data",
    };
  }

  let user = auctionRooms[room][index];
  user = {
    ...user,
    room,
  };
  auctionRooms[room].splice(index, 1);
  delete usersId[id];
  return { user };
};

const clearAuctionRoom = (room) => {
  if (!auctionRooms[room]) return { error: "No such Auction is available" };
  const users = auctionRooms[room];
  delete auctionRooms[room];
  users.forEach((user) => {
    delete usersId[user];
  });
  return { success: true };
};

module.exports = {
  getUser,
  removeUser,
  addUser,
  clearAuctionRoom,
};
