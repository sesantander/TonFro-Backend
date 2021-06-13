const handlers = require('../../core/handlers');
const Exception = require('../../core/exceptions');
// const Route = require('../../core/models/dataModels/route/routeModel');
// const RouteInfo = require('../../core/models/dataModels/route/routeInfoModel');
// const Point = require('../../core/models/dataModels/route/pointModel');
// const Price = require('../../core/models/dataModels/journey/priceModel');
const {Price, Point, RouteInfo, Route} = require('../../core/db/models');
const Sequelize = require('sequelize');

async function add(req,res,next){

    try{

        const route = await Route.create(req.body);
        
       return res.send(handlers.responseHandler.buildResponse(route));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function update(req,res,next){

    try{
        
        var route = await Route.findOne({where: {id: req.body.routeId}});

        if (!route) return next(Exception.Route.ROUTE_NOT_FOUND);

        var routeData = await route.update(req.body);

       return res.send(handlers.responseHandler.buildResponse({"msg":"updated successfully"}));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function activate(req,res,next){

    try{
        var route = await Route.findOne({where: {id: req.body.routeId}});

        if (!route) return next(Exception.Route.DRIVER_NOT_FOUND);

        var routeData = await route.update({
            isActive: req.body.isActive
        });

        return res.send(handlers.responseHandler.buildResponse({isActive: req.body.isActive}));

    }catch (e){
        console.log('error',e);
        next(e)
    }

}



async function all(req,res,next){

    try{
        
        var routes = await Route.findAll({
            order:[['updatedAt','desc']]
        });

        return res.send(handlers.responseHandler.buildResponse(routes));

    }catch (e){
        console.log('error',e);
        next(e)
    }

}

async function getRoute(req,res,next){

    try{
        
        
        var route = await Route.findOne({where: {id: req.params.id}});

        if (!route) return next(Exception.Route.ROUTE_NOT_FOUND);

        return res.send(handlers.responseHandler.buildResponse(route));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function filtered(req,res,next){

    try{

        var routeData = await RouteInfo.findAll({
            where: Sequelize.or(
            {pointId: req.body.startingPointId},
            {pointId: req.body.endPointId}
        ),
        include: {model: Route, as: 'route', paranoid: false, required: false}
        ,
        attributes: ['routeId'],
        group: ['routeId']
    })

        var routeIds = routeData.map(data => data.routeId);

        var routes = await Route.findAll({where: {id: {[Sequelize.Op.in]: routeIds}}});

        return res.send(handlers.responseHandler.buildResponse(routes));

    }catch (e){
        console.log('error',e);
        next(e)
    }

}

async function getPoints(req,res,next){

    try{
        
        // var route = await Route.find({where:{id: req.body.routeId}});

        var routeData = await RouteInfo.findAll({
            include:[
                {model: Point, as: 'point', paranoid: true, required: true}
            ],
            where:{
                routeId: req.body.routeId
            },
            order:[
                ['routeIndex', 'asc']
            ]
        });

        return res.send(handlers.responseHandler.buildResponse(routeData));

    }catch (e){
        console.log('error',e);
        next(e)
    }

}

async function updatePoints(req,res,next){

    try{
        
        var route = await Route.findOne({where:{id: req.body.routeId}});

        if(!route) return next(Exception.Route.ROUTE_NOT_FOUND);

        var points = req.body.points;
        var updatedPoints = points.map(function(data, index){
            data.routeIndex = index;
            data.routeId = route.id;
            return data;
        });

        await RouteInfo.destroy({where: {routeId: route.id}});

        await RouteInfo.bulkCreate(updatedPoints);

        return res.send(handlers.responseHandler.buildResponse({"msg":"route updated successfully"}));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function addPrice(req,res,next){

    try{
        
        var price = await Price.create(req.body);

        if(!price) return next(Exception.Route.ROUTE_NOT_FOUND);
        
        return res.send(handlers.responseHandler.buildResponse({"msg":"route updated successfully"}));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function allPrices(req,res,next){

    try{
        
        var priceData = await Price.findAll({
            where: {routeId: req.body.routeId},
            include: [{model: Point, as: 'from', paranoid: false, required: false},
            {model: Point, as: 'to', paranoid: false, required: false}
                        ]
    })
        return res.send(handlers.responseHandler.buildResponse(priceData));
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
    filtered,
    getPoints,
    updatePoints,
    addPrice,
    allPrices,
    getRoute
} 

