var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";
var ObjectID = require('mongodb').ObjectID;
(function() 
 {
var fs, http, qs, server, url;
http = require('http');
fs = require("fs");
url = require('url');
qs = require('querystring');
fs = require('fs');
var express = require('express');
var app = express()

  
var weburl = require('url');
var loginStatus = false,
  loginUser = "";

server = http.createServer(function(req, res) {
  var action, form, formData, msg, publicPath, urlData, stringMsg;
  urlData = url.parse(req.url, true);
  action = urlData.pathname;
  publicPath = __dirname + "\\public\\";
  console.log(req.url);
  
  if (req.url === "/index") {
       app.post('/logout', function (req, res) {
          });
      
      if(loginStatus)
				{
					sendFileContent(res, "index.html", "text/html");
				}
				else
				{
					sendFileContent(res, "login.html", "text/html");
				}
  } 
  else if (req.url === "/search") {
     if(loginStatus)
				{
					sendFileContent(res, "search.html", "text/html");
				}
				else
				{
					sendFileContent(res, "login.html", "text/html");
				}
  } 
  else if (action === "/readfavourlist")
		{
			if (req.method === "POST") 
			{
				formData = '';
				msg = '';
				return req.on('data', function(data) 
				{
					formData += data;

					return req.on('end', function() 
					{
						var user;
						user = qs.parse(formData);
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[0];
						
						var splitName = tempSplitName.split("=");
						
						var username =splitName[1];
				
						MongoClient.connect(dbUrl, function(err, db) 
						{
							var finalcount;
							if (err) throw err;
							var dbo = db.db("mydb");
							var myobj = stringMsg;
							dbo.collection("favourlist").find({"uname" : loginUser}).toArray(function(err, result) 
							{
								if (err) throw err;
									console.log(result);
								db.close();
								var resultReturn = JSON.stringify(result);
									console.log(resultReturn);
									return res.end(resultReturn);
							});
						});
					});
				});
			}
			
		}
  
  else if (action === "/removefavourlist")
		{
			
				console.log("remove favour");
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';
					return req.on('data', function(data) 
					{
						formData += data;
          
						console.log("form data="+ formData);
						return req.on('end', function() 
						{
							var user;
							user = qs.parse(formData);
							
							
							var splitMsg = formData.split("&");
							var tempSplitName = splitMsg[0];
							

							var splitName = tempSplitName.split("=");
							
						
							var favid=splitName[1];
						
				
						console.log("login="+favid);
						
				
							MongoClient.connect(dbUrl, function(err, db) 
							{
								var finalcount;
								if (err) throw err;
								var dbo = db.db("mydb");
								var myobj = {_id : new ObjectID(favid)};
								console.log(myobj);
								dbo.collection("favourlist").count(myobj, function(err, count)
								{
									console.log(err, count);
									finalcount = count;
									if(finalcount > 0)
									{
										dbo.collection("favourlist").deleteOne(myobj, function(err, res) 
										{
											if (err) throw err;
											console.log("fav removed");
											db.close();
										});
										return res.end(msg);
									}
                  
                  else if (favid === "undefined"){
                    	dbo.collection("favourlist").deleteOne(myobj, function(err, res) 
										{
											if (err) throw err;
											console.log("fav removed");
											db.close();
										});
										return res.end(msg);
                  }
									else
									{
										if(err) throw err;
										console.log("fav not exist");
										db.close();
										return res.end("fail");
									}
								});
								
								 dbo.collection("favourlist").find({}).toArray(function(err, result) {
											if (err) throw err;
											console.log(result);
											db.close();
								});
								
								
							});
						});
					});
				}
			
		
		}
  else if (action === "/mylist")
		{
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';
					return req.on('data', function(data) 
					{
						formData += data;
          
						console.log("form data="+ formData);
						return req.on('end', function() 
						{
							var user;
							user = qs.parse(formData);
							
							var splitMsg = formData.split("&");
							var tempSplitName = splitMsg[0];
							
							var splitName = tempSplitName.split("=");
						
							var favid=splitName[1];
						
						console.log("login="+favid);
						
							MongoClient.connect(dbUrl, function(err, db) 
							{
								var finalcount;
								if (err) throw err;
								var dbo = db.db("mydb");
								var myobj = {_id : new ObjectID(favid)};
								console.log(myobj);
								dbo.collection("favourlist").count(myobj, function(err, count)
								{
									console.log(err, count);
									finalcount = count;
									if(finalcount > 0)
									{
										dbo.collection("favourlist").deleteOne(myobj, function(err, res) 
										{
											if (err) throw err;
											console.log("fav removed");
											db.close();
										});
										return res.end(msg);
									}
									else
									{
										if(err) throw err;
										console.log("fav not exist");
										db.close();
										return res.end("fail");
									}
								});
								
								 dbo.collection("favourlist").find({}).toArray(function(err, result) {
											if (err) throw err;
											console.log(result);
											db.close();
								});
								
								
							});
						});
					});
				}
			else{
         
      if(loginStatus)
				{
				    sendFileContent(res, "mylist.html", "text/html");
				}
				else
				{
					  sendFileContent(res, "login.html", "text/html");
				}
   
     }
		
		}
  
  else if (req.url === "/myfav"){
     if (req.method === "POST") {
       console.log("action = post");
					formData = '';
					msg = '';
					return req.on('data', function(data) 
					{
						formData += data;
          
						console.log("form data="+ formData);
						return req.on('end', function() 
						{
							var user;
							user = qs.parse(formData);
							msg = JSON.stringify(user);
							stringMsg = JSON.parse(msg);
							var splitMsg = formData.split("=");
							console.log("mess="+msg);
							console.log("mess="+formData);
              console.log("mess123213="+ splitMsg[2]);

							MongoClient.connect(dbUrl, function(err, db) 
							{
								var finalcount;
								if (err) throw err;
								var dbo = db.db("mydb");
								var myobj = {"uname" : loginUser, "favourite" : splitMsg[2]};
								dbo.collection("favourlist").count(myobj, function(err, count)
								{
									console.log(err, count);
									finalcount = count;
									if(finalcount > 0)
									{
										if(err) throw err;
										console.log("fav exist");
										db.close();
										return res.end("2");
                    
									}
                  else if (splitMsg[2] ==="undefined"){
                    if(err) throw err;
										console.log("fav exist");
										db.close();
										return res.end("3");
                  }
									else
									{
										dbo.collection("favourlist").insertOne(myobj, function(err, res) 
										{
											if (err) throw err;
											console.log("fav inserted");
											db.close();
										});
										return res.end("1");
									}
								});
							});
						});
					});
     }else{
         
      if(loginStatus)
				{
				     sendFileContent(res, "myfav.html", "text/html");
				}
				else
				{
					sendFileContent(res, "login.html", "text/html");
				}
   
     }
  }
  else if (req.url === "/logout") {
     loginStatus = false;
     console.log(loginStatus);
          if(loginStatus)
				{
				    sendFileContent(res, "mylist.html", "text/html");
				}
				else
				{
					  sendFileContent(res, "login.html", "text/html");
				}
  }
  else if (req.url === "/login"){
    if (req.method === "POST") {
      console.log("action = post");
      formData = '';
      msg = '';
      return req.on('data', function(data) {
        formData += data;
        console.log("form data server=" + formData);
        return req.on('end', function() {
          var user;
          user = qs.parse(formData);
          msg = JSON.stringify(user);
          stringMsg = JSON.parse(msg);
          var splitMsg = formData.split("&");
          var tempSplitName = splitMsg[0];
          var splitName = tempSplitName.split("=");
          var tempPassword = splitMsg[1];
          var splitPassword = tempPassword.split("=");

          console.log("mess=" + msg);
          console.log("mess=" + formData);
          console.log("user=" + splitName[1] + ", password=" + splitPassword[1]);

          MongoClient.connect(dbUrl, function(err, db) {
            var finalcount;
            if (err) throw err;
            var dbo = db.db("mydb");
            var myobj = stringMsg;

            dbo.collection("members").count({
              "uname": splitName[1],
              "pwd": splitPassword[1]
            }, function(err, count) {
              console.log(err, count);
              finalcount = count;
              if (err) throw err;
              if (finalcount > 0) {
                loginStatus = true;
                 console.log("final"+ finalcount);
                loginUser = splitName[1];
                console.log("user exist, user is: " + loginUser);
                db.close();
                return res.end("1");
              }
              else {
                db.close();
                console.log("user or pw not match");
                return res.end("0");
              }
            });
          });
        });
      });
    }else{
      if(loginStatus)
				{
					sendFileContent(res, "index.html", "text/html");
				}
				else
				{
					sendFileContent(res, "login.html", "text/html");
				}
    }
  }
    else if (req.url === "/register") {
  
    if (req.method === "POST") {
      console.log("action = post");
      formData = '';
      msg = '';
      return req.on('data', function(data) {
        formData += data;
        console.log("form data server=" + formData);
        return req.on('end', function() {
          var user;
          user = qs.parse(formData);
          user.id = "0";
          msg = JSON.stringify(user);
          stringMsg = JSON.parse(msg);
          var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[0];
						var splitName = tempSplitName.split("=");
						var searchDB = "Name : " + splitName[1];

            console.log("mess="+msg);
						console.log("mess="+formData);
						console.log("search=" + searchDB);
						         
            MongoClient.connect(dbUrl, function(err, db) 
						{
							var finalcount;
							if (err) throw err;
							var dbo = db.db("mydb");
							var myobj = stringMsg;
							dbo.collection("members").count({"uname" : splitName[1]}, function(err, count)
							{
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("user exist");
									db.close();
									return res.end("0");
								}
								else
								{
									dbo.collection("members").insertOne(myobj, function(err, result) 
									{
										if (err) throw err;
										console.log("1 document inserted");
										db.close();
							  	return res.end("1");
									});
									
								}
							});
						});
        });
      });
    }
    else{
        sendFileContent(res, "register.html", "text/html");
    }
  } else if (req.url === "/") {
    console.log("Requested URL is url" + req.url);
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + req.url);
  } else if (/^\/[a-zA-Z0-9\/]*.min.js$/.test(req.url.toString())) {
    sendFileContent(res, req.url.toString().substring(1), "text/javascript");
  } else if (/^\/[a-zA-Z0-9\/]*.js$/.test(req.url.toString())) {
    sendFileContent(res, req.url.toString().substring(1), "text/javascript");
  } else if (/^\/[a-zA-Z0-9\/]*.min.css$/.test(req.url.toString())) {
    sendFileContent(res, req.url.toString().substring(1), "text/css");
  } else if (/^\/[a-zA-Z0-9\/]*.css$/.test(req.url.toString())) {
    sendFileContent(res, req.url.toString().substring(1), "text/css");
  } else if (/^\/[a-zA-Z0-9\/]*.jpg$/.test(req.url.toString())) {
    sendFileContent(res, req.url.toString().substring(1), "image/jpg");
  } else if (/^\/[a-zA-Z0-9\/]*.png$/.test(req.url.toString())) {
    sendFileContent(res, req.url.toString().substring(1), "image/png");
  } else {
    console.log("Requested URL is: " + req.url);
    res.end();
  }
});

server.listen(8080)


console.log("Server is running，time is" + new Date());
  
function sendFileContent(response, fileName, contentType)
	{
		fs.readFile(fileName, function(err, data)
		{
			if(err)
			{
				response.writeHead(404);
				response.write("Not Found!");
			}
			else
			{
				response.writeHead(200, {'Content-Type': contentType});
				response.write(data);
			}
			response.end();
		});
	}
}).call(this);
