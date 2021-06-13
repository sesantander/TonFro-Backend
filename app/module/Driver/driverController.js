const handlers = require("../../core/handlers");
const Exception = require("../../core/exceptions");
const bcrypt = require("../../services").bcryptService;
const {
  User,
  Driver,
  Vehicle,
  TripBooking,
  UserType,
  Trip,
  Point,
  Booking,
} = require("../../core/db/models");
const formidable = require("formidable");
const File = require("fs");
var Path = require("path");
var mv = require("mv");
var { moveFile, removeEmpty, removeIfExist } = require("../../core/utility");
var {
  BookingStatus,
  RideStatus,
  UserTypeENUM,
} = require("../../core/constants");

async function add(req, res, next) {
  try {
    const oldUser = await User.findOne({ where: { mobile: req.body.mobile } });
    if (oldUser) return next(Exception.User.USER_ALREADY_EXISTS);

    const userDetail = {
      name: req.body.name,
      mobile: req.body.mobile,
      password: req.body.password,
      gender: req.body.gender,
      userType: UserTypeENUM.driver,
      deviceId: req.body.mobile,
      email: req.body.email,
    };
    userDetail.password = await bcrypt.generatePassword(userDetail.password);

    let userType = await UserType.findOne({
      where: { name: userDetail.userType },
    });

    if (!userType) return next(Exception.User.INVALID_USER_TYPE);

    userDetail.userTypeId = userType.id;

    const user = await User.create(removeEmpty(userDetail));
    if (!user) return next(Exception.User.INVALID_USER_TYPE);

    var driverData = req.body;
    driverData.userId = user.id;

    const driver = await Driver.create(driverData);

    return res.send(handlers.responseHandler.buildResponse(driver));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function update(req, res, next) {
  try {
    var driver = await Driver.findOne({ where: { id: req.body.driverId } });

    if (!driver) return next(Exception.Route.DRIVER_NOT_FOUND);

    var driverData = await driver.update(req.body);

    //update user details

    const userDetail = {
      name: req.body.name,
      mobile: req.body.mobile,
      gender: req.body.gender,
      email: req.body.email,
    };

    const user = await User.update(removeEmpty(userDetail), {
      where: {
        id: driver.userId,
      },
    });
    if (!user) return next(Exception.User.INVALID_USER_TYPE);

    return res.send(
      handlers.responseHandler.buildResponse({ msg: "updated successfully" })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function activate(req, res, next) {
  try {
    var driver = await Driver.findOne({ where: { id: req.body.driverId } });

    if (!driver) return next(Exception.Route.DRIVER_NOT_FOUND);

    var driverData = await driver.update({
      isActive: req.body.isActive,
    });

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
    var driverData = await Driver.findAll({
      include: {
        model: User,
        as: "user",
        paranoid: false,
        required: false,
        attributes: {
          exclude: ["pushToken", "userTypeId", "password", "emailVerified"],
        },
      },
      order: [[{ model: User, as: "user" }, "updatedAt", "desc"]],
    });

    return res.send(handlers.responseHandler.buildResponse(driverData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function getDriver(req, res, next) {
  try {
    var driverData = await Driver.findOne({
      where: { id: req.params.id },
      include: {
        model: User,
        as: "user",
        paranoid: false,
        required: false,
        attributes: {
          exclude: ["pushToken", "userTypeId", "password", "emailVerified"],
        },
      },
    });

    if (!driverData) return next(Exception.Route.DRIVER_NOT_FOUND);
    return res.send(handlers.responseHandler.buildResponse(driverData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function assignedVehicle(req, res, next) {
  try {
    var driverData = await Vehicle.findAll({
      where: { driverId: req.body.driverId },
    });

    return res.send(handlers.responseHandler.buildResponse(driverData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function profileImage(req, res, next) {
  try {
    let form = new formidable.IncomingForm();

    let parsedFields = await new Promise(async function (resolve, reject) {
      form.parse(req, async function (err, fields, fileName) {
        if (fields.driverId) {
          var driver = await Driver.findOne({ where: { id: fields.driverId } });

          if (!driver) return next(Exception.Route.DRIVER_NOT_FOUND);

          var user = await User.findOne({ where: { id: driver.userId } });

          if (!user) return next(Exception.Route.DRIVER_NOT_FOUND);

          fields.userId = user.id;
        } else {
          return next(Exception.Route.ROUTE_NOT_FOUND);
        }

        if (!fileName.image) {
          return resolve(fields);
        }

        //add proof image
        if (fileName.image) {
          const url = await moveFile(fileName.image, "profile/");
          removeIfExist(user.image);
          fields.image = url;
        }
        return resolve(fields);
      });
    });

    const model = {
      image: parsedFields.image,
    };

    const data = await User.update(model, {
      where: {
        id: parsedFields.userId,
      },
    });

    return res.send(
      handlers.responseHandler.buildResponse({
        msg: "driver image updated successfully",
      })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function updateKycImage(req, res, next) {
  try {
    let form = new formidable.IncomingForm();

    let parsedFields = await new Promise(async function (resolve, reject) {
      form.parse(req, async function (err, fields, fileName) {
        if (fields.driverId) {
          var driver = await Driver.findOne({ where: { id: fields.driverId } });

          if (!driver) return next(Exception.Route.DRIVER_NOT_FOUND);
        } else {
          return next(Exception.Route.DRIVER_NOT_FOUND);
        }

        //add proof image
        if (fileName.addProofImage) {
          const url = await moveFile(fileName.addProofImage, "kyc/");
          removeIfExist(driver.addProofImage);
          fields.addProofImage = url;
        }

        //add proof image
        if (fileName.idProofImage) {
          const url = await moveFile(fileName.idProofImage, "kyc/");
          removeIfExist(driver.idProofImage);
          fields.idProofImage = url;
        }

        return resolve(fields);
      });
    });

    var model = {
      addProofImage: parsedFields.addProofImage,
      idProofImage: parsedFields.idProofImage,
    };

    model = removeEmpty(model);

    const data = await Driver.update(model, {
      where: {
        id: parsedFields.driverId,
      },
    });

    return res.send(
      handlers.responseHandler.buildResponse({
        msg: "driver kyc image updated successfully",
      })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function getTrips(req, res, next) {
  try {
    const driver = await Driver.findOne({
      where: { userId: req.decode.id },
      attributes: ["id"],
    });

    if (!driver) return next(Exception.Driver.DRIVER_NOT_FOUND);

    var vehicleIds = await Vehicle.findAll({
      where: {
        driverId: driver.id,
        isActive: true,
      },
      attributes: ["id"],
    });

    vehicleIds = vehicleIds.map((data) => {
      return data.id;
    });

    const tripData = await Trip.findAll({
      where: {
        vehicleId: vehicleIds,
        isActive: true,
      },
      include: [
        { model: Point, as: "startingPoint" },
        { model: Point, as: "destinationPoint" },
      ],
      order: [["startTime", "asc"]],
    });

    return res.send(handlers.responseHandler.buildResponse(tripData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function tripBookingData(req, res, next) {
  try {
    const driver = await Driver.findOne({
      where: { userId: req.decode.id },
      attributes: ["id"],
    });

    if (!driver) return next(Exception.Driver.DRIVER_NOT_FOUND);

    const bookingData = await Booking.findAll({
      where: {
        tripId: req.body.tripId,
        travelDate: req.body.travelDate,
        status: BookingStatus.completed,
      },
      include: [{ model: User, as: "user", attributes: ["name", "mobile"] }],
    });

    //    {model: Point, as: 'sourcePoint'},
    //    {model: Point, as: 'destinationPoint'},

    return res.send(handlers.responseHandler.buildResponse(bookingData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function updateBookingData(req, res, next) {
  try {
    const driver = await Driver.findOne({
      where: { userId: req.decode.id },
      attributes: ["id"],
    });

    if (!driver) return next(Exception.Driver.DRIVER_NOT_FOUND);

    if (req.headers["user-type"] != UserTypeENUM.driver) {
      return next(Exception.User.MISSING_USER_TYPE);
    }

    const bookingData = await Booking.findOne({
      where: {
        tripId: req.body.tripId,
        travelDate: req.body.travelDate,
        status: BookingStatus.completed,
        userId: req.body.userId,
        id: req.body.bookingId,
      },
    });

    if (!bookingData) return next(Exception.Route.BOOKING_DATA_NOT_FOUND);

    var updateData = { rideStatus: req.body.status };

    if (req.body.status == RideStatus.notArrived) {
      updateData.pickupTime = new Date();
      updateData.dropTime = new Date();

      //release seat
      const tripBookingData = await TripBooking.findOne({
        where: { id: bookingData.tripBookingId },
      });

      if (!tripBookingData) return next(Exception.Route.BOOKING_DATA_NOT_FOUND);

      const seatConsumed =
        tripBookingData.currentBooked - bookingData.seatsBooked;

      await TripBooking.update(
        {
          currentBooked: seatConsumed,
        },
        { where: { id: tripBookingData.id } }
      );
    }

    if (req.body.status == RideStatus.arrived) {
      updateData.pickupTime = new Date();
    }

    if (req.body.status == RideStatus.departed) {
      updateData.dropTime = new Date();
    }

    await bookingData.update(updateData);

    return res.send(handlers.responseHandler.buildResponse(bookingData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

module.exports = {
  add,
  activate,
  update,
  all,
  assignedVehicle,
  getDriver,
  profileImage,
  updateKycImage,
  getTrips,
  tripBookingData,
  updateBookingData,
};
