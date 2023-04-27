const express = require('express')
const app = express()
const port = 8000
const path = require('path')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//! a variable - available globally
var contactList = [
    {
        name: 'John', email: 'kenaa@example.com', phone: '1234567890'
    },
    {
        name: 'Jane', email: 'kenaa@example.com', phone: '1234567890'
    },
    {
        name: 'Jim', email: 'kenaa@example.com', phone: '1234567890'
    }
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



app.listen(port, function (error) {
    if (error) console.log("you have ERROR", error)

    console.log("server is running on port", port)
})
