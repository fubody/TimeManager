/**
 * Created by lijie8 on 2015/1/16.
 */

var mongoose = require('mongoose')
var MovieSchema = require('../schemas/movie')

var Movie = mongoose.model(
    'Movie',
    MovieSchema
)

module.exports = Movie