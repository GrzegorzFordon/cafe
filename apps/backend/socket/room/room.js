/* this is the room object used for creating specific games */

class Room {
  constructor(roomID, hostID) {
    this.id = roomID;
    this.hostID = hostID;
  }

  addPlayer() {}
  removePlayer() {}
}

export default Room;

// ID, Players, Game Instance, Room Actions, Room Events
