const express = require('express')
const app = express();
//to access body request
var bodyparser = require('body-parser')
//to read env variable
var dotenv = require('dotenv')
dotenv.config()
//mongo db framework
const mongoose = require('mongoose')
//model file for schema
var user_details = require('./model');
//emailvalidation for correct mail_id
var validator = require("email-validator");
app.post('/users', (req, res) => {
    if (!!req.body.name && !!req.body.email && req.body.dob) {
        let name = req.body.name;
        let email = req.body.email;
        var date = req.body.dob;
        //emailvalidation for correct mail_id
        var valid_mail = validator.validate(email)
        if (valid_mail == true) {
            async function run() {
                try {
                  
                    let docs = {
                        'name': name,
                        'email': email,
                        'dob': date
                    }
                    //mongo query for insert
                    await user_details.insertOne(docs);
                    res.status(200).json({
                        status: 1,
                        msg: 'documents were inserted successsfully..',
                        data: docs
                    })
                } catch {
                    res.status(500).json({
                        status: 1,
                        msg: 'error in inserting process ...'
                    })
                }
            }
            run()
        } else {
            res.status(200).json({
                status: 1,
                msg: 'provide valid mailid....'
            })
        }
    } else {
        res.status(200).json({
            status: 1,
            msg: 'insufficient inputs.....'
        })
    }
})
app.get('/users/:email_id', (req, res) => {
    if (!!req.params.email_id) {
        var email = req.params.email_id
        async function run() {
            try {
                //query to search
                await user_details.find({
                    email: email
                }).exec(err, data => {
                    if (data.length >= 1) {
                        res.status(200).json({
                            status: 1,
                            msg: 'data fetched successfully',
                            data: data
                        })
                    } else {
                        res.status(200).json({
                            status: 1,
                            msg: 'there is no data for this mail id',
                            data: []
                        })
                    }
                });
            } catch {
                res.status(500).json({
                    status: 1,
                    msg: 'error while fetching data...'
                })
            }
        }
        run()
    } else {
        res.status(200).json({
            status: 1,
            msg: 'insufficient inputs.....'
        })
    }
})
app.delete('/users/:email_id', (req, res) => {
    if (!!req.params.email_id) {
        var email = req.params.email_id
        async function run() {
            try {
                //query to delete
                await user_details.deleteOne({
                    email: email
                }, (err, collection) => {
                    if (err) throw err;
                    else {
                        res.status(200).json({
                            status: 1,
                            msg: 'records deleted successfully'
                        })
                    }
                });
            } catch {
                res.status(500).json({
                    status: 1,
                    msg: 'error while fetching data...'
                })
            }
        }
        run()
    } else {
        res.status(200).json({
            status: 1,
            msg: 'insufficient inputs.....'
        })
    }
})
//bodyparser standards
app.use(bodyparser.urlencoded({
    'limit': '50mb',
    'extended': true
}))
app.use(bodyparser.json({
    'limit': '50mb'
}))
//mongo db connection
mongoose.connect(process.env.mongo_access).then(function() {
    console.log('connected on :', Database.DBlink)
}, function(err) {
    console.log(err, 'occuars')
})
//express listen on specified port
app.listen(process.env.PORT, function(err) {
    if (err) console.log('ERROR')
    else {
        console.log('server running on port:', process.env.PORT)
    }
})
