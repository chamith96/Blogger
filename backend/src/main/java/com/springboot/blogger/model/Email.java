package com.springboot.blogger.model;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "email")
public class Email {

    public Email() {
    }

    public Email(@NotNull String title, @NotNull String body, User user) {
        this.title = title;
        this.body = body;
        this.user = user;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String title;

    @NotNull
    @Type(type = "text")
    private String body;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
