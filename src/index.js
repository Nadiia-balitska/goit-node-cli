import { program } from "commander";

import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

const invokeAction = async ({ action, name, email, phone, contactId }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;
    case "get":
      const oneContact = await getContactById(contactId);
      console.log(oneContact);
      break;
    case "add":
      const addContact = await addContact(name, email, phone);
      console.log(addContact);
      break;

    case "remove":
      const deleteContact = await removeContact(contactId);
      console.log(deleteContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

invokeAction(options);
