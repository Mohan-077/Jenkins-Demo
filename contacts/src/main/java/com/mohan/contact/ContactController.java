package com.mohan.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    // ➕ Add new contact
    @PostMapping
    public Contact addContact(@RequestBody Contact contact) {
        return contactService.addContact(contact);
    }

    // 📃 View all contacts
    @GetMapping
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }

    // 🔍 View contact by ID
    @GetMapping("/{id}")
    public Contact getContactById(@PathVariable Long id) {
        return contactService.getContactById(id);
    }

    // ✏️ Update contact by ID
    @PutMapping("/{id}")
    public Contact updateContact(@PathVariable Long id, @RequestBody Contact updatedContact) {
        return contactService.updateContact(id, updatedContact);
    }

    // ❌ Delete contact by ID
    @DeleteMapping("/{id}")
    public String deleteContact(@PathVariable Long id) {
        boolean deleted = contactService.deleteContact(id);
        return deleted ? "Contact deleted successfully!" : "Contact not found!";
    }
}
