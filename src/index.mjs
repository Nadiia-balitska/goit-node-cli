// import { program } from "commander";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as contacts from "./contacts.js";

const invokeAction = async ({ action, name, email, phone, contactId }) => {
  switch (action) {
    case "readAll":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
    case "getById":
      const oneContact = await contacts.getContactById(contactId);
      return console.log(oneContact);
    case "add":
      const addContact = await contacts.addContact({ name, email, phone });
      return console.log(addContact);

    case "delete":
      const deleteContact = await contacts.removeContact(contactId);
      return console.log(deleteContact);
    default:
      return console.log("Unknown action");
  }
};

const arr = hideBin(process.argv);
const { argv } = yargs(arr)
  .option("action", {
    alias: "a",
    type: "string",
    demandOption: true,
    describe: "Action to perform",
  })
  .option("contactId", {
    alias: "i",
    type: "string",
    describe: "Contact ID",
  })
  .option("name", {
    alias: "n",
    type: "string",
    describe: "Contact name",
  })
  .option("email", {
    alias: "e",
    type: "string",
    describe: "Contact email",
  })
  .option("phone", {
    alias: "ph",
    type: "string",
    describe: "Contact phone",
  })
  .help().argv;

invokeAction(argv);
