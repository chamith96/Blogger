package com.springboot.blogger.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name="blog")

public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bid;

    @NotNull
    private String title;

    @NotNull
    @Type(type="text")
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<BlogReviewer> blogReviewer;

    @NotNull
    private Date createdAt;

    private String imageLocation;

    public Blog() {
    }

    public Blog(String title, String content, User user, Set<BlogReviewer> blogReviewer) {
        this.title = title;
        this.content = content;
        this.user = user;
        this.blogReviewer = blogReviewer;
    }

    public void setId(int bid) {
        this.bid = bid;
    }

    public int getId() {
        return bid;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getBid() {
        return bid;
    }

    public void setBid(int bid) {
        this.bid = bid;
    }

    public Set<BlogReviewer> getBlogReviewer() {
        return blogReviewer;
    }

    public void setBlogReviewer(Set<BlogReviewer> blogReviewer) {
        this.blogReviewer = blogReviewer;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getImageLocation() {
        return imageLocation;
    }

    public void setImageLocation(String imageLocation) {
        this.imageLocation = imageLocation;
    }
}
