const express = require('express');
const createError = require('http-errors');

const Model = require('../../models/building.model');
const service = require('./building.service');

exports.findAll  = (req, res, next) => {
    return service.findAll()
        .then(list => {
            res.json(list);
        }).catch(err => {
            console.error(err);
            return new createError.InternalServerError('List could not send')
        })
};


exports.update = (req, res, next) => {
    const validationErrors = new Model(req.body).validateSync();
    if (validationErrors) {
        return next(
            new createError.BadRequest("Missing field")
        );
    }

    return service.update(req.params.id, req.body)
        .then(entity => {
            res.json(entity);
        })
        .catch(err => {
            console.error(err)
            return next(new createError.InternalServerError('Could not update building'));
        });
};

exports.findOne = (req, res, next) => {
    return service.findOne(req.params.id)
        .then(entity => {
            if (!entity) {
                return next(new createError.NotFound("Building not found"));
            }
            return res.json(entity);
        });
};
