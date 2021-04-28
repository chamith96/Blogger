package com.springboot.blogger.service;

import com.springboot.blogger.model.Email;
import com.springboot.blogger.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User findOne(String username);

    void save(User user);

    Optional<User> findOneById(long userId);

    Email sendEmail(Email email, long userId);

    List<User> findAll();

    void update(User user);

    List<Email> showEmails();

    String userClount();
}
