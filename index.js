const express = require('express');
const app = express();
const users = require('./users.json');
const fs = require('fs');
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    res.send("I'm Back, Bitches!!!  -A");
});

app.get('/baxx', (req, res) => {
    res.send("If you hunt corruption for my country, nearly everybody go go prison")
})
app.post('/', function (req, res) {
    res.send("Two can keep a secret, If one of them is dead");
});

app.post('/baxx', function (req, res) {
    res.send("You know you love me, XOXO - GG");
});

// Using postman in real data below'
// Type in the url with route in postman and see their result

// -------------------------------------------------------------------

//fetching all users in the users.json file in this route
app.get('/users', (req, res) => {
    return res.json({ users })
});

//Add a new user to the mock database Users.json
app.post('/users', (req, res) => {
    users.push(req.body.newuser);
    //this pushes the new data inot the users arrray but doesnt add it in the users.json file
    console.log({ users });

    //stringify the data in the users array. null, 2 is for proper indentation
    let stringedData = JSON.stringify(users, null, 2);

    //rewrites the users.json file and append the newuser added to it
    fs.writeFile('users.json', stringedData, (err) => {
        if (err) {
            return res.status(500).json({ message: err })
        }
    })

    //response to give if request was successful(status=200)
    return res.status(200).json({ message: "User Added successfully" });

});

//fetching a single user
app.get('/users/:id?', (req, res) => {
    let id = req.params.id;

    let foundUser = users.find(user => {
        return String(user.id) === id
    })
    console.log(foundUser)

    if (foundUser) {
        return res.status(200).json({ user: foundUser })
    } else {
        return res.status(500).json({ message: "User not found" })
    }
})

//updating a user
app.put('/users/:id', (req, res) => {
    let id2 = req.params.id;
    let Userfound = users.find(user => {
        return String(user.id) === id2

    });
    console.log(Userfound);
    if (Userfound) {
        const { name, username, email, address } = req.body;
        //req.body is the new data you're trying to pass in;
        Userfound.name = name;
        Userfound.username = username;
        Userfound.email = email;
        Userfound.address.street = address.street;


        let stringedData = JSON.stringify(users, null, 2);
        fs.writeFile('users.json', stringedData, (err) => {
            if (err) {
                res.status(500).json({ message: err })
            }
            else {
                res.status(200).json({
                    message: "User Updated",
                    users
                })
            }
        })

    }
    else {
        res.status(500).json({ message: "User not Found" })
    }

})


app.delete('/users/:id?', (req, res) => {
    let id3 = req.params.id;
    let FindUser = users.find(user => {
        return String(user.id) === id3

    });
    console.log(FindUser);
    if (FindUser) {
        users.splice(users.indexOf(FindUser), 1);

        let stringedData = JSON.stringify(users, null, 2);
        fs.writeFile('users.json', stringedData, (err) => {
            if (err) {
                res.status(500).json({ message: err })
            }
            else {
                res.status(200).json({
                    message: "User Deleted",
                    users
                })
            }
        })

    }
    else {
        res.status(500).json({ message: "User not Found" })
    }

})



app.listen(3000, () => {
    console.log('Server is Up and Running')
});