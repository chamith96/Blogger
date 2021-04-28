package com.springboot.blogger.service.Imp;

import com.springboot.blogger.exception.ApiRequestException;
import com.springboot.blogger.model.Email;
import com.springboot.blogger.model.Role;
import com.springboot.blogger.model.User;
import com.springboot.blogger.repository.EmailRepository;
import com.springboot.blogger.repository.RoleRepository;
import com.springboot.blogger.repository.UserRepository;
import com.springboot.blogger.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.regex.Pattern;

@Service(value = "userServices")
@Transactional
public class UserServiceImp implements UserDetailsService, UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private EmailRepository emailRepository;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRole().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        });
        return authorities;
    }

    @Override
    public void save(User user) {

        User userError = findOne(user.getUsername());
        if (userError != null) throw new ApiRequestException("user already exist");

        if ((user.getName() == null && user.getUsername() == null) || user.getName() == null || user.getUsername() == null) {
            throw new ApiRequestException("username or name cannot empty");
        } else {
            if (Pattern.matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,8}$", user.getPassword())) {
                if (Pattern.matches("^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$", user.getUsername())) {
                    user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
                    Role roles = roleRepository.findRoleByName(user.getUserRole());
                    user.setRole(new HashSet<>(Collections.singleton(roles)));

                    userRepository.save(user);
                } else {
                    throw new ApiRequestException("email validation fail");
                }
            } else {
                throw new ApiRequestException("password complexity not match");
            }
        }
    }

    @Override
    public User findOne(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findOneById(long userId) {
        return userRepository.findAllByUid(userId);
    }

    @Override
    public Email sendEmail(Email email, long userId) throws MailException {
        User user = userRepository.findAllByUid(userId).get();

        //send mail
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(user.getUsername());
        msg.setSubject(email.getTitle());
        msg.setText(email.getBody());
        javaMailSender.send(msg);

        //save email
        email.setUser(user);
        emailRepository.save(email);

        return email;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public void update(User user) {
        userRepository.save(user);
    }

    @Override
    public List<Email> showEmails() {
        return emailRepository.findAll();
    }

    @Override
    public String userClount() {
        return userRepository.countAllByUid();
    }

}
