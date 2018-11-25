var app = require('express')()
var express = require('express')
var http = require('http').Server(app)
var io = require('socket.io')(http)
var result = null;
var counter = 0
var from = 1
var to = 1000000

app.use(express.static(__dirname + '/')) //odwołanie do katalogu pliku

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
    console.log('webSocket server has been established')
    var number = Math.floor(Math.random() * to) + from
    console.log('Server: ', number)

    socket.on('selected number', function(incNumber){                
        counter++
        if(incNumber < number){
            result = 'too low'           
        }else if(incNumber > number){
            result = 'too high'            
        }else if(incNumber == number){
            console.timeEnd('Time: ')
            console.log('attempts: ', counter)
            result = 'OK'            
            counter = 0
        }
        io.emit('result', result)
    })

    socket.on('new number', function(){
        number = Math.floor(Math.random() * to) + from
        console.log('New number: ', number)
    })

    socket.on('timer', function(){
        console.time('Time: ')
    })

    socket.on('disconnect', function(){
        console.log('WS connection closed')
    })
})

http.listen(8000, function(){
    console.log("server is listening on 8000")
})