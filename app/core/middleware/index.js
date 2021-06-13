const logger = require('../loggers/morgan');
const express = require('./express');
const security = require('./security');

module.exports = {
    logger,
    express,
    security
}