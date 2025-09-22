package com.mohan.contact;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepo extends JpaRepository<Contact, Long> {
    
    // You can define custom query methods here if needed, for example:
    Contact findByPhoneNumber(String phoneNumber);
    Contact findByEmail(String email);
}
