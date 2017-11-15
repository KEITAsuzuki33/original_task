var db_host = '127.0.0.1';
var db_user = 'root';
var db_pw   = '';
var db_name = 'test';

var mysql         = require('mysql');
var mysql_options = {
   host: db_host,
   user: db_user,
   password: db_pw,
   database: db_name
}
var my_client = mysql.createConnection(mysql_options);
my_client.connect();

var ejs         = require('ejs')
var fs          = require("fs")
var http        = require('http');
var server      = http.createServer();
var settings    = require('./settings');
var querystring = require('querystring')
var sessionids  = {}

server.on('request', function(req, res) {
    switch (req.url) {
        case '/register':
            var display = fs.readFile("./views/register.html","utf-8", doRead)
        break;

        case '/register/done':

            var data = ''
                req.on('readable', function() {
                data += req.read()||"";
            })

            req.on('end', function() {
                var body          = querystring.parse(data);
                var name          = body.name
                var email         = body.email
                var password      = body.password
                var sql_statement = 'insert into user (name, email, password) values ("'+ name +'", '+'"'+ email +'", '+'"'+  password +'")'

                if (email != "" && password != "" && name != "") {
                    my_client.query(sql_statement, function(err, rows){
                    res.setHeader("Location", "http://127.0.0.1:1337/login")
                    res.statusCode = 302
                    res.end();
                    })
                }else{
                    res.setHeader("Location", "http://127.0.0.1:1337/register")
                    res.statusCode = 302
                    res.end()
                }
             })
        break

        case '/login':
           var display = fs.readFile("./views/login.html","utf-8", doRead)
        break;

        case '/login/done':
            var data = ''
            req.on('readable', function(){
                data += req.read()||"";
            })

            req.on('end', function() {
                var sessionid     = ""
                var body          = querystring.parse(data);
                var email         = body.email
                var password      = body.password
                var sql_statement = 'SELECT * FROM user WHERE email = "' + email + '" AND password = "' + password + '"'
                my_client.query(sql_statement, function(err, rows){
                    if (rows != 0) {
                        var vol       = 8
                        var words     = "abcdefghijklmnopqrstuvwxyz0123456789"
                        var length    = words.length
                        for(var i=0; i<vol; i++){
                            sessionid += words[Math.floor(Math.random()*length)]
                        }
                        sessionids[sessionid] = "true"

                        res.setHeader("Content-Type", "text/plain")
                        res.setHeader('Set-Cookie',['sessionid='+ sessionid]+';path=/')

                        res.setHeader("Location", "http://127.0.0.1:1337/time_line")
                        res.statusCode = 302
                        res.end()
                    }
                    else {
                        res.setHeader("Location", "http://127.0.0.1:1337/register")
                        res.statusCode = 302
                        res.end()
                    }
                })
            })

        break


        case '/time_line':
        console.log(1)
        var hello = fs.readFileSync("hello.ejs","utf-8", doRead)
            console.log(2)

        function doRequest(req, res) {
            ejs.render(hello, {
                title:"ほげ",
                content:"ああああああ",
            })
        }

        doRequest()
            res.writeHead(200, {'Content-Type': 'text/html'});
            //res.write(hello2);
            res.end();
        break

        case '/tweet_post':

            var cookie      = req.headers.cookie
            var splitCookie = cookie.split(";")
            var cookieArray = {}

            for (i = 0; i < splitCookie.length; i++) {
                splitCookie[i] = splitCookie[i].trim()
                var element = splitCookie[i].split("=")
                cookieArray[element[0]] = element[1]
            }

            if (cookieArray.sessionid in sessionids) {
                var display = fs.readFile("./views/tweet_post.html","utf-8", doRead)
            }else{
                res.setHeader("Location", "http://127.0.0.1:1337/login")
                res.statusCode = 302
                res.end()
            }
        break

        case '/tweet_post/complete':

            var cookie      = req.headers.cookie
            var splitCookie = cookie.split(";")
            var cookieArray = {}

            for (i = 0; i < splitCookie.length; i++) {
                splitCookie[i] = splitCookie[i].trim()
                var element = splitCookie[i].split("=")
                cookieArray[element[0]] = element[1]
            }

            if (cookieArray.sessionid in sessionids) {
                var data = ''
                    req.on('readable', function(){
                    data += req.read()||"";
                })
                req.on('end', function(){
                    console.log(data)
                    var body  = querystring.parse(data)
                    var tweet = body.tweet
                    var sql_statement = 'insert into tweet (tweet) values ("'+tweet+'")'

                    my_client.query(sql_statement, function(err, rows){
                    res.setHeader("Location", "http://127.0.0.1:1337/time_line")
                    res.statusCode = 302
                    res.end();
                    })
                })
            }else{
                res.setHeader("Location", "http://127.0.0.1:1337/login")
                res.statusCode = 302
                res.end()
            }

        break

        case '/user_list':
            var display = fs.readFile("./views/user_list.html","utf-8", doRead)
        break

        default:
           msg = 'エラー';
        break;
  }

      function doRead(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
        }
})

server.listen(settings.port,settings.host)

//検索に筆禍かrっy等にしる
//ロボットにんしょう
