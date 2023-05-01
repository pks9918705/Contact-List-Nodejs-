const express = require('express')
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
    return res.render('home', {
        title: 'Contact List'
        ,
        // key value pair 
        contact_List: contactList
        // 'contact_List' is array of contact in js file while 'contactList' is array of contact that are available to ejs file
    })
});
app.get('/practice', (req, res) => {
    return res.render('practice', {
        title: 'Practice'
    })
});


//! deletig the contact item
// 
app.get('/delete-contact', (req, res) => {

    // console.log(req.query)
    //get the query from the url
    let uI = req.query.uId;
    // console.log("her",uI)
    // console.log(uI)
    // console.log(contactList.length)

    //finding the contact index to be deleted
    let contactIndex = contactList.findIndex(contact => contact.uId == uI);
    // console.log(contactIndex)

    if (contactIndex != -1) {
        
        contactList.splice(contactIndex, 1)
    }
    // console.log(contactList.length)
    return res.redirect('/')
})


app.post('/create-contact', (req, res) => {

    // return res.redirect('/practice');
    // console.log(req.body)
    // req k pass ek body naame ka object have jiska property hai 'name','email','phone'(key hain saray)

    // method 1 
    // const newContact = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     phone: req.body.phone
    // }
    // contactList.push(newContact);

    // method 2
    contactList.push(req.body)

    //! adding uId by putting current date and time
    const now = new Date();
    // console.log(now);
    req.body.uId=now.getTime()

    
    // req.body.uId=now

    // return res.redirect('/');
    // or 
    return res.redirect('back')
})



app.listen(port, function (error) {
    if (error) console.log("you have ERROR", error)

    console.log("server is running on port", port)
})
