const rooms = [
  { roomNo: "101", block: "A", floor: 1, status: "Available" },
  { roomNo: "102", block: "A", floor: 1, status: "Available" },
  { roomNo: "203", block: "B", floor: 2, status: "Available" },
  { roomNo: "305", block: "C", floor: 3, status: "Booked" },
];

function loadRoomTable() {
  const saved = JSON.parse(localStorage.getItem("bookedRooms")) || [];
  const tbody = document.querySelector("#roomTable tbody");
  tbody.innerHTML = "";

  rooms.forEach((room) => {
    const isBooked = saved.includes(room.roomNo) || room.status === "Booked";
    const row = `
      <tr>
        <td>${room.roomNo}</td>
        <td>${room.block}</td>
        <td>${room.floor}</td>
        <td>${isBooked ? "Booked" : "Available"}</td>
        <td>
          ${isBooked ? `<button disabled>Booked</button>` 
                     : `<button onclick="bookRoom('${room.roomNo}')">Book</button>`}
        </td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

function bookRoom(roomNo) {
  let booked = JSON.parse(localStorage.getItem("bookedRooms")) || [];
  if (!booked.includes(roomNo)) {
    booked.push(roomNo);
    localStorage.setItem("bookedRooms", JSON.stringify(booked));
    alert(`Room ${roomNo} booked successfully!`);
    loadRoomTable();
  }
}

window.onload = loadRoomTable;