const express = require('express')
const app = express()
const port = 8000
const path = require('path')
//parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// sending data from EJS to the server
//! a variable - available globally
var contactList = [
     
]

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
    return res.render('practice',{
        title: 'Practice'
    })
});


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

    return res.redirect('/');
})



app.listen(port, function (error) {
    if (error) console.log("you have ERROR", error)

    console.log("server is running on port", port)
})
