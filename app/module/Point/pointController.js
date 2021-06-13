const handlers = require("../../core/handlers");
const Exception = require("../../core/exceptions");
const { Point, PointImage } = require("../../core/db/models");
const formidable = require("formidable");
const { moveFile } = require("../../core/utility");
const { UserTypeENUM } = require("../../core/constants");

async function add(req, res, next) {
  try {
    const point = await Point.create(req.body);

    return res.send(handlers.responseHandler.buildResponse(point));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function update(req, res, next) {
  try {
    var point = await Point.findOne({ where: { id: req.body.pointId } });

    if (!point) return next(Exception.Route.POINT_NOT_FOUND);

    var pointData = await Point.update(req.body, { where: { id: point.id } });

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
    var point = await Point.findOne({ where: { id: req.body.pointId } });

    if (!point) return next(Exception.Route.POINT_NOT_FOUND);

    var pointData = await Point.update(
      {
        isActive: req.body.isActive,
      },
      { where: { id: point.id } }
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
    var options = {};

    if (req.headers["user-type"] == UserTypeENUM.user) {
      options.isActive = true;
    }

    var pointData = await Point.findAll({
      where: options,
      order: [["updatedAt", "desc"]],
    });

    return res.send(handlers.responseHandler.buildResponse(pointData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function getPoint(req, res, next) {
  try {
    var pointData = await Point.findOne({ where: { id: req.params.id } });

    if (!pointData) return next(Exception.Route.POINT_NOT_FOUND);
    return res.send(handlers.responseHandler.buildResponse(pointData));
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function deleteImages(req, res, next) {
  try {
    //neet to improve before deleting images
    var pointData = await PointImage.destroy({ where: { id: req.body.ids } });

    return res.send(
      handlers.responseHandler.buildResponse({
        msg: "image deleted successfully",
      })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function addImages(req, res, next) {
  try {
    let form = new formidable.IncomingForm();

    let parsedFields = await new Promise(async function (resolve, reject) {
      form.parse(req, async function (err, fields, fileName) {
        if (fields.pointId) {
          var point = await Point.findOne({ where: { id: fields.pointId } });

          if (!point) return next(Exception.Route.POINT_NOT_FOUND);
        } else {
          return next(Exception.Route.POINT_NOT_FOUND);
        }

        if (!fields.imageCount)
          return next(Exception.Route.INVALID_IMAGE_COUNT);

        var imageUrls = [];

        for (var i = 1; i <= fields.imageCount; i++) {
          var prop = `image${i}`;

          if (prop in fileName) {
            const url = await moveFile(fileName[prop], "point/");
            imageUrls.push(url);
          } else {
            continue;
          }
        }

        fields.images = imageUrls;

        return resolve(fields);
      });
    });

    var model = parsedFields.images.map((image) => {
      return {
        image: image,
        pointId: parsedFields.pointId,
      };
    });

    console.log("add point images", model);

    const data = await PointImage.bulkCreate(model);

    return res.send(
      handlers.responseHandler.buildResponse({
        msg: "points updated successfully",
      })
    );
  } catch (e) {
    console.log("error", e);
    next(e);
  }
}

async function getAllImages(req, res, next) {
  try {
    //neet to improve before deleting images
    var imageData = await PointImage.findAll({
      where: { pointId: req.params.pointId },
    });

    return res.send(handlers.responseHandler.buildResponse(imageData));
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
  getPoint,
  deleteImages,
  addImages,
  getAllImages,
};
