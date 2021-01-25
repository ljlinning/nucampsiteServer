const express = require('express');
const cors = require('./cors');
const authenticate = ('../authenticate');
const Favorite = require('../models/favorite');
const { RequestHeaderFieldsTooLarge } = require('http-errors');
const { set } = require('mongoose');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
   Favorite.find({ user: req.user._id })
   .populate('user')
   .populate('campsites')
   .then(favorites => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(favorites);
   })
   .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
   Favorite.findOne({user: req.user._id})
   .then(favorites => {
       if (favorites) {
           req.body.forEach(favoriteInstance => {
               if (!favorite.campsites.includes(favoriteInstance._id)) {
                   favorite.campsites.push(favoriteInstance._id);
               }
           })
           favorite.save()
           .then(favorites => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json{favorites};
           })
           .catch(err => next(err));
       } else {
           Favorite.create({user: req.user._id})
           .then(favorite => {
               req.body.forEach(favoriteInstance => {
                   if (!favorite.campsites.includes(favoriteInstance._id)) {
                       favorite.campsites.push(favoriteInstance._id);
                   }
               })
               favorite.save()
               .then(favorites => {
                   res.statusCode = 200;
                   res.setHeader('Content-Type', 'application/json');
                   res.json(favorites);
               })
           })
           .catch(err => next(err));
       }
   })
   .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported!');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
   Favorite.findOneAndDelete({user: req.user._id})
   .then(favorites => {
       res.statusCode = 200;
       if (favorites) {
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
       } else {
        set.setHeader('Content-Type', 'text/plain');
        res.end('You do not have any favorites to delete');
       }
   })
   .catch(err => next(err));
});

favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors,authenticate.verifyUser, (req, res, next) => {
   
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
        .then(favorites => {
            if (favorites) {
                    if (!favorites.campsites.includes(req.params.campsiteId)) {
                        favorites.campsites.push(req.params.campsiteId);
                        favorites.save()
                            .then(favoritesResponse => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(favoritesResponse);
                        })
                        .catch(err => next(err));
                        } else {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/plain');
                            res.end;
                        }
            } else {
                res.statusCode = 200;
                res.setHeader ('Content-Type', 'text/plain');
                res.end('That campsite is already in the list of favorites!');
            }
        }
)}
) 

.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported!');
    })

.delete(cors.corsWithOptions, authenticate.verifyUser,  (req, res, next) => {
        Favorite.findOne({user: req.user._id})
        .then(favoritesIndex => {
            if (favoritesIndex) {
                if (favorites.campsites.include(req.params.campsiteId)) {
                    favorite.campsites.indexOf(req.params.campsiteId);
                    favorite.campsites.splice(req.params.campsiteId);
                }
                favoritesIndex.save()
                .then(favoriteIndex => {
                    res.statusCode = 200;
                    res.setHeader ('Content-Type', 'application/json');
                    res.json(favoritesIndex);
                })
                .catch(err => next(err));
            } else {
                if (!favorites.campsites.includes(req.params.campsiteId)) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application.json');
                res.json(favoritesIndex);
                }
                }
            })
        })
        .catch(err => next(err));
    
    
model.exports = favoriteRouter;