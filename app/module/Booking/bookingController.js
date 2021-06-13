const handlers = require("../../core/handlers");
const Exception = require("../../core/exceptions");
const https = require('http');

const { paymentService } = require("../../services");
const {
  payFor,
  paymentMethod,
  RideStatus,
  BookingStatus,
  UserTypeENUM,
} = require("../../core/constants");

const { removeEmpty } = require("../../core/utility");
const {
  Pass,
  User,
  Point,
  Price,
  Booking,
  Vehicle,
  Trip,
  TripBooking,
  PassPoint,
  PassTrip,
  UserPass,
  UserType,
  Driver,
  TripTiming,
  Sequelize,
} = require("../../core/db/models");

const { flattenObj } = require("../../core/utility");

const flat = require("flat");

const { googleService } = require("../../services");
const moment =require('moment');

const pdfTemplate= require("./invoicetemplate");
const pdf=require("html-pdf");

const Op = Sequelize.Op;

async function sendBookingSMS(req,res,next){

	console.log('Inside the REST');
       
	const booking  = await Booking.findOne({where:{orderId:req.body.orderId}});

        console.log('Booking Details ' + booking);

        if(!booking) return next(Exception.Booking.BOOKING_DATA_NOT_FOUND); 

        const driver =  await Driver.findOne({where: {id: booking.driverId}});
        const driverDetails =  await User.findOne({where: {id: driver.userId}});
        const sourcePoint = await Point.findOne({where: {id: booking.sourcePointId}});   
        const destinationPoint = await Point.findOne({where: {id: booking.destinationPointId}});   
        const loggedInUser = await User.findOne({where: {id: req.decode.id}});
        const vehicle = await Vehicle.findOne({where: {id: booking.vehicleId}});

        var lineFeed = '%250D%250A';

        var date = new Date(booking.pickupTime);

        var dateToPrint = ((date.getDate()+1) < 10 ? '0' : '') + (date.getDate()) + '-' +
               		((date.getMonth()+1) < 10 ? '0' : '') + (date.getMonth()+1) + '-' + date .getFullYear();
        
        var hours = ( date.getHours() < 12 ? date.getHours() : date.getHours() - 12 );

        if( hours < 10 ){
            hours = '0'+hours;
        }

		var meridien = ( date.getHours() < 12 ? 'AM' : 'PM' );
		dateToPrint = dateToPrint + ' ' + hours + ':' + 
               		(date.getMinutes() < 10 ? '0' : '') +  (date.getMinutes()) + " " + meridien;

        var message = 'Name: ' + booking.nameBookedFor + lineFeed;
        
        message = message + 'Pick-up Time: ' + dateToPrint + lineFeed;
        message = message + 'From: ' + sourcePoint.name + lineFeed;
        message = message + 'To: ' + destinationPoint.name + lineFeed;
        message = message + 'Bus No.: ' + vehicle.title + lineFeed;
        message = message + 'Driver name: ' + driverDetails.name + lineFeed;
        message = message + 'Mobile No.: ' + driverDetails.mobile + lineFeed;
        message = message + 'Fare paid: ' + booking.price + lineFeed;
        message = message + 'Tracking Link: --' + lineFeed;
        message = message + 'Helpline No.: 9319451172' + lineFeed;
        message = message + 'Booked From: ' + loggedInUser.name + lineFeed;
        
		await sendSms(message, booking.mobileBookedFor )

        return res.send("Sent message successfully")
}

