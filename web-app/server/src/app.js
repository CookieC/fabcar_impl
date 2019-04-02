const express = require('express')  // a web app framework
const bodyParser = require('body-parser') //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors')      //跨域获取资源  cross origin resource sharing
const morgan = require('morgan')  //HTTP request logger middleware for node.js

var network = require('./fabric/network.js');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


app.get('/queryAllCars', (req, res) => {
  network.queryAllCars()
    .then((response) => {      
        var carsRecord = JSON.parse(response);        
        res.send(carsRecord)
      });
})

app.post('/createCar', (req, res) => { 
  network.queryAllCars()
    .then((response) => {
      var carsRecord = JSON.parse(JSON.parse(response));
      var numCars = carsRecord.length;
      var newKey = 'CAR' + numCars;           
      network.createCar(newKey, req.body.make, req.body.model, req.body.color, req.body.owner)
      .then((response) => {
        res.send(response)
      })
    })  
})

app.post('/changeCarOwner', (req, res) => {
  network.changeCarOwner(req.body.key, req.body.newOwner)
      .then((response) => {
        res.send(response)
      })
})

app.listen(process.env.PORT || 8081)