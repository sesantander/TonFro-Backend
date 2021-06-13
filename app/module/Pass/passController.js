const handlers = require('../../core/handlers');
const Exception = require('../../core/exceptions');
const PaymentService = require('../../services').paymentService;

const {User,Pass, PassTrip, PassPoint, Trip, Point, UserPass,Booking, Sequelize, Price} = require('../../core/db/models');
const payFor = require('../../core/constants').payFor;
const Op = Sequelize.Op;

async function 
add(req,res,next){
    
    try{
        

        var d = new Date();
        var n = d.getDate();
        var month = d.getMonth()+1;
        var year = d.getFullYear();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var numberoftrips=req.body.trips;
        var numberofzeros="";
      
        if (numberoftrips.toString().length===1) {
            numberofzeros="000";
        }
        if (numberoftrips.toString().length===2) {
            numberofzeros="00";
        }
        if (numberoftrips.toString().length===3) {
            numberofzeros="0";
        }


        var totalcode="TNFPS_"+ year+ month +n+hours+minutes+"_"+numberofzeros+numberoftrips;
        console.log(totalcode)

        const PassBody={
            code:totalcode,
            name: req.body.name,
            trips: req.body.trips,
            validity: req.body.validity,
            isActive: req.body.isActive,
            description: req.body.description,
            discPerRidePercentage: req.body.discPerRidePercentage,
            isSuspended: req.body.isSuspended,
            isDynamic: req.body.isDynamic,
            isForAllPoint: req.body.isForAllPoint,
            isForAllTrip: req.body.isForAllTrip,
            additionalBenefit: req.body.additionalBenefit
        }
         
        const pass = await Pass.create(PassBody);
        
        if  (!pass) return next(Exception.Pass.NO_PASS_FOUND);

        return res.send(handlers.responseHandler.buildResponse(pass));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function update(req,res,next){

    try{
        
        var pass = await Pass.findOne({where: {id: req.params.id}});

        if (!pass) return next(Exception.Pass.NO_PASS_FOUND);

        var pass = await pass.update(req.body);

       return res.send(handlers.responseHandler.buildResponse({"msg":"updated successfully"}));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}



async function all(req,res,next){
    
    try{
        
        var passData = await Pass.findAll();
        
        return res.send(handlers.responseHandler.buildResponse(passData));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}


// async function ride(userpassData){

//     userpassData.forEach( async function (row) {
          
//         var bookingData =  await  Booking.findOne({
//             where: { userPassId: row.id  },
//           });
          
 
//           try {
//             row["rideStatus"]=  await bookingData.rideStatus;    
//             console.log(row["name"]) 
//           } catch (error) {
//              row["rideStatus"]= await "no information"
//           }
//               console.log("ASDGASHJDGJSA",row.rideStatus)
         
//     });
//     return userpassData;
// }

async function allPurchasedPasses(req,res,next){

    try{
        
        var userpassData =  await UserPass.findAll({
            include:[
                        {model: User, as: 'user'},
                        
                    ]

        })

        
        return res.send(handlers.responseHandler.buildResponse(userpassData));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}

async function getUserPasses(req,res,next){

    try{
        
        var id = req.decode.id;
        var passData = await UserPass.findAll({where: {userId: id,
                              isActive:1},
                             
                              order: [
                                        ['isActive','desc'],
                                        ['createdAt', 'desc']
                                     ]},
                                             );
     
        return res.send(handlers.responseHandler.buildResponse(passData));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}



async function getPass(req,res,next){

    try{
        
        var passData = await Pass.findOne({where:{id: req.params.id}});

        if(!passData) return next(Exception.Pass.NO_PASS_FOUND);

        return res.send(handlers.responseHandler.buildResponse(passData));

    }catch (e){
        console.log('error',e);
        next(e)
    }

}
async function filter(req, res, next){
    
    try{

      
        const passFilter = {
            name: req.body.name ? req.body.name : "",
            trips: req.body.trips ? req.body.trips : "",
            code: req.body.code ? req.body.code : "",
            description: req.body.description ? req.body.description : "",
            validity: req.body.validity ? req.body.validity : "",
            isActive: req.body.isActive ? req.body.isActive : "",
            isSuspended: req.body.isSuspended ? req.body.isSuspended : "",
            discPerRidePercentage: req.body.discPerRidePercentage ? req.body.discPerRidePercentage : "",
            additionalBenefit: req.body.additionalBenefit ? req.body.additionalBenefit : "",
           
        }

        const passData = await Pass.findAll({where:{
            name : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + passFilter.name + '%'),
            trips : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('trips')), 'LIKE', '%' + passFilter.trips + '%'),
            validity : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('validity')), 'LIKE', '%' + passFilter.validity + '%'),
            description : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('description')), 'LIKE', '%' + passFilter.description + '%'),
            code : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('code')), 'LIKE', '%' + passFilter.code + '%'),
            isActive : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('isActive')), 'LIKE', '%' + passFilter.isActive + '%'),
            isSuspended : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('isSuspended')), 'LIKE', '%' + passFilter.isSuspended + '%'),
            discPerRidePercentage : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('discPerRidePercentage')), 'LIKE', '%' + passFilter.discPerRidePercentage + '%'),
            additionalBenefit : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('additionalBenefit')), 'LIKE', '%' + passFilter.additionalBenefit + '%'),
           
        }});

        return res.send(handlers.responseHandler.buildResponse(passData));
    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function filterPurchasedPasses(req, res, next){
    
    try{
       
        
        const passFiter = {
            validUpto: req.body.validUpto ? req.body.validUpto : "",
            description: req.body.description ? req.body.description : "",
            code: req.body.code ? req.body.code : "",
            orderId: req.body.orderId ? req.body.orderId : "",
            validity: req.body.validity ? req.body.validity : "",
            price: req.body.price ? req.body.price : "",
            tripAllowed: req.body.tripAllowed ? req.body.tripAllowed : "",
            tripConsume: req.body.tripConsume ? req.body.tripConsume : "",
            name: req.body.username ? req.body.username : "",
            email: req.body.email ? req.body.email : "",
            mobile: req.body.mobile ? req.body.mobile : "",
            gender: req.body.gender ? req.body.gender : "",
            
            orderStatus: req.body.orderStatus ? req.body.orderStatus : "",
            activateAt: req.body.activateAt ? req.body.activateAt : "",
            createdAt: req.body.createdAt ? req.body.createdAt : "",
        }
        console.log("activateAt",passFiter.activateAt)
        const passData = await UserPass.findAll({
            include:[
                {model: User, as: 'user'},
               
            ],
            where:{
            validUpto : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('validUpto')), 'LIKE', '%' + passFiter.validUpto + '%'),
            description : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('description')), 'LIKE', '%' + passFiter.description + '%'),
            orderId : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('orderId')), 'LIKE', '%' + passFiter.orderId + '%'),
            code : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('code')), 'LIKE', '%' + passFiter.code + '%'),
            validity : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('validity')), 'LIKE', '%' + passFiter.validity + '%'),
            price : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('price')), 'LIKE', '%' + passFiter.price + '%'),
            tripAllowed : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('tripAllowed')), 'LIKE', '%' + passFiter.tripAllowed + '%'),
            tripConsume : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('tripConsume')), 'LIKE', '%' + passFiter.tripConsume + '%'),
             name : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('user.name')), 'LIKE', '%' + passFiter.name + '%'),
           // email : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), 'LIKE', '%' + passFiter.email + '%'),
            mobile : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('mobile')), 'LIKE', '%' + passFiter.mobile + '%'),
            gender : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('gender')), 'LIKE', '%' + passFiter.gender + '%'),
            orderStatus : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('orderStatus')), 'LIKE', '%' + passFiter.orderStatus + '%'),
            activateAt : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('activateAt')), 'LIKE', '%' + passFiter.activateAt + '%'),
            createdAt : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('UserPass.createdAt')), 'LIKE', '%' + passFiter.createdAt + '%'),
             
        }
        
    })
        
        
        ;

        return res.send(handlers.responseHandler.buildResponse(passData));
    }catch (e){
        console.log('error',e);
        next(e)
    }
}



