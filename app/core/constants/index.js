module.exports = {
    port : (process.env.PORT || 4000),
    path : {
        user:"/api/v1/user",
        point:"/api/v1/point",
        driver: "/api/v1/driver",
        vehicle: "/api/v1/vehicle",
        route: "/api/v1/route",
        trip: "/api/v1/trip",
        booking: "/api/v1/booking",
        pass: "/api/v1/pass",
        tripBooking: "/api/v1/trip/booking"
    },
    whitelist:[
        "/api/v1/user/login",
        "/api/v1/user/login/fb",
        "/api/v1/user/login/google",
        "/api/v1/user/signup",
        "/api/v1/user/signup/fb",
        "/api/v1/user/signup/google",
        "/api/v1/user/resetPassword",
        "/api/v1/user/exist",
        "/api/v1/booking/recieve",
        "/api/v1/user/otpLogin"
    ],
    payFor:{
        pass:"passes",
        wallet: "wallet",
        booking: "booking"
    },
    paymentMethod:{
        pass:"passes",
        wallet: "wallet",
        online: "online"
    },
    BookingStatus: {
        pending: "pending",
        completed: "booked",
        cancel: "canceled",
        failed: "failed",
        refund:"refund"
    },
    PaymentStatus:{
        pending: "pending",
        cancel: "cancel",
        failed: "failed",
        completed: "completed",
        refundInitiated: "refundInitiated",
        refund:"refund"
    },
    RideStatus: {
        notBooked:"notBooked",
        pending: "pending",
        prematureCancel: "canceled",
        arrived: "arrived",
        notArrived: "notArrived",
        departed: "departed",
    },
    UserTypeENUM:{
        admin: "admin",
        user: "user",
        driver: "driver",
        superadmin:"superadmin"
    },
    Gender:{
        male: "male",
        female:"female"
    },
    Shift:{
        morning:"Morning",
        evening: "Evening"
    },
    VehicleServiceType :{
        daily:"daily"
    },
    PassStatus:{
        active: "Active",
        deActive: "Deactive",
        suspended: "Suspended"
    }
}