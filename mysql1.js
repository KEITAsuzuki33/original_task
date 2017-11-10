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

var fs          = require("fs")
var http        = require('http');
var server      = http.createServer();
var settings    = require('./settings');
var msg;
var querystring = require('querystring')
var sessionids = {}

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
    msg = "アカウント登録完了画面"
    break

    case '/login':
       var display = fs.readFile("./views/login.html","utf-8", doRead)
    break;

    case '/login/done':
        var data = ''
        req.on('readable', function(){
            data += req.read()||"";
        })
        console.log("ログイン処理中です")
        req.on('end', function() {
            var sessionid = ""
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
                    console.log(sessionid)
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

            console.log("タイムラインページを表示しました")
            console.log(req.headers.cookie)
            var display = fs.readFile("./views/time_line.html","utf-8", doRead)
            console.log(sessionids)
            res.setHeader("Location", "http://127.0.0.1:1337/login")
            res.statusCode = 302
    break

    case '/tweet_post':
        console.log(sessionids)
        var cookie = req.headers.cookie
        console.log(cookie)
        var split_cookie = cookie.split(";")
        console.log(split_cookie)
        var parced_cookie = ""
        for (i=0; i<split_cookie.length; i++){
         var element = split_cookie[i].split("=")
             if (elem[0].trim() == "value") {
               parced_cookie = unescape(elem[1]);
             } else {
               continue;
             }
        }
        var display = fs.readFile("./views/tweet_post.html","utf-8", doRead)
    break

    case '/tweet_post/complete':
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
    break

    case '/user_list':
        msg = "ユーザー一覧"
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
