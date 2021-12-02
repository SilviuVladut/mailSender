const express = require("express");

const app = express();
const cors=require('cors')
const nodemailer = require('nodemailer');
require('dotenv').config();

const user = process.env.USERMAIL;
const pw = process.env.PW;


app.use(express.json());
app.use(cors())



app.post(("/mail"),async (req,res)=>{
  
  const meetingDate = req.body.dateValue
  const meetingDuration = req.body.meetingDuration
  const userName = req.body.userName
  const userMail =req.body.userMail
  const contactPerson = req.body.contactPersonMail
  

let transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: user,
      pass: pw
    }
  });
  
  let mailOptions = {
    from: user,
    to: contactPerson,
    subject: 'Meeting Request | evosa.ro',
    html: `
    <h3 style="text-align: center;"><br />Meeting request from <span style="color: #045397;"> ${userName} </span> | <span style="color: #045397;"> evosa.ro </span> <br/><br/>
    Hello, my friend :), you have a meeting request:</h3>
    <h4 style="text-align: center;">
    Date &amp; Time: <span style="color: #045397;"> ${meetingDate}  </span> <br />
    Duration: <span style="color: #045397;"> ${meetingDuration} minutes </span> <br />
    Contact Person: <span style="color: #045397;"> ${userName} </span> <br />
    E-mail: <span style="color: #045397;">  ${userMail} </span> </h4>
    <h3 style="text-align: center;color: #E05D5D">Don't forget to contact our client.</h3>
    `
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({
        msg: 'fail'
      });
    } 
    else{
      res.json({
        msg: 'success'
      })
    }
  });


})

app.listen(3000, () => {
  console.log("Server is Running on 3000");
});