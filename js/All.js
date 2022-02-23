//
// client abfrage
//
//httpReq.setRequestHeader('Access-Control-Allow-Headers', '*');
//Access-Control-Allow-Origin:'http://localhost:8001';
//
//
//
const client = new XMLHttpRequest();var resultText = XMLHttpRequest.responseText;
    client.open('POST', 'http://localhost:8001/getData', true);
    client.responseType = 'json';
    client.send(JSON.stringify({
        value: 'Epoxy Flooring'
    }));console.log(resultText);


    





