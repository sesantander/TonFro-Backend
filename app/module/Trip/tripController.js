const handlers = require("../../core/handlers");
const Exception = require("../../core/exceptions");
const {
  TripPointImage,
  PointImage,
  Point,
  Price,
  TripTiming,
  TripBooking,
  Trip,
  Booking,
  Vehicle,
  Sequelize,
} = require("../../core/db/models");
const { RideStatus, UserTypeENUM } = require("../../core/constants");
const { removeEmpty } = require("../../core/utility");

async function add(req, res, next) {
  try {
    const route = await Trip.create(req.body);

    return res.send(handlers.responseHandler.buildResponse(route));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function updateSeat(req, res, next) {
  try {
    var route = await Trip.findOne({ where: { id: req.body.tripId } });

    if (!route) return next(Exception.Route.TRIP_NOT_FOUND);

    var trip = await TripBooking.findOne({
      where: {
        tripId: req.body.tripId,
        date: req.body.date,
      },
    });

    if (!trip) return next(Exception.Route.BOOKING_DATA_NOT_FOUND);

    await TripBooking.update(
      {
        maxSeat: req.body.maxSeat,
      },
      { where: { id: trip.id } }
    );

    return res.send(
      handlers.responseHandler.buildResponse({ msg: "updated successfully" })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function update(req, res, next) {
  try {
    var trip = await Trip.findOne({ where: { id: req.body.tripId } });

    if (!trip) return next(Exception.Route.TRIP_NOT_FOUND);

    var trip = await trip.update(req.body);

    if (req.body.vehicleId) {
      var vehicleId = null;
      var driverId = null;
      if (req.body.vehicleId != null && req.body.vehicleId != undefined) {
        const vehicle = await Vehicle.findOne({
          where: { id: req.body.vehicleId },
          attributes: ["id", "driverId"],
        });
        vehicleId = vehicle.id;
        driverId = vehicle.driverId;
      } else {
        //all details are null
      }

      Booking.update(
        {
          vehicleId: vehicleId,
          driverId: driverId,
        },
        {
          where: Sequelize.and(
            { tripId: trip.id },
            Sequelize.or(
              { rideStatus: RideStatus.pending },
              { rideStatus: RideStatus.notBooked }
            )
          ),
        }
      );
    }

    return res.send(
      handlers.responseHandler.buildResponse({ msg: "updated successfully" })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function getDetail(req, res, next) {
  try {
    var trip = await Trip.findOne({ where: { id: req.body.tripId } });

    var tripBooking = await TripBooking.findOne({
      where: {
        tripId: req.body.tripId,
        date: req.body.date,
      },
    });

    trip.maxSeat = tripBooking.maxSeat;
    trip.currentBooked = tripBooking.currentBooked;

    var trip = await trip.update(req.body);

    return res.send(handlers.responseHandler.buildResponse(trip));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function all(req, res, next) {
  try {
    var options = {};

    if (req.headers["user-type"] == UserTypeENUM.user) {
      options.isActive = true;
    }

    var trips = await Trip.findAll({
      where: options,
      include: [
        { model: Point, as: "startingPoint" },
        { model: Point, as: "destinationPoint" },
      ],
      order: [["updatedAt", "desc"]],
    });

    return res.send(handlers.responseHandler.buildResponse(trips));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function getTrip(req, res, next) {
  try {
    var trips = await Trip.findOne({
      where: { id: req.params.id },
      include: [
        { model: Point, as: "startingPoint" },
        { model: Point, as: "destinationPoint" },
      ],
    });

    if (!trips) return next(Exception.Route.TRIP_NOT_FOUND);

    return res.send(handlers.responseHandler.buildResponse(trips));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function filtered(req, res, next) {
  try {
    let param = {
      from: req.body.startingPointId,
      to: req.body.endPointId,
    };

    var fromPoint = await Point.findOne({
      where: { id: req.body.startingPointId },
    });

    if (!fromPoint) return next(Exception.Route.POINT_NOT_FOUND);

    var toPoint = await Point.findOne({ where: { id: req.body.endPointId } });

    if (!toPoint) return next(Exception.Route.POINT_NOT_FOUND);

    var tripIds = await Price.findAll({
      where: {
        fromId: param.from,
        toId: param.to,
      },
      attributes: ["tripId"],
    });

    var ids = tripIds.map((trip) => {
      return trip.tripId;
    });

    console.log("all trips", ids);

    var trips = await Trip.findAll({
      where: { id: ids, isActive: true },
      raw: true,
    });

    console.log(trips.length);
    var responseData = [];

    for (var i = 0; i < trips.length; i++) {
      var data = trips[i];

      console.log("trip data", data);
      data["startingPoint"] = fromPoint;
      data["destinationPoint"] = toPoint;

      var tripTime = await TripTiming.findOne({
        where: { tripId: data.id, pointId: fromPoint.id },
      });

      if (!tripTime) continue;
      data.startTime = tripTime.time;
      responseData.push(data);
    }

    // var responseData = await trips.map(async (data) => {
    //     var tripData = data;
    //     tripData.startingPoint = fromPoint;
    //     tripData.destinationPoint = toPoint;

    //     var tripTime = await TripTiming.findOne({where: {tripId: data.id, pointId: fromPoint.id}});

    //     if(!tripTime) conti;
    //     tripData.startTime = tripTime.time;
    //     return tripData;
    // });

    return res.send(
      handlers.responseHandler.buildResponse(removeEmpty(responseData))
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function addPoints(req, res, next) {
  try {
    var points = req.body.points;
    let trip = req.body.tripId;

    var addObj = [];
    var updateObj = [];

    for (let point of points) {
      let pt = removeEmpty({
        tripId: trip,
        pointId: point.pointId,
        time: point.time,
        id: point.id,
      });

      if (pt.id == null || pt.id == undefined) {
        addObj.push(pt);
      } else {
        updateObj.push(pt);
      }
    }

    //add all
    await TripTiming.bulkCreate(addObj);

    for (let pt of updateObj) {
      await TripTiming.update(
        { time: pt.time },
        {
          where: {
            id: pt.id,
          },
        }
      );
    }

    return res.send(
      handlers.responseHandler.buildResponse({
        msg: "data updated successfully",
      })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function addPrice(req, res, next) {
  try {
    var prices = req.body.prices;
    let trip = req.body.tripId;

    var objs = [];

    for (let price of prices) {
      let pr = {
        tripId: trip,
        fromId: price.from,
        toId: price.to,
        date: price.date,
        price: price.price,
      };

      var priceData = await Price.findOne({
        where: {
          tripId: pr.tripId,
          fromId: pr.fromId,
          toId: pr.toId,
          date: pr.date,
        },
      });

      if (!priceData) {
        priceData = await Price.create(pr);
      }

      objs.push(priceData);
    }

    return res.send(handlers.responseHandler.buildResponse(objs));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function addPointImage(req, res, next) {
  try {
    var pointId = req.body.pointId;
    let tripId = req.body.tripId;

    let objs = req.body.imageIds.map((imageId) => {
      let pt = {
        tripId: tripId,
        pointId: pointId,
        pointImageId: imageId,
      };
      return pt;
    });

    let pointsData = await TripPointImage.bulkCreate(objs);

    return res.send(handlers.responseHandler.buildResponse(pointsData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function removeImage(req, res, next) {
  try {
    var ids = req.body.ids;

    await TripPointImage.destroy({ where: { id: ids } });

    return res.send(
      handlers.responseHandler.buildResponse({
        msg: "points deleted successfully",
      })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function allImages(req, res, next) {
  try {
    const data = await TripPointImage.findAll({
      where: {
        tripId: req.body.tripId,
        pointId: req.body.pointId,
      },
      include: {
        model: PointImage,
        as: "pointImage",
        paranoid: false,
        required: false,
        attributes: ["image"],
      },
    });

    return res.send(handlers.responseHandler.buildResponse(data));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function getPrice(req, res, next) {
  try {
    var date = new Date(req.body.date);

    var data = await Price.findOne({
      where: {
        tripId: req.body.tripId,
        fromId: req.body.sourcePointId,
        toId: req.body.destinationPointId,
        date: {
          [Sequelize.Op.lte]: date,
        },
      },
      order: [["date", "desc"]],
    });

    // if (!data) {
    //     data  = await Price.findOne({where:{
    //             tripId: req.body.tripId,
    //             fromId: req.body.sourcePointId,
    //             toId: req.body.destinationPointId,
    //             date: new Date("01/01/1901")
    //         }
    //        });
    // }

    if (!data) return next(Exception.Route.TRIP_NOT_FOUND);

    return res.send(handlers.responseHandler.buildResponse(data));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function getAllPrice(req, res, next) {
  try {
    var data = await Price.findAll({
      where: { tripId: req.body.tripId },
      order: [["date", "desc"]],
    });

    return res.send(handlers.responseHandler.buildResponse(data));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function allPoints(req, res, next) {
  try {
    var data = await TripTiming.findAll({
      where: {
        tripId: req.body.tripId,
      },
      include: [
        {
          model: Point,
          as: "point",
          paranoid: false,
          required: false,
          attributes: ["name", "lat", "long"],
        },
      ],
      order: [["time", "asc"]],
    });

    return res.send(handlers.responseHandler.buildResponse(data));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

module.exports = {
  add,
  update,
  updateSeat,
  getDetail,
  all,
  filtered,
  addPoints,
  addPrice,
  getTrip,
  addPointImage,
  removeImage,
  allImages,
  getPrice,
  getAllPrice,
  allPoints,
};