async function createOrder(req, res, next) {
  try {
    //check if all data provided is correct,
    //check for seat
    //create order and other detail and send back

    const trip = await Trip.findOne({ where: { id: req.body.tripId } });

    if (!trip) return next(Exception.Route.TRIP_NOT_FOUND);

    var vehicleId = trip.vehicleId;
    var driverId = "";
    if (trip.vehicleId) {
      const vehicle = await Vehicle.findOne({ where: { id: trip.vehicleId } });
      driverId = vehicle.driverId;
    }

    var tripBooking = await TripBooking.findOne({
      where: {
        tripId: req.body.tripId,
        date: req.body.travelDate,
      },
    });

    if (!tripBooking) {
      //create a trip booking

      const data = {
        maxSeat: trip.maxSeat,
        date: req.body.travelDate,
        isActive: true,
        tripId: req.body.tripId,
      };

      tripBooking = await TripBooking.create(data);
      
     // if (!tripBooking) {
   //     return next(Exception.Route.BOOKING_DATA_NOT_FOUND);
    //  }
    }

    if (!tripBooking.isActive) {
      return next(Exception.Route.BOOKING_NOT_ALLOWED);
    }

    if (tripBooking.maxSeat <= tripBooking.currentBooked) {
      return next(Exception.Route.ALL_SEATS_BOOKED);
    }

    if (tripBooking.maxSeat < tripBooking.currentBooked + req.body.seatCount) {
      return next(Exception.Route.SEAT_ALLOCATED_MORE_THAN_CAPACITY);
    }

    const price = await calculatePrice(
      req.body.from,
      req.body.to,
      req.body.seatCount,
      req.body.tripId,
      req.body.travelDate
    );

    const pickupTime = await getTime(
      trip.id,
      req.body.from,
      req.body.travelDate
    );
    const dropTime = await getTime(trip.id, req.body.to, req.body.travelDate);

    //create booking table entry
    var bookingData = {
      price: price,
      seatsBooked: req.body.seatCount,
      pickupTime: pickupTime,
      dropTime: dropTime,
      userId: req.decode.id,
      sourcePointId: req.body.from,
      destinationPointId: req.body.to,
      tripId: req.body.tripId,
      tripBookingId: tripBooking.id,
      isBookingForOther: req.body.isBookingForOther,
      nameBookedFor: req.body.nameBookedFor,
      mobileBookedFor: req.body.mobileBookedFor,
      vehicleId: vehicleId,
      driverId: driverId,
      payMethod: paymentMethod.online,
      travelDate: req.body.travelDate,
      isOnline: true,
    };

    bookingData = removeEmpty(bookingData);

    console.log(bookingData);

    if (req.headers["user-type"] == UserTypeENUM.superadmin) {
      const user = await User.findOne({
        where: { id: req.decode.id },
        attributes: ["userTypeId"],
      });

      if (!user) return next(Exception.User.USER_NOT_FOUND);

      const userType = await UserType.findOne({
        where: { id: user.userTypeId },
        attributes: ["name"],
      });
      
      if (!userType || userType.name != UserTypeENUM.superadmin )
        return next(Exception.User.INVALID_USER_TYPE);

      bookingData.isAdmin = true;
      bookingData.status = BookingStatus.completed;
      bookingData.rideStatus = RideStatus.pending;
      bookingData.isOnline = false;

      const booking = await Booking.create(bookingData);

      // await tripBooking.update({
      //     seatsBooked: tripBooking.seatsBooked + bookingData.seatsBooked
      // });

      await TripBooking.update(
        { currentBooked: tripBooking.currentBooked + bookingData.seatsBooked },
        { where: { id: booking.tripBookingId } }
      );

      return res.send(handlers.responseHandler.buildResponse(booking));
    }

    const booking = await Booking.create(bookingData);

    console.log("total calcualted price", price);

    var orderId = await paymentService.createOrder({
      amount: price,
      id: booking.id,
      payFor: payFor.booking,
    });

    console.log("order ids", orderId);

    await booking.update({ orderId: orderId.id });

    return res.send(handlers.responseHandler.buildResponse(orderId));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function getTime(tripId, pointId, dateStr) {
  const time = await TripTiming.findOne({
    where: {
      tripId: tripId,
      pointId: pointId,
    },
    attributes: ["time"],
  });

  if (!time) throw Exception.Route.POINT_NOT_FOUND;

  var date = new Date(dateStr);
  var timeDate = new Date("1970-01-01T" + time.time);

  date.setHours(timeDate.getHours());
  date.setMinutes(timeDate.getMinutes());
  return date;
}

async function recievePayment(req, res, next) {
  try {
    //check if all data provided is correct,
    //check for seat
    //create order and other detail and send back
    let parsedData = paymentService.parseOrder(req);

    res.send(handlers.responseHandler.buildResponse({}));

    console.log("parsed payment response", parsedData);

    if (parsedData.notes.type == payFor.pass) {
      let paymentStatus;

      if (parsedData.success) {
        paymentStatus = BookingStatus.completed;
        isActive = true;

        
                    
      } else {
        paymentStatus = BookingStatus.failed;
        isActive = false;
      }

      const userPass = await UserPass.findOne({
        where: { orderId: parsedData.id },
      });

      await userPass.update({
        orderStatus: paymentStatus,
        isActive: isActive,
      });

      return res.send({});
    } else if (parsedData.notes.type == payFor.booking) {






      
      let paymentStatus;
      let rideStatus;
      if (parsedData.success) {
        paymentStatus = BookingStatus.completed;
        rideStatus = RideStatus.pending;





        const booking  = await Booking.findOne({where:{orderId:parsedData.id}});

        console.log('Booking Details ' + booking);

        if(!booking) return next(Exception.Booking.BOOKING_DATA_NOT_FOUND); 

        const driver =  await Driver.findOne({where: {id: booking.driverId}});
        const driverDetails =  await User.findOne({where: {id: driver.userId}});
        const sourcePoint = await Point.findOne({where: {id: booking.sourcePointId}});   
        const destinationPoint = await Point.findOne({where: {id: booking.destinationPointId}});   
       // const loggedInUser = await User.findOne({where: {id: req.decode.id}});
        const vehicle = await Vehicle.findOne({where: {id: booking.vehicleId}});

        var lineFeed = '%250D%250A';

        var date = new Date(booking.pickupTime);

        var dateToPrint = ((date.getDate()+1) < 10 ? '0' : '') + (date.getDate()) + '-' +
                  ((date.getMonth()+1) < 10 ? '0' : '') + (date.getMonth()+1) + '-' + date .getFullYear();
        
        var hours = ( date.getHours() < 12 ? date.getHours() : date.getHours() - 12 );

        if( hours < 10 ){
            hours = '0'+hours;
        }

      var meridien = ( date.getHours() < 12 ? 'AM' : 'PM' );
      dateToPrint = dateToPrint + ' ' + hours + ':' + 
                  (date.getMinutes() < 10 ? '0' : '') +  (date.getMinutes()) + " " + meridien;

        var message = 'Name: ' + booking.nameBookedFor + lineFeed;
        
        message = message + 'Pick-up Time: ' + dateToPrint + lineFeed;
        message = message + 'From: ' + sourcePoint.name + lineFeed;
        message = message + 'To: ' + destinationPoint.name + lineFeed;
        message = message + 'Bus No.: ' + vehicle.title + lineFeed;
        message = message + 'Driver name: ' + driverDetails.name + lineFeed;
        message = message + 'Mobile No.: ' + driverDetails.mobile + lineFeed;
        message = message + 'Fare paid: ' + booking.price + lineFeed;
        message = message + 'Tracking Link: --' + lineFeed;
        message = message + 'Helpline No.: 9319451172' + lineFeed;
        message = message + 'Booked From: ' + "Sebastian" + lineFeed;
        
      await sendSms(message, booking.mobileBookedFor )



      } else {
        paymentStatus = BookingStatus.failed;
        rideStatus = RideStatus.notBooked;
      }

      const booking = await Booking.findOne({
        where: { orderId: parsedData.id },
      });

      await booking.update({
        status: paymentStatus,
        rideStatus: rideStatus,
      });

      if (!parsedData.success) {
        return;
      }

      const tripBooking = await TripBooking.findOne({
        where: { id: booking.tripBookingId },
      });

      var seat = tripBooking.currentBooked + booking.seatsBooked;

      var oldBooking;
      if (booking.upgradeFromId) {
        oldBooking = await Booking.findOne({
          where: { id: booking.upgradeFromId },
        });
        if (
          oldBooking &&
          !oldBooking.isUpdated &&
          oldBooking.upgradeToId == null
        ) {
          seat =
            tripBooking.currentBooked +
            booking.seatsBooked -
            oldBooking.seatsBooked;
        }
      }

      if (tripBooking.maxSeat >= seat) {
        //now booking can be succeed

        //if user Pass then update seats consumed
        if (booking.isPass && booking.userPassId != null) {
          const userPass = await UserPass.findOne({
            where: { id: booking.userPassId },
          });

          if (
            userPass.tripConsume + booking.seatsBooked >
            userPass.tripAllowed
          ) {
            //intiate refund
            await booking.update({
              status: BookingStatus.refund,
              rideStatus: RideStatus.notBooked,
            });
            return;
          }

          await userPass.update({
            tripConsume: userPass.tripConsume + booking.seatsBooked,
          });
        }

        if (booking.upgradeFromId) {
          if (
            oldBooking &&
            !oldBooking.isUpdated &&
            oldBooking.upgradeToId == null
          ) {
            await oldBooking.update({
              isUpdated: true,
              upgradeToId: booking.id,
            });
          }
        }

        // await tripBooking.update({currentBooked: seat});
        await TripBooking.update(
          { currentBooked: seat },
          { where: { id: booking.tripBookingId } }
        );

        //send notification
        const user = await User.findOne({ where: { id: booking.userId } });

        if (user.pushToken) {
          googleService.send(
            "your seat is booked successfully",
            user.pushToken
          );
        }
      } else {
        //issue refund
        await booking.update({
          status: BookingStatus.refund,
          rideStatus: RideStatus.notBooked,
        });
      }
      return;
    }
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function history(req, res, next) {
  try {
    const bookingData = await Booking.findAll({
      where: {
        userId: req.decode.id,
        status: {
          [Sequelize.Op.notIn]: [BookingStatus.pending, BookingStatus.failed],
        },
        isUpdated: false,
      },
      include: [
        { model: Point, as: "sourcePoint" },
        { model: Point, as: "destinationPoint" },
        {
          model: Vehicle,
          as: "vehicle",
          paranoid: false,
          required: false,
          attributes: ["vehicleNumber", "image"],
        },
        {
          model: Driver,
          as: "driver",
          paranoid: false,
          required: false,
          attributes: ["id"],
          include: [
            {
              model: User,
              as: "user",
              paranoid: false,
              required: false,
              attributes: ["name", "mobile", "image"],
            },
          ],
        },
      ],
      order: [["travelDate", "asc"]],
    });
    console.log("booking data", bookingData);

    return res.send(handlers.responseHandler.buildResponse(bookingData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function all(req, res, next) {
  try {
    const bookingData = await Booking.findAll({
      include: [
        { model: Point, as: "sourcePoint", attributes: ["name"] },
        { model: Point, as: "destinationPoint", attributes: ["name"] },
        { model: Trip, as: "trip", attributes: ["name"] },
      ],
      order: [["updatedAt", "desc"]],
    });
    return res.send(handlers.responseHandler.buildResponse(bookingData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function filtered(req, res, next) {
  try{
       
       
    

    console.log("",req.body)
    const bookingFilter = {
         
        
        name: req.body.name ? req.body.name : "",
        mobile: req.body.mobile ? req.body.mobile : "",
        rideStatus: req.body.rideStatus ? req.body.rideStatus : "",
        status: req.body.status ? req.body.status : "",
        sourcePoint: req.body.sourcePoint ? req.body.sourcePoint : "",
        destinationPoint: req.body.destinationPoint ? req.body.destinationPoint : "",
        orderId: req.body.orderId ? req.body.orderId : "",
        JourneyBegin: req.body.JourneyBegin ? req.body.JourneyBegin : "",
        JourneyEnd: req.body.JourneyEnd ? req.body.JourneyEnd : "",
    }
    

    let where;
    if (bookingFilter.JourneyBegin!='') {
      
      where={
        
      
        nameBookedFor : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nameBookedFor')), 'LIKE', '%' + bookingFilter.name + '%'),
        mobile : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('user.mobile')), 'LIKE', '%' + bookingFilter.mobile + '%'),
        orderId : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('orderId')), 'LIKE', '%' + bookingFilter.orderId + '%'),
        sourcePoint : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('sourcePoint.name')), 'LIKE', '%' + bookingFilter.sourcePoint + '%'),
        destinationPoint : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('destinationPoint.name')), 'LIKE', '%' + bookingFilter.destinationPoint + '%'),
        rideStatus : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('rideStatus')), 'LIKE', '%' + bookingFilter.rideStatus + '%'),
        status : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('status')), 'LIKE', '%' + bookingFilter.status + '%'),
        pickupTime: {
        [Op.between]: [bookingFilter.JourneyBegin+" 4:40:00", bookingFilter.JourneyEnd+" 23:59:50"]
        }
   }

     
    }else{
      
      where={
        
      
        nameBookedFor : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nameBookedFor')), 'LIKE', '%' + bookingFilter.name + '%'),
        mobileBookedFor : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('user.mobile')), 'LIKE', '%' + bookingFilter.mobile + '%'),
        orderId : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('orderId')), 'LIKE', '%' + bookingFilter.orderId + '%'),
        sourcePoint : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('sourcePoint.name')), 'LIKE', '%' + bookingFilter.sourcePoint + '%'),
        destinationPoint : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('destinationPoint.name')), 'LIKE', '%' + bookingFilter.destinationPoint + '%'),
        rideStatus : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('rideStatus')), 'LIKE', '%' + bookingFilter.rideStatus + '%'),
        status : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('status')), 'LIKE', '%' + bookingFilter.status + '%'),
        
   }
    }
     

      




      const bookingData = await Booking.findAll({
        include:[
          {model: User, as: 'user'},
          { model: Point, as: "sourcePoint", attributes: ["name"] },
          { model: Point, as: "destinationPoint", attributes: ["name"] },
          { model: Trip, as: "trip", attributes: ["name"] },
        ],
        where,
    
      })
      

    

    return res.send(handlers.responseHandler.buildResponse(bookingData));
}catch (e){
    console.log('error',e);
    next(e)
}
  

  
  
}

