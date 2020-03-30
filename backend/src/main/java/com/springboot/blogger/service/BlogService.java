package com.springboot.blogger.service;

import com.springboot.blogger.dto.AssignDto;
import com.springboot.blogger.dto.NotificationDto;
import com.springboot.blogger.dto.SearchDto;
import com.springboot.blogger.model.Blog;

import java.util.List;
import java.util.Optional;

public interface BlogService {

    List<Blog> findAllBlogByUser(Long userId);
    List<Blog> findAll();
    Optional<Blog> findOne(int bid);
    Blog save(Blog blog);
    void delete(int bid);
    List<AssignDto> getAllAssignDetails();
    List<NotificationDto> sendNotification(String uid);
    void assignReviewers(int reviewerId, int blogId);
    List<SearchDto> findBlogsByTitle(String title);
    String blogCount();
    void getNotification(int reviewerId,int blogId);
    String countAssignAll();
    String countAssignStatus();
}
