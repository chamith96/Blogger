package com.springboot.blogger.service.Imp;

import com.springboot.blogger.dto.AssignDto;
import com.springboot.blogger.dto.NotificationDto;
import com.springboot.blogger.dto.SearchDto;
import com.springboot.blogger.model.Blog;
import com.springboot.blogger.model.User;
import com.springboot.blogger.repository.BlogRepository;
import com.springboot.blogger.repository.UserRepository;
import com.springboot.blogger.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BlogServiceImp implements BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${file.upload-dir}")
    String path;

    @Override
    public List<Blog> findAllBlogByUser(Long userId) {
        return blogRepository.findByUserUidOrderByCreatedAtDesc(userId);
    }

    @Override
    public List<Blog> findAll() {
        return blogRepository.findAll();
    }

    @Override
    public Blog save(Blog blog) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName(); //get logged in username
        User currentUser = userRepository.findByUsername(username);
        blog.setUser(currentUser);

        Date date = new Date();
        blog.setCreatedAt(date);

        return blogRepository.save(blog);
    }

    @Override
    public Optional<Blog> findOne(int bid) {
        return blogRepository.findById(bid);
    }

    @Override
    public void delete(int bid)  {
        Blog blog = findOne(bid).get();
        File file = new File(path+blog.getImageLocation());
        file.delete();
        blogRepository.deleteById(bid);
    }

    @Override
    public List<AssignDto> getAllAssignDetails() {
        return blogRepository.getAllAssignDetails();
    }

    @Override
    public List<NotificationDto> sendNotification(String uid) {
        return blogRepository.sendNotification(uid);
    }

    @Override
    public void assignReviewers(int reviewerId,int blogId) {
        blogRepository.assignReviewer(reviewerId, blogId);
    }

    @Override
    public List<SearchDto> findBlogsByTitle(String title) {
       return blogRepository.searchBlog(title);
    }

    @Override
    public void getNotification(int reviewerId,int blogId) {
        blogRepository.getNotification(reviewerId, blogId);
    }

    @Override
    public String blogCount() {
        return blogRepository.blogCount();
    }

    @Override
    public String countAssignAll() {
        return blogRepository.countAssignAll();
    }

    @Override
    public String countAssignStatus() {
        return blogRepository.countAssignStatus();
    }

}