async function calculatePrice(from, to){

    var price  = await Price.findAll({where:{
        fromId: from,
        toId: to,
        date: {
            [Sequelize.Op.lte]: new Date()
        }
    },
    group:['tripId'],
    attributes:[[Sequelize.fn('max', Sequelize.col('price')), 'maxPrice']],
    unique: true,
    raw:true
});

        console.log(price);
        var maxPrice = 0;

        for (let pc of price){
            if (maxPrice <  pc.maxPrice){
                maxPrice = pc.maxPrice;
            }
        }

        return maxPrice;
}

async function activatePass(req,res,next){
   
    try{
        const uPass = await UserPass.findOne({
            where: {
                orderId: req.body.orderId 
            }
        });

        await uPass.update({
            isActive: 1,
            orderStatus: "completed"
        });

        return res.send(handlers.responseHandler.buildResponse({"msg":"pass activated"}));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}

async function buyPass(req,res,next){

    try{
        
        const pass = await Pass.findOne({where:{id: req.body.passId}});

        if(!pass) return next(Exception.Pass.NO_PASS_FOUND);

       
        var finalPrice = req.body.amount;
      
        

        const prevPass = await UserPass.findOne({
            where: {
                passId: pass.id 
            },
            attributes:['validUpto'],
            order:[['validUpto', 'desc']]
        });

        var validUpto;
        var activateAt;

        if( prevPass != null && (new Date(prevPass.validUpto) <= new Date())){
            var today = new Date(prevPass.validUpto);
            activateAt = today;
            today.setDate(today.getDate() + pass.validity);
            validUpto = today;
        }else{
            var today = new Date();
            today.setDate(today.getDate() + pass.validity);
            validUpto = today;
            activateAt = new Date();
        }

        var points;

        
        const data = await Point.findAll({
            where:{isActive: true},
            attributes:['name'],
            raw: true
        });
        points = JSON.stringify(data.map(point => {
            return point.name
        }));
        



        var trips;

        
        const data2 = await Trip.findAll({
            where:{isActive: true},
            attributes: ['id'],
            raw:true
        });
        trips = JSON.stringify(data2.map(trip =>{
            return trip.id
        }));

    
        var numberofzeros="";
        if (pass.id.toString().length===1) {
            numberofzeros="000";
        }
        if (pass.id.toString().length===2) {
            numberofzeros="00";
        }
        if (pass.id.toString().length===3) {
            numberofzeros="0";
        }


        var totalcode=pass.code+"_"+numberofzeros+pass.id;
        console.log(totalcode)

        const userPassData = {
            name:pass.name,
            validUpto : validUpto,
            tripAllowed: pass.trips,
            validity: pass.validity,
            description:pass.description,
            maxDiscPerRide: pass.maxDiscPerRide,
            maxDiscPerRidePercentage: pass.maxDiscPerRidePercentage,
            isForAllPoint: pass.isForAllPoint,
            isForAllJourney: pass.isForAllJourney,
            activateAt: activateAt,
            points: points,
            trips: trips,
            passId: pass.id,
            userId: req.decode.id,
            price: finalPrice,
            code:totalcode,
            pointBegin: req.body.from,
            pointEnd: req.body.to,
            isActive: 0 
        }

        const userPass = await UserPass.create(userPassData);

        if (!userPass) return next(Exception.Pass.PASS_NOT_CREATED);
        
        //create payment data
        const orderData = await PaymentService.createOrder({
            amount: finalPrice,
            id: userPass.id,
            payFor: payFor.pass,
        })

        await userPass.update({
            orderId: orderData.id
        })

        return res.send(handlers.responseHandler.buildResponse(orderData));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}





module.exports = {
 
    all,
	allPurchasedPasses,
    add,
    update,
    getPass,
    filter,
    filterPurchasedPasses,
    buyPass,
    getUserPasses,
    activatePass
} 

