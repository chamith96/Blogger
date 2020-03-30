package com.springboot.blogger.repository;

import com.springboot.blogger.model.Reviewer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReviewerRepository extends JpaRepository<Reviewer, Integer> {

    @Query(value = "SELECT COUNT(rid) AS reviewerCount FROM reviewer", nativeQuery = true)
    String countAll();
}
