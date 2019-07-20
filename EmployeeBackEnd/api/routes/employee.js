const express = require('express');
const router = express.Router();
const Employeedata = require('../models/employeeData');
const mongoose = require('mongoose');
const multer = require('multer');
const adminSchema = require('../models/adminRegistration');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('abcXYZ');
const verifyToken= require('../middleware/authentication');
const CryptoJS =require('crypto-js')
const tokenSchema = require('../models/manageToken');
// ---------------------Multer----------------------------------------
const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './upload/');
    },
    filename : function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
})
const upload = multer({storage:storage});

// -------------------------Mail---------------------------------
router.post('/reset',(req, res, next)=>{
    const mail= req.body.email
  
    adminSchema.findOne({email :req.body.email},(error, result)=>{
        const encryptedId= cryptr.encrypt(result._id);
        console.log(encryptedId);
        sendResetMail(encryptedId);
    })
    function sendResetMail(result){

        let payload={subject:result}
        let token = jwt.sign(payload,'nikhil')
         res.status(200).json({token :token})

        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth: {
                user: 'Your Email',
                pass: 'your Password'
            }
            
        });
        const mailOption ={
            from : 'nikhillale93@gmail.com',
            to: mail,
            subject: 'Reset Password',
            text: ' http://localhost:4200/authentication/reset/'+result
        }
        transporter.sendMail(mailOption , (error, info)=>{
            if(error){
                console.log(error);
            }else{
                console.log('Email sent: ' + info.response);
                res.status(200).json({message:'Email Sent'});
                res.status(200).json({token :token})
            }
        })

    }
    
    
})
//-----------------------ResetPassword---------------------------
router.post('/resetpass',(req, res, next)=>{
    let email2= req.body.email
    const decryptedId = cryptr.decrypt(email2);
    console.log(decryptedId);
    adminSchema.updateOne({_id :decryptedId},{$set :{password: req.body.password}}).then(response=>{
        res.status(200).json({
            message: "updated Success"
        })
    })
})
// ----------------------Request---------------------------------

router.post('/add',upload.single('profileimage'),(req, res, next)=>{
    console.log(req.body);
    const Employee = new Employeedata({
         _id : new  mongoose.Types.ObjectId(),
        firstName : req.body.firstName,
        lastName : (req.body.lastName ? req.body.lastName : ''),
        email : req.body.email,
        gender : (req.body.gender ? req.body.gender: '' ),
        age : (req.body.age ? req.body.age : ''),
        salary : (req.body.salary ? req.body.salary :''),
        Dob : (req.body.Dob ? req.body.Dob :''),
        address :req.body.address,
        contactNumber :req.body.contactNumber,
        hobbies :(req.body.hobbies ? req.body.hobbies: ''),
        states :(req.body.states ? req.body.states: ''),
        cityes :(req.body.cityes? req.body.cityes: ''),
        pinCode :(req.body.pinCode? req.body.pinCode:''),
         profileimage: (req.file?req.file.path : "upload/2019-07-06T10:44:39.496Zpexels-photo-248797.jpeg"),
         skills : (req.body.skills ? req.body.skills :'')
    });
    Employee.save()
    .then( result=>{
        res.status(200).json({
            message : "Employe Added successfully",
            
        })
    })
    .catch(error => {
        res.status(500).json({
            Error : "failed"
        })
    });
    
})

router.get('/display',verifyToken,(req, res, next)=>{
    Employeedata.find()
    .select('_id firstName lastName email gender age Dob address contactNumber hobbies states cityes pinCode profileimage')
    .exec()
    .then(result =>{
        res.status(200).json({
            EmployeeDetails : result
        })
    },error=>{
        res.status(401).json({
            error
        })
    })
    .catch()
})
router.get('/data/:empId',verifyToken,(req, res, next)=>{
    const id = req.params.empId;
    Employeedata.find({_id : id})
    .select('_id firstName lastName email gender age Dob salary address contactNumber hobbies states cityes pinCode profileimage skills')
    .exec()
    .then(result =>{
        res.status(200).json({
            EmployeeDetails : result
        })
    })
    .catch()
})

router.delete('/delete/:empId',verifyToken,(req, res, next)=>{
    const id = req.params.empId;
    Employeedata.remove({_id : id})
    .exec()
    .then( result =>{
        res.status(200).json({
            message : "Employee Deleted"
        })
    })
    .catch( error =>{
        res.status(500).json({
            message : error
        })
    })

})

router.patch('/update/:empId',upload.single('profileimage'),(req, res, next)=>{
    const id = req.params.empId;
    const updateOps ={};
    
    console.log(req);
    updateOps['firstName']=req.body.firstName;
    updateOps['lastName']=req.body.lastName;
    updateOps['email']=req.body.email;
    updateOps['gender']=req.body.gender;
    updateOps['age']=req.body.age;
    updateOps['salary']=req.body.salary;
    updateOps['Dob']=req.body.Dob;
    updateOps['address']=req.body.address;
    updateOps['contactNumber']=req.body.contactNumber;
    updateOps['hobbies']=req.body.hobbies;
    updateOps['states']=req.body.states;
    updateOps['cityes']=req.body.cityes;
    updateOps['pinCode']=req.body.pinCode;
    updateOps['skills']=req.body.skills;
    if(req.file){
        updateOps['profileimage']=req.file.path;
    }

    Employeedata.update({_id : id}, {$set :updateOps})
    .exec()
    .then( result =>{
        res.status(200).json({
            message : "Employee details Are Updated"
            
        })
    })
    .catch( error =>{
        res.status(500).json({
            message : error
        })
    });

})
//--------------------------------------------------

router.post('/register',(req, res, next)=>{

    let admin = new adminSchema({
        _id : new mongoose.Types.ObjectId(),
        email: req.body.email,
        password : req.body.password
    });
    admin.save((error , registered)=>{
        if(error){
            console.log(error);
        }else{
            res.status(200).json( registered);
        }
    })
})

router.post('/login',(req, res, next)=>{
    let adminData= req.body
    adminSchema.findOne({email : adminData.email},(error , admin)=>{
        if(error){
            console.log(error);
        }else{
            if(!admin){
                res.status(401).json({error :'You are not authenticated user'}) 
            }else{
                if(admin.password !== adminData.password){
                    res.status(401).json({error : 'Invalid password'})
                }else{
                    let payload={subject:admin._id}
                    let token = jwt.sign(payload,'nikhil')
                     res.status(200).json({token :token})
                }
            }
        }
    })
})



module.exports =router;
