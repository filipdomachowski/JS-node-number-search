# JS-node-number-search

This is a simple example of using WebSockets to communicate beetween server and client.

On page start, server generates random number in the range from 1 to 10000, and keep it in variable. Then after pressing the button 
client side application tries to guess what number it is. Server gives one of three possible states while client sending next requests 
via WS:
- too low
- too high
- OK

client is using Binary Search to optimize search process.

---------------------------------------------------------------------------------------------
Instruction:
- npm install
- npm start

