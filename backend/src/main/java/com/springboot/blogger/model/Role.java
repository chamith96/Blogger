package com.springboot.blogger.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "role")
public class Role {

    public Role() {
    }

    public Role(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int Id;

    private String name;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
