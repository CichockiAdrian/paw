const express = require('express')
const app = express()
const port =  3000
const mime = require('mime-types')
const fs = require('fs')
const path = require('path')

app.use(express.json())

app.get('/',(req,res)=>{
    res.type('text/plain; charset=utf-8')
    res.send('Strona glowna')

})

app.get('/html',(req,res)=>{
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head> 
    </head>
    <body>  
        <h1>Wewnatrz html</h1>
    </body>
    </html>
    `
    res.type('html').send(html)
})

app.get('/json', (req,res)=>{
    res.json({
        message:'Dokument json'
    })
})
app.get('/htmlfile',(req,res)=>{
    const fpath = path.join(__dirname, 'index.html')
    fs.readFile(fpath,'utf8',(err,data)=>{
        if(err){
            res.status(500).type('text/plain; charset=utf-8').send('Błąd serwera')
        }else{
            res.type('html').send(data)
        }
    })
})

app.get('/get_params',(req,res)=>{
    console.log(req.query)
    const paramsArray = Object.entries(req.query)
    const timestamp = Date.now()
    const fileName = `params_${timestamp}.json`

    fs.writeFile(fileName, JSON.stringify(paramsArray), (err)=>{})
})
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'assets', req.url);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(404).json({ error: 404 });
        } else {
            const contentType = mime.lookup(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

app.listen(port, () => {
    console.log(`Strona http://localhost:${port}`)
})