const express = require('express')
const path = require('path')
const port = 8000;
const db = require('./config/mongoose')
const Contact = require('./models/contact')
const app = express();
/*app.get('/home',function(req,res){
    res.send("Cool! it's running")
})
app.get('/about',function(req,res){
    res.send("<h1>This is about page</h1>")
})
app.get('/contact',function(req,res){
    res.send("<h2>This is contact page</h2>")
})*/
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded())
/*app.get('/',function(req,res){
    return res.render('home')
})*/
/*app.get('/',function(req,res){
    return res.render('home',{title:"My Contacts List"})
})*/
app.use(express.static('assets'))
var ContactList = [
    {
        name:'Sharath',
        phone:'7093618330'
    },
    {
        name:'Rahul',
        phone:'9494056236'
    },
    {
        name:'Rohan',
        phone:'9346756765'
    }
]
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

    /*return res.render('contacts',{
        title:"Practice Page",
        Contact_List:ContactList
    })*/
})

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Practice Page"
    })
})

/*app.post('/create-contact',function(req,res){
    return res.redirect('/practice')
})*/
/*app.use(function(req,res,next){
    req.myname="sharath"
    next()
})*/
app.post('/create-contact', function(req,res){
    //console.log(req.body)
    //console.log(req.myname)
    //console.log(req.body.name)
    //console.log(req.body.phone)
    /*ContactList.push({
        name:req.body.name,
        phone:req.body.phone
    })*/
    //ContactList.push(req.body)


    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newcontact){
        if(err){
            console.log('error in creating a new contact')
            return
        }
        //console.log('$$$$$',newcontact)
        return res.redirect('back')
    })


    //return res.redirect('/')
    //return res.redirect('back')
})

/*app.get('/delete-contact/:phone',function(req,res){
    console.log(req.params)
    let phone = req.params.phone
})*/
app.get('/delete-contact',function(req,res){
    //console.log(req.query)
    //let phone = req.query.phone
    //console.log(phone)
    //let delindex = ContactList.findIndex(contact => contact.phone == phone)
    //console.log(delindex)
    /*if(delindex != -1){
        ContactList.splice(delindex,1)
    }*/
    //return res.redirect('back')


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
    //console.log(__dirname)
    console.log('My express is running on port:',port);
})