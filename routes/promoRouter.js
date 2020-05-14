const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get((req, res, next) => {
        Promotions.find({})
        .then((promotions) => {
            res.statusCode = 200;
            res.setHeader = 'Content-Type', 'application/json';
            res.json(promotions);
        }, (err) => next(err))
        .catch((err) => next(err));
})
    .post((req, res, next) => {
        Promotions.create(req.body)
        .then((promotion) => {
            console.log('Promotions Created');
            res.statusCode = 200;
            res.setHeader = 'Content-Type', 'application/json';
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err));
})
    .put((req, res, next) => {
        res.end("Operation not supported");
})
    .delete((req, res, next) => {
        console.log('Deleting all Promotions');
        Promotions.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader = 'Content-Type', 'application/json';
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err))
});

promoRouter.route('/:promoId')
    .get((req, res, next) => {
        Promotions.findById(req.params.promoId)
        .then((promotions) => {
            res.statusCode = 200;
            res.setHeader = 'Content-Type', 'application/json';
            res.json(promotions);
        }, (err) => next(err))
        .catch((err) => next(err));
})
    .post((req, res, next) => {
        res.end("POST operation not supported on promoId's: " + req.params.promoId);
})
    .put((req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promoId, { $set: req.body }, { new: true })
        .then((promotions) => {
            res.statusCode = 200;
            res.setHeader = 'Content-Type', 'application/json';
            res.json(promotions);
        }, (err) => next(err))
        .catch((err) => next(err));
})
    .delete((req, res, next) => {
        console.log("Deleting all Promotions");
        Promotions.findByIdAndRemove(req.params.promoId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader = 'Content-Type', 'application/json';
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err))
})

module.exports = promoRouter;