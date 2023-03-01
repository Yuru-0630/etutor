const http = require('http');
const fs = require('fs');
const path = require('path');
const queryString = require('querystring');
const scoreData = require('./data.json');
http.createServer((req, res)=>{

    if(req.url.startsWith('/query') && req.method == 'GET'){
        fs.readFile(path.join(__dirname, 'view', 'index.tpl'), (err, content) => {
            res.end(content)
        })
    }

    else if(req.url.startsWith('/query') && req.method == 'POST'){
        let pdata = '';

        req.on('data', (chunk) => {
            pdata += chunk;
        });

        req.on('end', ()=>{
            let obj = queryString.parse(pdata);
            let result = scoreData[obj.code];
            console.log(result);
            fs.readFile(path.join(__dirname, 'view', 'result.tpl'), (err, content) => {
                if(err){
                    res.writeHead(500, {
                        'Content-Type':'text/plain;charset=utf8'
                    });
                    res.end('伺服器錯誤')
                }

                
                content = content.toString();
                content = content.replace('$$score$$', result.score);
                content = content.replace('$$score$$', result.score);
                res.end(content)
                
            })
        })
    }
}).listen(3000,()=>{
    console.log('running...');
})
