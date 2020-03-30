package com.springboot.blogger.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Entity
public class BlogReviewer implements Serializable {

    public BlogReviewer() {
    }

    public BlogReviewer(Blog blog, Reviewer reviewer, int status) {
        this.blog = blog;
        this.reviewer = reviewer;
        this.status = status;
    }

    @Id
    @ManyToOne
    @JoinColumn(name = "BLOG_ID")
    private Blog blog;

    @Id
    @ManyToOne
    @JoinColumn(name = "REVIEWER_ID")
    private Reviewer reviewer;

    private int status;

    public Blog getBlog() {
        return blog;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
    }

    public Reviewer getReviewer() {
        return reviewer;
    }

    public void setReviewer(Reviewer reviewer) {
        this.reviewer = reviewer;
    }

    public int isStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
