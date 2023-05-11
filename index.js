const express = require('express')

const db = require('./config/mongoose')
//below is the collection
const Contact = require('./models/contact')
const app = express()
const port = 8000
const path = require('path')
//parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//!Accessing Static Files
app.use(express.static('assets'))
// iit will go to directory nameD "assets"


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// sending data from EJS to the server
//! a variable - available globally
var contactList = [

]

// creating a middleware
app.use(function (req, res, next) {
    // console.log("middleware 1 called")
    // if you want to make changes to the req 
    // req.myName="adi"
    next()

})
app.use((req, res, next) => {
    // console.log("middleware 2 called")

    next()

})

app.get('/', (req, res) => {


    Contact.find()
        .then((contacts) => {
            return res.render('home', {
                title: 'Contact List',
                contact_list: contacts
            })
        })
        // Contact.find(): This code is assuming that there is a model called Contact (possibly defined using a library like Mongoose) representing a collection in a database. The find() method is used to retrieve all documents/records from the Contact collection.
        .catch((error) => {
            console.log("error in fetching contact from db", error);
        })
});
app.get('/practice', (req, res) => {
    return res.render('practice', {
        title: 'Practice'
    })
});


//! deletig the contact item
// 
// app.get('/delete-contact', async(req, res) => {

//     let id=req.query.id

//    await Contact.findOneAndDelete({
//     _id: id
//    })
    
// //    return res.redirect('/')
    
// });
// app.post("/delete" , async ( req , res ) =>{
//     await Data.findOneAndRemove({
//         _id: req.get("id")   
//     })
//     res.send("Deleted!")
// })
app.get('/delete-contact', async (req, res) => {
    try {
      const id = req.query.id;
      const result = await Contact.findOneAndDelete({ _id: id });
  
      if (result) {
        return res.redirect('/');
      } else {
        return res.status(404).send('Contact not found');
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send('Internal Server Error');
    }
  });


app.post('/create-contact', (req, res) => {
 
    // method 3

    Contact.create({
        name: req.body.name,
        // email: req.body.email,
        phone: req.body.phone,
        // uId: new Date().getTime()
    })
        .then((result) => {
            console.log("contact created", result)
            return res.redirect('back')
        })
        .catch((err) => {
            console.log("Error creating contact", err)
            return res.redirect('back');

        })
})



app.listen(port, function (error) {
    if (error) console.log("you have ERROR", error)

    console.log("server is running on port", port)
})

