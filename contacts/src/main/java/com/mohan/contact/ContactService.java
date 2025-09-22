package com.mohan.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepo contactRepo;

    // Add a new contact
    public Contact addContact(Contact contact) {
        return contactRepo.save(contact);
    }

    // View all contacts
    public List<Contact> getAllContacts() {
        return contactRepo.findAll();
    }

    // Update contact by ID
    public Contact updateContact(Long id, Contact updatedContact) {
        Optional<Contact> existingContact = contactRepo.findById(id);

        if (existingContact.isPresent()) {
            Contact contact = existingContact.get();
            contact.setFirstName(updatedContact.getFirstName());
            contact.setLastName(updatedContact.getLastName());
            contact.setPhoneNumber(updatedContact.getPhoneNumber());
            contact.setEmail(updatedContact.getEmail());
            contact.setAddress(updatedContact.getAddress());
            contact.setColumns(updatedContact.getColumns());
            return contactRepo.save(contact); // save updated
        } else {
            return null; // or throw exception
        }
    }

    // Delete contact by ID
    public boolean deleteContact(Long id) {
        if (contactRepo.existsById(id)) {
            contactRepo.deleteById(id);
            return true;
        }
        return false;
    }

    // Get a single contact by ID
    public Contact getContactById(Long id) {
        return contactRepo.findById(id).orElse(null);
    }
}
