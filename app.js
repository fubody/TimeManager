var express = require('express')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views')
app.set('view engine', 'jade')
app.listen(port);

console.log('time_manager')

app.get('/', function(req, res) {
    res.render('pages/index', {
        title: 'time manager 首页'
    })
})

app.get('/movie/:id', function(req, res) {
    res.render('detail', {
        title: 'time manage 详情页r'
    })
})

app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: 'time manager 后台录入页'
    })
})

app.get('/admin/list', function(req, res) {
    res.render('list', {
        title: 'time manager 列表页'
    })
})