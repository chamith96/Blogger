package com.springboot.blogger.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="reviewer")
public class Reviewer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rid;
    private String name;
    private String organization;
    private String position;

    @OneToMany(mappedBy = "reviewer", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<BlogReviewer> blogReviewer;

    public Reviewer() {
    }

    public Reviewer(String name, String organization, String position, Set<BlogReviewer> blogReviewer) {
        this.name = name;
        this.organization = organization;
        this.position = position;
        this.blogReviewer = blogReviewer;
    }

    public int getRid() {
        return rid;
    }

    public void setRid(int rid) {
        this.rid = rid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Set<BlogReviewer> getBlogReviewer() {
        return blogReviewer;
    }

    public void setBlogReviewer(Set<BlogReviewer> blogReviewer) {
        this.blogReviewer = blogReviewer;
    }
}
