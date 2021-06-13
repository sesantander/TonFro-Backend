const handlers = require("../../core/handlers");
const Exception = require("../../core/exceptions");
// const Trip  = require('../../core/models/dataModels/journey/tripModel');
// const TripBooking = require('../../core/models/dataModels/journey/tripBooking');

const {
  Trip,
  TripBooking,
  Vehicle,
  Price,
  Sequelize,
} = require("../../core/db/models");
// const Trip  = require('../../core/models/dataModels/journey/tripModel');
// const Vehicle = require('../../core/models/dataModels/user/vehicleModel');
// const TripBooking = require('../../core/models/dataModels/journey/tripBooking');
// const Price = require('../../core/models/dataModels/journey/priceModel');
// const Sequelize = require('sequelize');

async function add(req, res, next) {
  try {
    let param = req.body;

    let trip = await Trip.findOne({ where: { id: param.tripId } });

    if (!trip) return next(Exception.Route.TRIP_NOT_FOUND);

    var specialBooking = param.isSpecialBooking
      ? param.isSpecialBooking
      : false;

    if (
      !specialBooking &&
      param.maxSeat != null &&
      trip.maxSeat != null &&
      param.maxSeat >= trip.maxSeat
    ) {
      return next(Exception.Route.SEAT_ALLOCATED_MORE_THAN_CAPACITY);
    }

    const booking = await TripBooking.upsert(param);
    return res.send(
      handlers.responseHandler.buildResponse({ msg: "added successfully" })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function update(req, res, next) {
  try {
    var booking = await TripBooking.findOne({
      where: { id: req.body.bookingId },
    });

    if (!booking) return next(Exception.Route.BOOKING_DATA_NOT_FOUND);

    var bookingData = await TripBooking.update(req.body, {
      where: { id: booking.id },
    });

    return res.send(
      handlers.responseHandler.buildResponse({ msg: "added successfully" })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function activate(req, res, next) {
  try {
    var booking = await TripBooking.findOne({
      where: { id: req.body.bookingId },
    });

    if (!booking) return next(Exception.Route.BOOKING_DATA_NOT_FOUND);

    var bookingData = await TripBooking.update(
      {
        isActive: req.body.isActive,
      },
      { where: { id: bookingData.id } }
    );

    return res.send(
      handlers.responseHandler.buildResponse({ isActive: req.body.isActive })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function all(req, res, next) {
  try {
    var bookingData = await TripBooking.findAll({
      order: [["updatedAt", "desc"]],
    });

    return res.send(handlers.responseHandler.buildResponse(bookingData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function getAllBookingDataForTrip(req, res, next) {
  try {
    if (!req.params.id) {
      return next(Exception.Route.TRIP_NOT_FOUND);
    }

    var bookingData = await TripBooking.findAll({
      where: { tripId: req.params.id },
      order: [["date", "desc"]],
    });

    return res.send(handlers.responseHandler.buildResponse(bookingData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function getBookingData(req, res, next) {
  try {
    var bookingData = await TripBooking.findOne({
      where: { id: req.params.id },
    });

    return res.send(handlers.responseHandler.buildResponse(bookingData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function getAllJourneyBooking(req, res, next) {
  try {
    var allTripIds = await Trip.findAll({ attributes: ["id"], raw: true });

    var ids = allTripIds.map((data) => {
      return data.id;
    });

    var bookingData = await TripBooking.findAll({
      where: {
        tripId: ids,
        date: req.body.date,
      },
      attributes: ["maxSeat", "currentBooked", "tripId"],
      include: {
        model: Trip,
        as: "trip",
        paranoid: false,
        required: true,
        attributes: ["name", "startTime"],
        include: {
          model: Vehicle,
          as: "vehicle",
          paranoid: false,
          required: false,
          attributes: ["vehicleNumber", "id"],
        },
      },
    });

    return res.send(handlers.responseHandler.buildResponse(bookingData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function dailyTotalBooking(req, res, next) {
  try {
    var bookingData = await TripBooking.findAll({
      where: {
        isActive: true,
        date: new Date(req.body.date),
      },
      attributes: [
        [Sequelize.fn("sum", Sequelize.col("currentBooked")), "booked"],
        [Sequelize.fn("sum", Sequelize.col("maxSeat")), "total"],
      ],
    });

    return res.send(handlers.responseHandler.buildResponse(bookingData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function totalBooking(req, res, next) {
  try {
    var bookingData = await TripBooking.findAll({
      where: {
        isActive: true,
        date: {
          [Sequelize.Op.between]: [
            new Date(req.body.fromDate),
            new Date(req.body.toDate),
          ],
        },
      },
      attributes: [
        [Sequelize.fn("sum", Sequelize.col("currentBooked")), "booked"],
        [Sequelize.fn("sum", Sequelize.col("maxSeat")), "total"],
        "date",
      ],
      group: "date",
    });

    if (!bookingData) return next(Exception.Route.BOOKING_DATA_NOT_FOUND);

    return res.send(handlers.responseHandler.buildResponse(bookingData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function monthlyBooking(req, res, next) {
  try {
    var bookingData = await TripBooking.findAll({
      where: {
        isActive: true,
      },
      attributes: [
        [Sequelize.fn("sum", Sequelize.col("currentBooked")), "booked"],
        [Sequelize.fn("sum", Sequelize.col("maxSeat")), "total"],
        "date",
      ],
      group: "date",
      raw: true,
    });

    var dataByMonth = bookingData.reduce(function (dataByMonth, datum) {
      var date = new Date(datum.date);
      var currentBooked = datum.booked;
      var maxSeat = datum.total;
      var month = date.getMonth() + 1;
      var year = ("" + date.getFullYear()).slice(-2);
      var group = month + "'" + year;
      if (dataByMonth[group]) {
        dataByMonth[group] = {
          currentBooked:
            parseInt(currentBooked, 10) + dataByMonth[group].currentBooked,
          maxSeat: parseInt(maxSeat, 10) + dataByMonth[group].maxSeat,
        };
      } else {
        dataByMonth[group] = {
          currentBooked: parseInt(0 + currentBooked, 10),
          maxSeat: parseInt(0 + maxSeat),
        };
      }
      return dataByMonth;
    }, {});

    // Now just turn the hash into an array.
    var finalResult = Object.keys(dataByMonth).map(function (group) {
      return {
        name: group,
        currentBooked: dataByMonth[group].currentBooked,
        maxSeat: dataByMonth[group].maxSeat,
      };
    });

    return res.send(handlers.responseHandler.buildResponse(finalResult));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function availability(req, res, next) {
  try {
    const trip = await Trip.findOne({ where: { id: req.body.tripId } });

    if (!trip) return next(Exception.Route.ROUTE_NOT_FOUND);

    var tripBooking = await TripBooking.findOne({
      where: {
        date: req.body.date,
        tripId: req.body.tripId,
      },
    });

    if (!tripBooking) {
      //create a trip booking
      const data = {
        maxSeat: trip.maxSeat,
        date: req.body.date,
        isActive: true,
        tripId: req.body.tripId,
      };

      tripBooking = await TripBooking.create(data);

      if (!tripBooking) {
        return next(Exception.Route.BOOKING_DATA_NOT_FOUND);
      }
    }

    if (!tripBooking.isActive) {
      return next(Exception.Route.BOOKING_NOT_ALLOWED);
    }

    var isAvailable = false;
    if (tripBooking.currentBooked + req.body.seatCount <= tripBooking.maxSeat) {
      isAvailable = true;
    }

    var seatRemaining = tripBooking.maxSeat - tripBooking.currentBooked;

    var price = await Price.findOne({
      where: {
        tripId: req.body.tripId,
        fromId: req.body.from,
        toId: req.body.to,
        date: {
          [Sequelize.Op.lte]: new Date(req.body.date),
        },
      },
      order: [["date", "desc"]],
    });

    if (!price) throw Exception.Route.BOOKING_DATA_NOT_FOUND;

    const totalPrice = price.price;

    return res.send(
      handlers.responseHandler.buildResponse({
        isAvailable: isAvailable,
        seatRemaining: seatRemaining,
        totalPrice: totalPrice,
        paymentMode: JSON.parse(trip.payBy),
      })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function checkPrice(req,res,next){

    try{

        const trip = await Trip.findOne({where: {id: req.body.tripId}});

        if(!trip) return next(Exception.Route.ROUTE_NOT_FOUND);


        var price  = await Price.findOne({where:{
            tripId: req.body.tripId,
            fromId: req.body.from,
            toId: req.body.to,
            date: {
                [Sequelize.Op.lte]: new Date(req.body.date)
            }
        },
        order:[['date', 'desc']]
    });

        if(!price) throw Exception.Route.BOOKING_DATA_NOT_FOUND;

        const totalPrice = price.price;

        return res.send(handlers.responseHandler.buildResponse({
            totalPrice: totalPrice,
            paymentMode: JSON.parse(trip.payBy)
        }));
    }catch (e){
        console.log('error',e);
        next(e)
    }
}



module.exports = {
  add,
  activate,
  update,
  all,
  getBookingData,
  getAllJourneyBooking,
  dailyTotalBooking,
  availability,
  checkPrice,
  totalBooking,
  monthlyBooking,
  getAllBookingDataForTrip,
};
