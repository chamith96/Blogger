package com.springboot.blogger.repository;

import com.springboot.blogger.model.Email;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<Email,Long> {
}
