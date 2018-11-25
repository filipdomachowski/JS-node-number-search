var socket;
var number;
var from = 1;
var to = 1000000;
var lastLowest = from;
var lastHighest = to;
var inter;
var resultTable = [];

socket = io();  

function sendNumber(){    
    socket.emit('selected number', number);
}

function generateNewNumber(){
    cleanTable();
    lastLowest = from;
    lastHighest = to;
    socket.emit('new number', null);
}

function changeNumber(msg){
    resultTable.push({state: msg, number: number});
    appendTableRow(JSON.stringify(resultTable[resultTable.length -1].number) + ": " + JSON.stringify(resultTable[resultTable.length -1].state)); 
    if(msg === 'too low'){
        lastLowest = number +1;
        number = Math.floor(Math.random() * (lastHighest - lastLowest) + lastLowest);  
    }else if(msg === 'too high'){
        lastHighest = number -1;
        number = Math.floor(Math.random() * (lastHighest - lastLowest) + lastLowest);   
    }else if(msg === 'OK'){
        clearInterval(inter);                
        appendTableRow('Finished with ' + JSON.stringify(resultTable.length -1) + ' attempts');
    }    
}

function binarySearchNumber(msg){
    resultTable.push({state: msg, number: number});
    appendTableRow(JSON.stringify(resultTable[resultTable.length -1].number) + ": " + JSON.stringify(resultTable[resultTable.length -1].state)); 
    if(msg === 'too low'){
        lastLowest = number +1;
        number = Math.floor((lastLowest + lastHighest)/2);
    }else if(msg === 'too high'){
        lastHighest = number -1;
        number = Math.floor((lastLowest + lastHighest)/2);
    }else if(msg === 'OK'){
        clearInterval(inter);                
        appendTableRow('Finished with ' + JSON.stringify(resultTable.length -1) + ' attempts');              
    }      
}

socket.on('result', function(msg){    
    // changeNumber(msg)
    binarySearchNumber(msg);
})

function showResultTable(){
    console.log(resultTable);
}

function clicked(){    
    resultTable = []    
    number = Math.floor((lastHighest + lastLowest)/2);
    // number = Math.round((Math.random() * (10000 - 1) + 1)*1/1);
    resultTable.push({state: 'start', number: number});     
    inter = setInterval(sendNumber, 50);
    socket.emit('timer');
}

function appendTableRow(elementText){            
    var node = document.createElement('LI');
    var textnode = document.createTextNode(elementText);
    node.appendChild(textnode);
    document.getElementById('list').appendChild(node);
}

function cleanTable(){
    var element = document.getElementsByTagName("li");
    var index;

    for (index = element.length - 1; index >= 0; index--) {
        element[index].parentNode.removeChild(element[index]);
    }
}
