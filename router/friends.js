const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
    res.send(JSON.stringify(friends, null, 4));
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
    const email = req.params.email;
    res.send(friends[email]);
});


// POST request: Add a new friend
router.post("/",(req,res)=>{
  const id = req.body.email;
  if(id) {
    friends[id] = {
        "firstName" : req.body.firstName,
        "lastName": req.body.lastName,
        "DOB": req.body.DOB
    };
  }
  res.send("The user " + req.body.firstName + " has been added");
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
    const emailid = req.params.email;
    let friend = friends[emailid];
    if(friend) {
        let dob = req.body.DOB;
        let firstname = req.body.firstName;
        let lastname = req.body.lastName

        if(dob) {
            friend["DOB"] = dob;
        }
        if(firstname) {
            friend["firstName"] = firstname;
        }
        if(lastname) {
            friend["lastName"] = lastname;
        }
        friends[emailid] = friend;
        res.send(`Friend with email ${emailid} has been updated`);
    }
    else {
        res.send("Unable to find a friend");
    }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
    const eid = req.params.email;
    if(eid) {
        delete friends[eid];
    }
  res.send(`Friend with the email ${email} deleted.`);
});

module.exports=router;
