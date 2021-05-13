const express = require('express')
const path = require('path')
const port = 8000;
const db = require('./config/mongoose')
const Contact = require('./models/contact')
const app = express();

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded())

app.use(express.static('assets'))

app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db')
            return
        }
        return res.render('contacts',{
            title:'Contacts List',
            Contact_List:contacts
        })
    })

})

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Practice Page"
    })
})

app.post('/create-contact', function(req,res){
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newcontact){
        if(err){
            console.log('error in creating a new contact')
            return
        }
        return res.redirect('back')
    })
})

app.get('/delete-contact',function(req,res){
    let id =req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting a contact from db');
            return;
        }
        return res.redirect('back')
    })
})
app.listen(port,function(err){
    if(err){
        console.log('Error:',err)
    }
    console.log('My express is running on port:',port);
})