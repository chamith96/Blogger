package com.springboot.blogger.controller;
import com.springboot.blogger.dto.AssignDto;
import com.springboot.blogger.dto.MessageDto;
import com.springboot.blogger.dto.NotificationDto;
import com.springboot.blogger.dto.SearchDto;
import com.springboot.blogger.exception.ApiRequestException;
import com.springboot.blogger.model.Blog;
import com.springboot.blogger.model.Reviewer;
import com.springboot.blogger.service.BlogService;
import com.springboot.blogger.service.ReviewerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class BlogController {

    @Value("${file.upload-dir}")
    String fileBasePath;

    @Autowired
    private BlogService blogService;

    @Autowired
    private ReviewerService reviewerService;


    @RequestMapping("/blog/all")
    public List<Blog> findAll() {
        return blogService.findAll();
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.POST, value = "/blog")
    public Blog addBlog(@RequestBody Blog blog) {
        return blogService.save(blog);
    }

    @RequestMapping("/blog/all/{bid}")
    public Optional<Blog> findOneBlog(@PathVariable int bid) {
        return blogService.findOne(bid);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.DELETE, value= "/blog/{bid}")
    public MessageDto deleteBlog(@PathVariable int bid) {
        blogService.delete(bid);
        return new MessageDto("blog has been deleted");
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.PUT, value = "/blog/{bid}")
    public void editBlog(@RequestBody Blog blog, @PathVariable int bid) {
        Blog bl =  blogService.findOne(bid).get();
        if(bl != null) {
            bl.setTitle(blog.getTitle());
            bl.setContent(blog.getContent());
            blogService.save(bl);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(method = RequestMethod.POST, value = "/blog/{blogId}/reviewer/{reviewerId}")
    public MessageDto assignReviewer(@PathVariable int blogId, @PathVariable int reviewerId) {
        Reviewer reviewer = reviewerService.findById(reviewerId).get();
        Blog blog = blogService.findOne(blogId).get();

        if(reviewer!=null && blog!=null) {
            blogService.assignReviewers(reviewer.getRid(),blog.getId());
            return new MessageDto("reviewer is assigned");
        }  else
            throw new ApiRequestException("cannot find a reviewer or blog");
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @RequestMapping("/blog/user/{userId}")
    public List<Blog> findAllBlogByUser(@PathVariable Long userId) {
        return blogService.findAllBlogByUser(userId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/blog/assign")
    public List<AssignDto> getAllAssignDetails() {
        return blogService.getAllAssignDetails();
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @RequestMapping(value = "/blog/upload/{blogId}",method = RequestMethod.PUT)
    public ResponseEntity uploadToLocalFileSystem(@RequestParam("file") MultipartFile file,@PathVariable int blogId) {
        Date date = new Date();
        String file_name = file.getOriginalFilename();
        String dateString = String.valueOf(date.getTime());

        String finalFile = dateString.concat(file_name);

        String fileName = StringUtils.cleanPath(finalFile);

        Path path = Paths.get(fileBasePath + fileName);
        try {
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            Blog bl =  blogService.findOne(blogId).get();
            if(bl != null) {
                bl.setImageLocation(fileName);
                blogService.save(bl);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(new MessageDto(finalFile+" is uploaded"));
    }

    @RequestMapping("/blog/all/search/{title}")
    public List<SearchDto> findAllBlogByTitle(@PathVariable String title) {
        return blogService.findBlogsByTitle(title);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @RequestMapping("/notification/blog/{uid}")
    public List<NotificationDto> sendNotification(@PathVariable String uid) {
        return blogService.sendNotification(uid);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.PUT, value = "/notification/blog/{blogId}/reviewer/{reviewerId}")
    public MessageDto getNotification(@PathVariable int blogId, @PathVariable int reviewerId) {
        Blog blog = blogService.findOne(blogId).get();
        Reviewer reviewer = reviewerService.findById(reviewerId).get();

        if(blog!=null && reviewer!=null) {
            blogService.getNotification(reviewer.getRid(),blog.getId());
            return new MessageDto("status is updated");
        }  else
            throw new ApiRequestException("cannot find a reviewer or blog");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/blog/count")
    public String blogCount() {
        return blogService.blogCount();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/blog/count/assign")
    public String blogCountAssign() {
        return blogService.countAssignAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/blog/count/assign/status")
    public String blogCountAssignStatus() {
        return blogService.countAssignStatus();
    }
}