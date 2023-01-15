const chai = require("chai");
const io = require("socket.io-client");
const server = require("../server");

describe("Server tests", () => {
  let socket;

  beforeEach(() => {
    // Connect to the server
    socket = io.connect("http://localhost:3000", {
      "reconnection delay": 0,
      "reopen delay": 0,
      "force new connection": true,
    });
  });

  afterEach(() => {
    // Disconnect from the server
    socket.disconnect();
  });

  it("should add a user to the list of online users when they connect", (done) => {
    socket.on("onlineUsers", (onlineUsers) => {
      chai.expect(onlineUsers).to.have.lengthOf(1);
      done();
    });
  });
});
