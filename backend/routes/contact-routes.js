const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts-controllers");

//fetch details
router.get("/contacts", contactsController.getAllContacts);
//add details
router.post("/addContacts", contactsController.addContact);
//edit by id  
router.put("/contacts/:id", contactsController.updateContact);
//delete by id 
router.delete("/contacts/:id", contactsController.deleteContact);

module.exports = router; 