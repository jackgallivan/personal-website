/**
 * Title: A6 javascript
 * Author: Jack Gallivan
 * Class: CS 290    Section: 400
 * Description: A6 server
 */

const express = require('express')

const app = express()

const handlebars = require('express-handlebars').create({ defaultLayout: 'main' })

app.use(express.static('public'))
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('port', 3000)

// Routes go here

app.use(function (req, res) {
  res.status(404)
  res.render('404')
})

app.use(function (err, req, res, next) {
  if (err.statusCode) {
    console.error('Request response: ' + err.statusCode)
  } else {
    console.error(err.stack)
  }
  res.status(500)
  res.render('500')
})

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.')
})
