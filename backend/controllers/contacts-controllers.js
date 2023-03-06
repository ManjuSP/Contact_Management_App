const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

//for getting all the contacts
const getAllContacts = async (request,response) => {
  console.log('inside get all contacts')
  try {
    let db_connect = await dbo.getDb("contacts");
    db_connect
    .collection("contacts")
    .find()
    .sort({'firstName': 1})
    .toArray(function (error, result) {
      if (error) response.status(404).json({ message: "No products found" });
      else response.status(200).json({result});
    });
  } catch (err) {
   throw err
  }
};

//for adding a contact
const addContact = async (request, response) => {
  console.log('request', request.params)
    try{
      console.log('inside add contact');
        let db_connect = await dbo.getDb();
        db_connect.collection("contacts").insertOne(request.body, function (error, result) {
            if (error) response.status(500).json({ message: "Unable To Add" });
            else response.status(201).json({result});
    });
    }catch (err) {
        throw err
  }}

//for editing contact
const updateContact = async (request, response) => {
  const id = request.params.id;
  try {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(id)};
    console.log('inside update query :',myquery)
    let newvalues = {
        $set: {
            ...request.body
        }
    };
    db_connect 
        .collection("contacts")
        .updateOne(myquery, newvalues, function (error, result) {
        if (error) response.status(404).json({ message: "Unable To Update By this ID" });
        response.status(200).json({ result });
        });
  }catch (err) {
    throw err
  }
};

//for deleting a contact
const deleteContact = async (request, response) => {
  const id = request.params.id;
  try {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( id )};
    db_connect.collection("contacts").deleteOne(myquery, function (error) {
      if (error) response.status(404).json({ message: "Unable To Delete By this ID" });
      console.log("1 document deleted");
      response.status(200).json({ message: "contact Successfully Deleted" })
    });
  } catch (err) {
    throw err;
  }
};

//export all the functions
exports.getAllContacts = getAllContacts;
exports.addContact = addContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;