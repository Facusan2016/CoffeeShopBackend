var {response} = require('express');
const {validationResult} = require('express-validator');
var nodemailer = require('nodemailer');
const Coffee = require('../models/Coffee');

const sendEmail = (req, res) =>{


    const errors = validationResult( req );  // Checking if entries in my req are valid entries using express-validator, 
                                            // if there was one that's not valid, i'm sending a response with the erros

    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({
            ok : false,
            errors : errors.mapped()
        })
    }

    var transporter = nodemailer.createTransport({ //Using node-mailer to send the repsonse mail
        service : 'gmail',
        auth : {
            user : process.env.EMAIL,
            pass : process.env.EMAIL_PASSWORD
        }
    })

    var mailOptions = { //Here is the mail configuration
        from: `${process.env.EMAIL}@gmail.com`,
        to: `${req.body.email}`,
        subject: 'This is an example email!',
        text: 'Thanks for being interested in recieving more information about our website!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.json({
            ok: true,
            msg : `The mail was sent succesfully to ${req.body.email}`
          })
        }
      });

      console.log(process.env.EMAIL)
      console.log(process.env.EMAIL_PASSWORD)

}


const recieveEmail = (req, res) =>{

  const errors = validationResult( req ); 

  if(!errors.isEmpty()){
    console.log(errors);
    return res.status(400).json({
        ok : false,
        errors : errors.mapped()
    })
  }

  var transporter = nodemailer.createTransport({
      service : 'gmail',
      auth : {
          user : process.env.EMAIL,
          pass : process.env.EMAIL_PASSWORD
      }
  })

  const {name, email, msg} = req.body;
  

  var mailOptions = {
      from: `${process.env.EMAIL}@gmail.com`,
      to: `${process.env.EMAIL}`,
      subject: `${email} has sent you an email`,
      text: `Info {name : ${name}, email : ${email}, msg : ${msg}}`
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        console.log(req.body);
        res.json({
          ok: true,
          msg : `The mail was sent succesfully to ${req.body.email}`
        })
      }
    });

    console.log(process.env.EMAIL)
    console.log(process.env.EMAIL_PASSWORD)

}

const getCoffees = async(req, res) => {
  
  try {
    
    const resp = await Coffee.find().select();
    console.log(resp);
    res.status(201).json({
      ok : true,
      message : 'Traído con éxito',
      resp : resp

    })


  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      ok : false,
      message : 'There was a problem bringing all the quotes.'
    })

  }
}


module.exports = {
  sendEmail,
  recieveEmail,
  getCoffees
}