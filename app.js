var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();

const hostname = "localhost";
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//ROUTES

app.get("/", (req,res)=>{
    res.render("form");
});

app.post("/", (req,res)=>{
    var mailContent = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    }

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'your email',
          pass: 'your password'
        }
    });

    var mailOptions = {
        from: "your email",
        to: 'your email',
        subject: mailContent.subject,
        text: mailContent.name + " sent you a message : \n" + JSON.stringify(mailContent.message) + "\n email id: " + mailContent.email
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.redirect("/");
        }
      });  

      transporter.close();
      
});

app.listen(port, ()=>{
    console.log(`server running at ${hostname}:${port}`);
})