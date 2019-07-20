module.exports = (app) => {
    const person = require('../controllers/person.controller.js');

    app.post("/person/login", person.login);

    // Create a new Person
    app.post('/person/new', person.create);

    // Retrieve all Persons
    app.get('/person/all', person.findAll);

    // Retrieve a single Person with personId
    app.get('/person/edit/:personId', person.findOne);

    // Update a Person with personId
    app.put('/person/update/:personId', person.update);

    // Delete a Person with personId
    app.delete('/person/delete/:personId', person.delete);
}