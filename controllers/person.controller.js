const Person = require('../models/person.model.js');

// Find a single person with username && password
exports.login = (req, res) => {
	Person.find({username:req.body.username,psw:req.body.psw})
	    .then(person => {
	        if(!person) {
	            return res.status(500).send({
	                message: "Username or password incorrect"
	            });            
	        }else{
	        	return res.send(person);	        	
	        }
	    }).catch(err2 => {
	        if(err2.kind === 'ObjectId') {
	            return res.status(404).send({
	                message: "Person not found with username " + req.body.username
	            });                
	        }
	        return res.status(500).send({
	            message: "Username not found"
	        });
	    });
};

// Create and Save a new Person
exports.create = (req, res) => {
	// Validate request
    if(!req.body.name) {
        return res.status(500).send({
            message: "Person name can not be empty"
        });
    }

    if(!req.body.username) {
        return res.status(500).send({
            message: "Person username can not be empty"
        });
    }

    if(!req.body.psw) {
        return res.status(500).send({
            message: "Person password can not be empty"
        });
    }

    if(!req.body.photo) {
        return res.status(500).send({
            message: "Person photo can not be empty"
        });
    }

    // Create a Person
    const person = new Person({
        name: req.body.name || "Untitled Person", 
        photo: req.body.photo,
        username : req.body.username,
        psw : req.body.psw
    });

    // Save Person in the database
    person.save()
    .then(data => {
        res.send({message : "Person create successfully!"});
    }).catch(err => {
        res.send({
            message: err.message || "Some error occurred while creating the Person."
        });
    });
};

// Retrieve and return all persons from the database.
exports.findAll = (req, res) => {
	Person.find()
	    .then(person => {
	        res.send(person);
	    }).catch(err => {
	        res.status(500).send({
	            message: err.message || "Some error occurred while retrieving persons."
	        });
	    });
};	

// Find a single person with a personId
exports.findOne = (req, res) => {
	Person.findById(req.params.personId)
	    .then(person => {
	        if(!person) {
	            return res.status(404).send({
	                message: "Person not found with id " + req.params.personId
	            });            
	        }else{
	        	res.send(person);
	        }
	    }).catch(err => {
	        if(err.kind === 'ObjectId') {
	            return res.status(404).send({
	                message: "Person not found with id " + req.params.personId
	            });                
	        }
	        return res.status(500).send({
	            message: "Error retrieving person with id " + req.params.personId
	        });
	    });
};

// Update a person identified by the personId in the request
exports.update = (req, res) => {
	// Validate Request
	    if(!req.body.name) {
	        return res.status(400).send({
	            message: "Person name can not be empty"
	        });
	    }

	    // Find person and update it with the request body
	    Person.findByIdAndUpdate(req.params.personId, {
	        name: req.body.name || "Untitled Peron",
	        photo: req.body.photo
	    }, {new: true})
	    .then(person => {
	        if(!person) {
	            return res.status(404).send({
	                message: "Person not found with id " + req.params.personId
	            });
	        }
	        res.send("Person updated!");
	    }).catch(err => {
	        if(err.kind === 'ObjectId') {
	            return res.status(404).send({
	                message: "Person not found with id " + req.params.personId
	            });                
	        }
	        return res.status(500).send({
	            message: "Error updating person with id " + req.params.personId
	        });
	    });
};

// Delete a person with the specified personId in the request
exports.delete = (req, res) => {
	Person.findByIdAndRemove(req.params.personId)
	    .then(person => {
	        if(!person) {
	            return res.status(404).send({
	                message: "Person not found with id " + req.params.personId
	            });
	        }
	        res.send({message: "Person deleted successfully!"});
	    }).catch(err => {
	        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
	            return res.status(404).send({
	                message: "person not found with id " + req.params.personId
	            });                
	        }else{
	        	res.send("Person deleted!");
	        }
	        return res.status(500).send({
	            message: "Could not delete person with id " + req.params.personId
	        });
	    });
};