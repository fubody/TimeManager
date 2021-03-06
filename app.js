var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port);

console.log('time_manager')

app.get('/', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err)
        }

        res.render('index', {
            title: 'imooc 首页',
            movies: movies
        })
    })
    res.render('index', {
        title: 'time manager 首页',
        movies: [{
            title: '机械战警',
            _id: 1,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        }]
    })
})

app.get('/movie/:id', function(req, res) {
    var id = req.params.id

    Movie.findById(id, function(err, movie) {
        res.render('detail', {
            title: 'imooc ' + movie.title,
            movie: movie
        })
    })
    res.render('detail', {
        title: 'time manage 详情页',
        movie: {
            director: '何塞·帕蒂利亚',
            country: '美国',
            title: '机械战警',
            year: 2014,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
            language: '英语',
            flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
            summary: '这是一部很牛逼的电影'
        }
    })
})

app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: 'time manager 后台录入页',
        movie: {
            director: '',
            country: '',
            title: '',
            year: '',
            poster: '',
            language: '',
            flash: '',
            summary: ''
        }
    })
})

//admin update movie
app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id
    
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: 'imooc 后台更新页',
                movie: movie
            })
        })
    }
})

// admin post movie
app.post('/admin/movie/new', function(res, req) {
    var id = res.body.movie._id
    var movieObj = req.body.movie
    var _movie

    if (id !== 'undefined') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err)
            }

            _movie = _.extend(movie, movieObj)
            _movie.save(function(err, movie) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/movie/' + movie._id)
            })
        })
    }
    else {
        _movie = new Movie({
            director: movieObj.director,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            introduction: movieObj.introduction,
            flash: movieObj.flash
        })

        _movie.save(function (err, movie) {
            if (err) {
                console.log(err)
            }

            res.redirect('/movie/' + movie._id)
        })
    }
})

app.get('/admin/list', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err)
        }

        res.render('index', {
            title: 'imooc 首页',
            movies: movies
        })
    })

    res.render('list', {
        title: 'time manager 列表页',
        movies: [{
            title: '机械战警',
            _id: 1,
            director: '何塞·帕蒂利亚',
            country: '美国',
            year: 2014,
            language: '英语',
            flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf'
        }]
    })
})