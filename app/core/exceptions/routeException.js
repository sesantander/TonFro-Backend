module.exports = {
    POINT_NOT_FOUND: {
        statusCode: 401,
        message: "point not found"
    },
    VEHICLE_NOT_FOUND:{
        statusCode: 402,
        message: "vehicle not found"
    },
    DRIVER_NOT_FOUND:{
        statusCode: 403,
        message: "driver not found"
    },
    IMAGE_NOT_FOUND:{
        statusCode: 403,
        message: "image not found"
    },
    ROUTE_NOT_FOUND:{
        statusCode: 403,
        message: "route not found"
    },
    TRIP_NOT_FOUND:{
        statusCode: 403,
        message: "trip not found"
    },
    ALL_SEATS_BOOKED:{
        statusCode: 403,
        message: "all seats are booked now"
    },
    BOOKING_DATA_NOT_FOUND:{
        statusCode: 401,
        message: "no booking data found"
    },
    BOOKING_NOT_COMPLETED:{
        statusCode: 401,
        message: "booking not completed"
    },
    PRICE_DATA_NOT_FOUND:{
        statusCode: 401,
        message: "price data not found for particular date"
    },
    BOOKING_NOT_ALLOWED:{
        statusCode: 401,
        message: "no booking allowed for this date"
    },
    SEAT_ALLOCATED_MORE_THAN_CAPACITY:{
        statusCode: 401,
        message: "trip booking seats are greater than trip max allowed seats"
    },
    UNKNOWN:{
            statusCode: 409,
            message: "Unhandeled Error Accured"
    },
    INVALID_IMAGE_COUNT:{
        statusCode: 410,
        message: "invalid image count"
    },
    TRIP_PRICE_NOT_FOUND:{
        statusCode: 410,
        message: "trip price not found"
    }
}