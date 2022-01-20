//jshint esversion:6

const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");


const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function (req, res){
  res.sendFile(__dirname+ "/signup.html");
});


app.post("/",function (req, res){
  const fname= req.body.fname;
  const lname= req.body.lname;
  const email = req.body.email;
  const data={
    members:[
      {
        email_address:email,
        status :"subscribed",
        merge_fields: {
	          FNAME: fname,
           	LNAME: lname
         }


      }
    ]
  };


  const jsondata= JSON.stringify(data);
  const url= "https://us2.api.mailchimp.com/3.0/lists/2340f00358";
  const options={
    method: "POST",
    auth:"rs_veneela:6b33f6642bfa3a20226e0309336f5c67-us2"
  };

  const request=https.request(url,options,function (response){
     if(response.statusCode === 200){
       res.sendFile(__dirname+"/success.html");
     }else{
       res.sendFile(__dirname+"/failure.html");

     }
     response.on("data",function(data){
     console.log(JSON.parse(data));

  });


});
request.write(jsondata);
request.end();



});
app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(3000,function(){
  console.log("you are on port 3000.");
});

//unique // IDEA: 021b1ae0f0
//api key::::f79dc2e1410c0c37f8eccdd160f90449-us2
//1b604ec0e0c24bff47558029829ed171-us2
