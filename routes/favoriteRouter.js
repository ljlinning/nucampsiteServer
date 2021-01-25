const express = require('express');
const favoriteRouter = express.Router();
const authenticate = require('../authenticate');
const Favorite = require('../models/favorite');
const cors = require('./cors');

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
   .then(favorite => {
       if (favorite) {
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
                Favorite.create({ user: req.user._id, campsites: [req.params.campsiteId] })
                .then(favorite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
                .catch(err => next(err));            }
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
                    const index = favoritesIndex.campsites.indexOf(req.params.campsiteId);
                    if (index >= 0) {
                        favoritesIndex.campsites.splice(index, 1);
                    }
                favoritesIndex.save()
                .then(favoriteIndex => {
                    res.statusCode = 200;
                    res.setHeader ('Content-Type', 'application/json');
                    res.json(favoritesIndex);
                })
                .catch(err => next(err));
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application.json');
                res.json(favoritesIndex);
                }
            }) .catch(err => next(err));
        });
    
module.exports = favoriteRouter;