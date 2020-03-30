package com.springboot.blogger.repository;

import com.springboot.blogger.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    Optional<User> findAllByUid(long userId);

    @Query(value = "SELECT COUNT(username) AS UserCount FROM user", nativeQuery = true)
    String countAllByUid();
}
