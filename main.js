/**
 * Title: Project server
 * Author: Jack Gallivan
 * Class: CS 290    Section: 400
 * Description: Project website server
 */

const express = require('express')

const app = express()

const handlebars = require('express-handlebars').create({ defaultLayout: 'main' })

app.use(express.static('public'))
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('port', process.argv[2])

// Home page
app.get('/', function (req, res, next) {
  res.render('home')
})

// Blog page
app.get('/blog', function (req, res, next) {
  res.render('blog')
})

// About page
app.get('/about', function (req, res, next) {
  res.render('about')
})

// Links page
app.get('/links', function (req, res, next) {
  res.render('links')
})

// 404 page
app.use(function (req, res) {
  res.status(404)
  res.render('404')
})

// 500 page
app.use(function (err, req, res, next) {
  if (err.statusCode) {
    console.error('Request response: ' + err.statusCode)
  } else {
    console.error(err.stack)
  }
  res.status(500)
  res.render('500')
})

// Start server
app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.')
})
