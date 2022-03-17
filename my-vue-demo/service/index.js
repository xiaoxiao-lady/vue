var express = require('express');  
var app = express();  
const hostname = 'localhost';
const port = 8080;

//Express 提供了内置的中间件 express.static 来设置静态文件
app.use(express.static('/my-vue-demo/index.js'));

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