async function getBooking(req, res, next) {
  try {
    const bookingData = await Booking.findOne({
      where: { id: req.params.id },
      include: [
        { model: Point, as: "sourcePoint" },
        { model: Point, as: "destinationPoint" },
        {
          model: Vehicle,
          as: "vehicle",
          paranoid: false,
          required: false,
          attributes: ["vehicleNumber"],
        },
        {
          model: Driver,
          as: "driver",
          paranoid: false,
          required: false,
          attributes: ["id"],
          include: [
            {
              model: User,
              as: "user",
              paranoid: false,
              required: false,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    if (!bookingData) return next(Exception.Route.BOOKING_DATA_NOT_FOUND);

    return res.send(handlers.responseHandler.buildResponse(bookingData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

// async function mapDriverEtc(bookings){
//     const tripIds = bookings.map(booking =>{
//         return booking.tripId
//     });

//     const tripData = await Trip.findAll({
//         where:{id: tripIds},
//         include:[
//         {model: Vehicle, as:'vehicle', paranoid:false, required:false, attributes:['name'],
//         include: [{model: Driver, as: 'driver', paranoid: false, required: false, attributes:[],
//         include: [{model: User, as: 'user', paranoid: false, required: false, attributes:['name']}]
//     }]
//         }
//         ]
//     });

// }

async function recentBooking(req, res, next) {
  try {
    const bookingData = await Booking.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        { model: Point, as: "sourcePoint" },
        { model: Point, as: "destinationPoint" },
      ],
    });

    return res.send(handlers.responseHandler.buildResponse(bookingData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function calculatePrice(from, to, seatCount, tripId, date) {
  var price = await Price.findOne({
    where: {
      tripId: tripId,
      fromId: from,
      toId: to,
      date: {
        [Sequelize.Op.lte]: new Date(date),
      },
    },
    order: [["date", "desc"]],
  });

  if (!price) throw Exception.Route.BOOKING_DATA_NOT_FOUND;

  const totalPrice = price.price * seatCount;

  return totalPrice;
}

async function update(req, res, next) {
  try {
    //check if all data provided is correct,
    //check for seat
    //create order and other detail and send back
    // next();

    const booking = await Booking.findOne({
      where: {
        id: req.body.bookingId,
      },
    });

    if (!booking) return next(Exception.Route.BOOKING_DATA_NOT_FOUND);

    var tripBooking = await TripBooking.findOne({
      where: {
        id: booking.tripBookingId,
      },
    });

    if (!tripBooking || !tripBooking.isActive) {
      return next(Exception.Route.BOOKING_DATA_NOT_FOUND);
    }

    const from = req.body.from ? req.body.from : booking.sourcePoint;
    const to = req.body.to ? req.body.to : booking.destinationPoint;
    const tripId = booking.tripId;
    const seats = req.body.seatCount;

    const price = await calculatePrice(
      from,
      to,
      seats,
      tripId,
      booking.pickupTime
    );

    var priceDue = 0.0;

    if (price > booking.price) {
      priceDue = price - booking.price;
    } else {
      //as no return yet
      priceDue = 0;
    }

    if (
      booking.status == BookingStatus.pending ||
      booking.status == BookingStatus.cancel
    ) {
      priceDue = price;
    }

    let reqSeat = 0;

    if (booking.seatsBooked < req.body.seatCount) {
      //check if more seat
      if (
        tripBooking.currentBooked + req.body.seatCount - booking.seatsBooked >
        tripBooking.maxSeat
      ) {
        return next(Exception.Route.SEAT_ALLOCATED_MORE_THAN_CAPACITY);
      }

      reqSeat = req.body.seatCount - booking.seatsBooked;
    } else {
      reqSeat = req.body.seatCount - booking.seatsBooked;
    }

    var travelDate = booking.pickupTime;

    const pickupTime = await getTime(booking.tripId, req.body.from, travelDate);
    const dropTime = await getTime(booking.tripId, req.body.to, travelDate);

    var bookingData = {
      price: priceDue,
      pickupTime: pickupTime,
      seatsBooked: req.body.seatCount,
      dropTime: dropTime,
      userId: req.decode.id,
      sourcePointId: req.body.from,
      destinationPointId: req.body.to,
      tripId: booking.tripId,
      tripBookingId: booking.tripBookingId,
      isBookingForOther: booking.isBookingForOther,
      nameBookedFor: booking.nameBookedFor,
      mobileBookedFor: booking.mobileBookedFor,
      vehicleId: booking.vehicleId,
      driverId: booking.driverId,
      payMethod: paymentMethod.online,
      isOnline: true,
      isUpdated: false,
      isPass: booking.isPass,
      upgradeFromId: booking.id,
      userPassId: booking.userPassId,
    };

    const newBooking = await Booking.create(bookingData);

    if (!newBooking) return next(Exception.Route.BOOKING_DATA_NOT_FOUND);

    // await booking.update({
    //     isUpdated: true,
    //     upgradeToId: newBooking.id
    // });

    if (priceDue > 0) {
      //need to ask for more money
      //create booking table entry

      var orderId = await paymentService.createOrder({
        amount: priceDue,
        id: newBooking.id,
        payFor: payFor.booking,
      });

      await newBooking.update({ orderId: orderId.id });

      return res.send(handlers.responseHandler.buildResponse(orderId));
    } else {
      if (reqSeat < 0) {
        const booked = tripBooking.currentBooked + reqSeat;
        await TripBooking.update(
          {
            currentBooked: booked,
          },
          { where: { id: tripBooking.id } }
        );
      }

      await newBooking.update({
        status: BookingStatus.completed,
      });

      await booking.update({
        isUpdated: true,
        upgradeToId: newBooking.id,
      });

      return res.send(handlers.responseHandler.buildResponse(newBooking));
    }

    //create booking table entry
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function status(req, res, next) {
  try {
    let bookingData = await Booking.findOne({
      where: { orderId: req.body.orderId },
    });

    if (!bookingData) return next(Exception.Route.BOOKING_DATA_NOT_FOUND);

    return res.send(
      handlers.responseHandler.buildResponse({ status: bookingData.status })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function cancel(req, res, next) {
    try {

    
        let bookingData = await Booking.findOne({
            where: { id: req.body.bookingId },
        });

        let userPassData = await UserPass.findOne({
            where: { id: bookingData.userPassId },
        });
      


       
       
        if (!bookingData) return next(Exception.Route.BOOKING_DATA_NOT_FOUND);

        var tripBooking = await TripBooking.findOne({
            where: {
                id: bookingData.tripBookingId,
            },
        });

        if (!tripBooking) {
            return next(Exception.Route.BOOKING_DATA_NOT_FOUND);
        }

        var seat;
     
        if (bookingData.payMethod=="passes") {
         
            var pt = bookingData.pickupTime;
            var xd= new Date(pt.getFullYear(),pt.getMonth(),pt.getDate(),pt.getHours(),pt.getMinutes())
            xd.setHours(pt.getHours() + 1);
            var pickuptimedate = moment(xd).add(30, 'm').toDate();
            var dateNow= new Date();
            

            if (pickuptimedate>=dateNow) {
             
             
             
                var temp=userPassData.tripConsume-bookingData.seatsBooked;
                var temp2=userPassData.tripAllowed+bookingData.seatsBooked;
                
                await UserPass.update(
                    {
                        tripConsume: temp,
                        tripAllowed:temp2
                    },
                    { where: { id: bookingData.userPassId } }
                );
            
               
                
            } 
        }

                console.log("tripBooking.currentBooked",tripBooking.currentBooked)
                console.log("bookingData.seatsBooked",bookingData.seatsBooked)

            if (bookingData.status == BookingStatus.completed) {
                seat = tripBooking.currentBooked - bookingData.seatsBooked;
            } else {
               
                  seat = tripBooking.currentBooked;
            }
        
            console.log("seat",seat)
       

        
            
        await TripBooking.update(
            {
                currentBooked: seat,
            },
            { where: { id: tripBooking.id } }
        );

        await bookingData.update({
            status: BookingStatus.cancel,
            rideStatus: RideStatus.prematureCancel,
        });

        return res.send(
            
         
             handlers.responseHandler.buildResponse({ status: bookingData.status })
        );
            
        
    } catch (e) {
        console.log("error", e);
        next(e);
    }
}

async function getExcel(req, res, next) {
  try {
    
       
    
    console.log("BIASHDISAHIDSHAIDASHISHAHSIDAS",req.body)
      
      const bookingFilter = {
           
          
          name: req.body.name ? req.body.name : "",
          mobile: req.body.mobile ? req.body.mobile : "",
          rideStatus: req.body.rideStatus ? req.body.rideStatus : "",
          status: req.body.status ? req.body.status : "",
          sourcePoint: req.body.sourcePoint ? req.body.sourcePoint : "",
          destinationPoint: req.body.destinationPoint ? req.body.destinationPoint : "",
          orderId: req.body.orderId ? req.body.orderId : "",
          JourneyBegin: req.body.JourneyBegin ? req.body.JourneyBegin : "",
          JourneyEnd: req.body.JourneyEnd ? req.body.JourneyEnd : "",
      }
      
      console.log(bookingFilter)
      let where;
      if (bookingFilter.JourneyBegin!='') {
        
        where={
          
        
          nameBookedFor : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nameBookedFor')), 'LIKE', '%' + bookingFilter.name + '%'),
          mobile : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('user.mobile')), 'LIKE', '%' + bookingFilter.mobile + '%'),
          orderId : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('orderId')), 'LIKE', '%' + bookingFilter.orderId + '%'),
          sourcePoint : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('sourcePoint.name')), 'LIKE', '%' + bookingFilter.sourcePoint + '%'),
          destinationPoint : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('destinationPoint.name')), 'LIKE', '%' + bookingFilter.destinationPoint + '%'),
          rideStatus : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('rideStatus')), 'LIKE', '%' + bookingFilter.rideStatus + '%'),
          status : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('status')), 'LIKE', '%' + bookingFilter.status + '%'),
          pickupTime: {
          [Op.between]: [bookingFilter.JourneyBegin+" 4:40:00", bookingFilter.JourneyEnd+" 23:59:50"]
          }
     }
  
       
      }else{
        
        where={
          
        
          nameBookedFor : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nameBookedFor')), 'LIKE', '%' + bookingFilter.name + '%'),
          mobileBookedFor : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('user.mobile')), 'LIKE', '%' + bookingFilter.mobile + '%'),
          orderId : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('orderId')), 'LIKE', '%' + bookingFilter.orderId + '%'),
          sourcePoint : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('sourcePoint.name')), 'LIKE', '%' + bookingFilter.sourcePoint + '%'),
          destinationPoint : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('destinationPoint.name')), 'LIKE', '%' + bookingFilter.destinationPoint + '%'),
          rideStatus : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('rideStatus')), 'LIKE', '%' + bookingFilter.rideStatus + '%'),
          status : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('status')), 'LIKE', '%' + bookingFilter.status + '%'),
          
     }
      }
       
    
    
  /*  
    const bookingData = await Booking.findAll({
     /* attributes: {
        exclude: [
          "id",
          "tripBookingId",
          "userId",
          "driverId",
          "vehicleId",
          "sourcePointId",
          "destinationPointId",
          "tripId",
        ],
      },
      */
     /*
      include: [
        { model: Point, as: "sourcePoint", attributes: ["name"] },
        { model: Point, as: "destinationPoint", attributes: ["name"] },
        { model: Trip, as: "trip", attributes: ["name"] },
        { model: User, as: "user", attributes: ["name", "email", "mobile"] },
        {
          model: Vehicle,
          as: "vehicle",
          required: false,
          attributes: ["vehicleNumber"],
        },
        {
          model: Driver,
          as: "driver",
          paranoid: false,
          required: false,
          attributes: [],
          include: [
            { model: User, as: "user", required: false, attributes: ["name"] },
          ],
        },
      ],
      where,
      raw: true,
    });
*/

    const bookingData = await Booking.findAll({
      include:[
        {model: User, as: 'user'},
        { model: Point, as: "sourcePoint", attributes: ["name"] },
        { model: Point, as: "destinationPoint", attributes: ["name"] },
        { model: Trip, as: "trip", attributes: ["name"] },
      ],
      where,
  
    })
   
    console.log("stringyfy", JSON.stringify(bookingData));

    var jsonStr = JSON.stringify(bookingData)
      .replace(/user.name/g, "user_name")
      .replace(/user.email/g, "user_email")
      .replace(/user.mobile/g, "user_mobile")
      .replace(/vehicle.vehicleNumber/g, "vehicleNumber")
      .replace(/driver.user.name/g, "driver_name")
      .replace(/sourcePoint.name/g, "from")
      .replace(/destinationPoint.name/g, "to")
      .replace(/trip.name/g, "journey");

    console.log("json data", jsonStr);

    const jsonData = JSON.parse(jsonStr);

    // console.log(JSON.stringify(jsonData));

    res.xls("data.xlsx", jsonData);
    // res.send(bookingData);
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function monthlyBooking(req, res, next) {
  try {
    const bookingData = await Booking.findAll();

    const jsonData = JSON.parse(JSON.stringify(bookingData));

    res.xls("data.xlsx", jsonData);
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function createOrderFromPass(req,res,next){

    try{
        //check if all data provided is correct,
        //check for seat
        //create order and other detail and send back

        const trip = await Trip.findOne({where:{id: req.body.tripId}});

            if (!trip) return next(Exception.Route.TRIP_NOT_FOUND);


        var vehicleId = trip.vehicleId;
        var driverId = "";
        if (trip.vehicleId){
            const vehicle = await Vehicle.findOne({where: {id: trip.vehicleId}});
            driverId = vehicle.driverId;
        }

        const price = await calculatePrice(req.body.from, req.body.to, req.body.seatCount, req.body.tripId, req.body.travelDate);

        //check for pass
        const userPass = await UserPass.findOne({where: {id: req.body.id}});
	console.log(userPass);
        if(!userPass) return next(Exception.Pass.NO_PASS_FOUND);

        if (!userPass.isActive){
        //    return next(Exception.Pass.INVALID_PASS);
        }


        //check for date
        if ((new Date(userPass.validUpto)).getTime() < new Date(req.body.travelDate).getTime()){
            await userPass.update({isActive: false});
            return next(Exception.Pass.TRAVEL_DATE_NOT_ALLOWED_IN_PASS);
        }

        //check for seats
        if (req.body.seatCount >  userPass.tripAllowed){
            return next(Exception.Pass.INSUFFICIENT_TRIP_IN_PASS);
        }


        //check for allowed points for pass

        if (!userPass.isForAllPoint){
            const points = JSON.parse(userPass.points);
            
            if (!points.includes(req.body.from) || !points.includes(req.body.to)){
                return next(Exception.Pass.TRAVEL_NOT_ALLOWED_FOR_POINTS_IN_PASS);
            }
            
        }

                //if trip allowed for this
        if (!userPass.isForAllJourney){
            const trips = JSON.parse(userPass.trips);

            if (!trips.includes(req.body.tripId)){
                return next(Exception.Pass.PASS_NOT_ALLOWED_FOR_THIS_ROUTE);
            }
        }
        

        //check if parent pass valid or not
        const parentPass = await Pass.findOne({where:{id: userPass.passId}});

        //if (!parentPass || !parentPass.isActive) return next(Exception.Pass.INVALID_PASS);


    
        const perRidePrice = (price / req.body.seatCount);
        var perRideDiscount = perRidePrice * (userPass.maxDiscPerRidePercentage / 100);
        perRideDiscount = Math.min(perRideDiscount, userPass.maxDiscPerRide);

        const finalPrice = price - (req.body.seatCount * perRideDiscount);

        //check trip booking for seat data
        var tripBooking = await TripBooking.findOne({where:{
            tripId: req.body.tripId,
            date: req.body.travelDate
        }});

        if(!tripBooking) {
            //create a trip booking

            const data = {
                maxSeat: trip.maxSeat,
                date: req.body.travelDate,
                isActive: true,
                tripId: req.body.tripId
            }

            tripBooking = await TripBooking.create(data);

            if (!tripBooking){
                return next(Exception.Route.BOOKING_DATA_NOT_FOUND);       
            }
        }

        if (!tripBooking.isActive){
            return next(Exception.Route.BOOKING_NOT_ALLOWED);
        }

        if (tripBooking.maxSeat <= tripBooking.currentBooked){
            return next(Exception.Route.ALL_SEATS_BOOKED);
        }

        if (tripBooking.maxSeat < tripBooking.currentBooked + req.body.seatCount){
            return next(Exception.Route.SEAT_ALLOCATED_MORE_THAN_CAPACITY);
        }

        const tripBookingData = tripBooking;

        const seat = tripBookingData.currentBooked + req.body.seatCount;

        if (tripBookingData.maxSeat > seat){
            await tripBookingData.update({currentBooked: seat});
        }else{
            return next(Exception.Route.SEAT_ALLOCATED_MORE_THAN_CAPACITY);
        }

        const tripConsumed = userPass.tripConsume + req.body.seatCount;
        const pendeingTrips = userPass.tripAllowed - req.body.seatCount;
        const pickupTime = await getTime(trip.id, req.body.from, req.body.travelDate);
        const dropTime = await getTime(trip.id, req.body.to, req.body.travelDate);

        //create booking table entry
        var bookingData = {
            price: price,
            seatsBooked: req.body.seatCount,
            pickupTime:pickupTime,
            dropTime: dropTime,
            userId: req.decode.id,
            sourcePointId : req.body.from,
            destinationPointId: req.body.to,
            tripId: req.body.tripId,
            tripBookingId: tripBooking.id,
            isBookingForOther: req.body.isBookingForOther,
            nameBookedFor: req.body.nameBookedFor,
            mobileBookedFor: req.body.mobileBookedFor,
            vehicleId: vehicleId,
            driverId: driverId,
            payMethod: paymentMethod.pass,
            travelDate: req.body.travelDate,
            isOnline:false,
            isAdmin: false,
            isPass:true,
            userPassId: userPass.id,
            orderId: 'Pass_'+userPass.id,
            status: 'booked',
        }

        bookingData = removeEmpty(bookingData);

        const booking = await Booking.create(bookingData);

        //if (finalPrice > 0){
            //ask for payment
          //  var orderId = await paymentService.createOrder({
          //      amount: finalPrice,
          //      id: booking.id,
          //      payFor: payFor.booking
          //  });
    
          //  await booking.update(
          //          { orderId: orderId.id,
          //        isOnline: true
          //      }
          //  );
    
        //return res.send(handlers.responseHandler.buildResponse(orderId));

      //  }else{

            await userPass.update({
                tripConsume: tripConsumed,
                tripAllowed: pendeingTrips,
		isActive: pendeingTrips==0?0:1
            });
            
	    console.log(pendeingTrips);
	    console.log(tripConsumed);

            //just create seat
            await booking.update({
                status: BookingStatus.completed,
                rideStatus: RideStatus.pending 
            });

            return res.send(handlers.responseHandler.buildResponse(booking));
       // } 

    }catch (e){
        console.log('error',e);
        next(e)    }
}

async function generateInvoice(req, res, next) {
  try {
   /*
    const booking = await Booking.findOne({
      where: {
        id: req.body.bookingId,
      },
    });
    
    if (!booking) return next(Exception.Route.BOOKING_DATA_NOT_FOUND);

    if (booking.status != BookingStatus.completed)
      return next(Exception.Route.BOOKING_NOT_COMPLETED);

    if (booking.rideStatus != RideStatus.departed)
      return next(Exception.Route.BOOKING_NOT_COMPLETED);
    */
    //generate pdf

    // res.xls('data.xlsx', jsonData);
    console.log(req.body)
    pdf.create(pdfTemplate(req.body), {}).toFile(`${__dirname}/pdfs/result.pdf`, (err) => {
      if(err) {
          res.send("0");
          console.log("ERRORsdad")
      }
      console.log("AOSDSAJIDHAJKS")
      res.send("1");
  });
    
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function getInvoice(req, res, next) {
  try {
   
    res.sendFile(`${__dirname}/pdfs/result.pdf`)
    
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}
async function sendSms( message, mobileNumber ){
    console.log('Sending sms to ' + mobileNumber);
    https.get('http://smsplanet.co.in/api/pushsms?user=Aviana&authkey=92bdAXELXtWnA&sender=TONFRO&mobile=' 
            + mobileNumber + '&text='+ message + '&rpt=1', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
    data += chunk;
    });

    resp.on('end', () => {
       console.log(JSON.parse(data));
    });
   }).on("error", (err) => {
        console.log("Error: " + err.message);
   });
}

async function getRoutePriceSeat(req, res, next) {
  try {
    
   
    const trip = await Trip.findOne({ where: { id: req.body.tripId } });

    if (!trip) return next(Exception.Route.TRIP_NOT_FOUND);

   var tripBooking = await TripBooking.findOne({
    where: {
      date: req.body.travelDate,
      tripId: req.body.tripId,
    },
  });

  if (!tripBooking) {
    //create a trip booking
    const data = {
      maxSeat: trip.maxSeat,
      date: req.body.travelDate,
      isActive: true,
      tripId: req.body.tripId,
    };

    tripBooking = await TripBooking.create(data);
    console.log("find me in da club",tripBooking)
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



    //const seatsavailable=trip.maxSeat-tripBooking.currentBooked;
    const price = await calculatePrice(
      req.body.from,
      req.body.to,
      req.body.seatCount,
      req.body.tripId,
      req.body.travelDate
    );

    const pickupTime = await getTime(
      trip.id,
      req.body.from,
      req.body.travelDate
    );
    

      console.log("price",price)
      console.log("pickuptime",pickupTime)
      console.log("seats ",seatRemaining)

      const response={
        price:price,
        pickupTime:pickupTime,
       seatsavailable:seatRemaining
      }

      return res.send(handlers.responseHandler.buildResponse(response));
    
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function getBookingwithorder(req, res, next) {
  try {
   
    const bookingData = await Booking.findOne({
      include: [
        { model: Point, as: "sourcePoint", attributes: ["name"] },
        { model: Point, as: "destinationPoint", attributes: ["name"] },
        { model: Trip, as: "trip", attributes: ["name"] },
      ],
      where: { orderId: req.body.orderId },
    });

    if (!bookingData) return next(Exception.Route.BOOKING_DATA_NOT_FOUND);

    return res.send(
      handlers.responseHandler.buildResponse({ bookingData })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}




module.exports = {
 
  createOrder,
  recievePayment,
  history,
  update,
  status,
  cancel,
  getBooking,
  all,
  filtered,
  recentBooking,
  getExcel,
  monthlyBooking,
  createOrderFromPass,
  generateInvoice,
  getInvoice,
  sendBookingSMS,
  getRoutePriceSeat,
  getBookingwithorder
  
};
