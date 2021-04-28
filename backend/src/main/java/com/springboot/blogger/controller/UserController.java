package com.springboot.blogger.controller;

import com.springboot.blogger.config.security.JwtTokenUtil;
import com.springboot.blogger.dto.MessageDto;
import com.springboot.blogger.dto.TokenDto;
import com.springboot.blogger.dto.UserDto;
import com.springboot.blogger.exception.ApiRequestException;
import com.springboot.blogger.model.Email;
import com.springboot.blogger.model.User;
import com.springboot.blogger.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @RequestMapping(method = RequestMethod.POST, value = "/user/login")
    public TokenDto login(@RequestBody User loginUser) throws AuthenticationException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword()));
        String token = jwtTokenUtil.generateToken(authentication);
        return new TokenDto(token);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/user/register")
    public ResponseEntity<Object> register(@RequestBody User user) throws ApiRequestException {
        UserDto userDto = new UserDto();
        userService.save(user);
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());
        userDto.setUid(user.getUid());
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(method = RequestMethod.POST, value = "/user/email/{uid}")
    public Email sendEmail(@RequestBody Email email, @PathVariable long uid) {
        return userService.sendEmail(email, uid);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @RequestMapping("/user/{uid}")
    public Optional<User> findUserById(@PathVariable long uid) {
        return userService.findOneById(uid);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/user")
    public List<User> findAll() {
        return userService.findAll();
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.PUT, value = "/user/{uid}")
    public MessageDto editUser(@RequestBody User user, @PathVariable long uid) {
        User usr = userService.findOneById(uid).get();
        if (usr != null) {
            usr.setDescription(user.getDescription());
            userService.update(usr);
        }

        return new MessageDto("User description updated");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/email")
    public List<Email> findAllEmails() {
        return userService.showEmails();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/user/count")
    public String userCount() {
        return userService.userClount();
    }
}
