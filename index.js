const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 8000;

let halls = [
  {
    name: "normal hall",
    seats: 70,
    price: 30000,
    hallid: 1,
    amenities: "Fans,Bright Lights",
    customerdetails: [
      {
        customerName: "Raju",
        date: new Date("2021-11-23"),
        start: "09:00 AM",
        end: "12:30 PM",
        status: "confirmed",
      },
    ],
  },
  {
    name: "AC Hall",
    seats: 100,
    price: 50000,
    amenities: "AC,Bright Lights,Projectors",
    hallid: 2,
    customerdetails: [
      {
        customerName: "sasi",
        date: new Date("2021-11-27"),
        start: "06:00 AM",
        end: "09:30 PM",
        status: "confirmed",
      },
    ],
  },
  {
    name: "Premium Hall",
    seats: 120,
    price: 70000,
    amenities: "Fans,Bright Lights,AC,Screen<projector,WIFI,Parking",
    hallid: 3,
    customerdetails: [
      {
        customerName: "sai",
        date: new Date("2021-11-30"),
        start: "09:00 AM",
        end: "12:30 PM",
        status: "confirmed",
      },
    ],
  },
];

// Create a Room
app.post('/createroom', (req, res) => {
  const newRoom = {
    name: req.body.name,
    seats: req.body.seats,
    price: req.body.price,
    amenities: req.body.amenities,
    hallid: halls.length + 1,
    customerdetails: [],
  };

  halls.push(newRoom);
  res.status(201).json({ message: 'Room created successfully', room: newRoom });
});

// Booking a Room
app.post('/bookroom', (req, res) => {
  const { hallid, customerName, date, start, end } = req.body;

  const hall = halls.find((room) => room.hallid === hallid);

  if (!hall) {
    return res.status(404).json({ error: 'Room not found' });
  }

  const bookingDetails = {
    customerName,
    date,
    start,
    end,
    status: 'confirmed',
  };

  hall.customerdetails.push(bookingDetails);
  res.status(201).json({ message: 'Room booked successfully', bookingDetails });
});

// List all Rooms with Booked Data
app.get('/listrooms', (req, res) => {
  const roomsWithBookedData = halls.map((hall) => {
    return {
      name: hall.name,
      bookedStatus: hall.customerdetails.length > 0 ? 'booked' : 'available',
      customerDetails: hall.customerdetails,
    };
  });

  res.json(roomsWithBookedData);
});

// List all Customers with Booked Data
app.get('/listcustomers', (req, res) => {
  const customersWithBookedData = halls.flatMap((hall) => {
    return hall.customerdetails.map((booking) => {
      return {
        customerName: booking.customerName,
        roomName: hall.name,
        date: booking.date,
        start: booking.start,
        end: booking.end,
      };
    });
  });

  res.json(customersWithBookedData);
});

// List how many times a customer has booked the room
app.get('/customerbookings', (req, res) => {
  const { customerName } = req.query;

  const customerBookings = halls.flatMap((hall) => {
    return hall.customerdetails
      .filter((booking) => booking.customerName === customerName)
      .map((booking) => {
        return {
          customerName: booking.customerName,
          roomName: hall.name,
          date: booking.date,
          start: booking.start,
          end: booking.end,
          bookingId: hall.customerdetails.indexOf(booking) + 1,
          bookingDate: new Date(),
          bookingStatus: booking.status,
        };
      });
  });

  res.json(customerBookings);
});

// List all Rooms
app.get('/', (req, res) => {
  res.send(halls);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
