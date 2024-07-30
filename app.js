//加载必须的模块
var http = require('http')
var fs = require('fs')
var url = require('url')
var path = require('path')

//定位静态目录的位置，根据请求找出对应的文件
function staticRoot(staticPath, req, res) {
    if (path.normalize(decodeURI(pathObj.pathname)) !== decodeURI(pathArray.pathname)) {
        res.statusCode = 403;
        res.end();
        return;
    }
  var pathObj = url.parse(req.url, true)

  if (pathObj.pathname === '/') {
    pathObj.pathname += 'index.html'
  }
//读取静态目录里面的文件，然后发送出去
  var filePath = path.join(staticPath, pathObj.pathname)
  fs.readFile(filePath, 'binary', function (err, content) {
    if (err) {
      res.writeHead(404, 'Not Found')
      res.end('<h1>404 Not Found</h1>')
    } else {
      res.writeHead(200, 'Not Found')
      res.write(content, 'binary')
      res.end()
    }
  })
}

//创建服务器
var server = http.createServer(function (req, res) {
  staticRoot(path.join(__dirname, ''), req, res)
})
//监听8080端口
server.listen(9090)
console.log('http://localhost:9090')
