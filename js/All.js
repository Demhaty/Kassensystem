//
// client abfrage
//
//httpReq.setRequestHeader('Access-Control-Allow-Headers', '*');
//Access-Control-Allow-Origin:'http://localhost:8001';
//
//
//
//
/*
function req_server(text) {
    return new Promise((res, rej) => {
        //var dataX = null;
        const client = new XMLHttpRequest();

        client.onload = function() {
            console.log("client.onload")
            if (client.readyState === client.DONE) {
                console.log("client.DONE")
                if (client.status === 200) {
                    console.log("status == 200")
                    console.log(client.response);
                    console.log(client.responseText);
                    var dataX = JSON.parse(client.responseText);
                    res(dataX);
                }
            }
        };

        client.open('POST', 'http://127.0.0.1:8001/setData', true);
        client.responseType = 'text';


        client.send(JSON.stringify({
            value: 'Epoxy Flooring'
        }));
    });
}



var resultText = client.responseText;

console.log(resultText);
*/