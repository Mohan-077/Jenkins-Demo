import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get(API_URL);
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add contact
  const addContact = async () => {
    try {
      await axios.post(API_URL, form);
      setForm({ firstName: "", lastName: "", phoneNumber: "", email: "", address: "" });
      fetchContacts();
    } catch (err) {
      console.error("Error adding contact:", err);
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchContacts();
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📇 Contact Manager</h1>

      {/* Add Contact Form */}
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Contact</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <button
          onClick={addContact}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Add Contact
        </button>
      </div>

      {/* Contact List */}
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">All Contacts</h2>
        {contacts.length === 0 ? (
          <p className="text-gray-500">No contacts found.</p>
        ) : (
          <ul>
            {contacts.map((contact) => (
              <li
                key={contact.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p className="font-semibold">
                    {contact.firstName} {contact.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{contact.phoneNumber}</p>
                  <p className="text-sm text-gray-600">{contact.email}</p>
                  <p className="text-sm text-gray-600">{contact.address}</p>
                </div>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
