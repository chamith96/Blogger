package com.springboot.blogger.repository;
import com.springboot.blogger.dto.AssignDto;
import com.springboot.blogger.dto.NotificationDto;
import com.springboot.blogger.dto.SearchDto;
import com.springboot.blogger.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {
    Optional<Blog> findById(Integer bid);

    List<Blog> findByUserUidOrderByCreatedAtDesc(Long userId);

    @Query(value = "SELECT b.title,u.username,r.name AS reviewerName,br.status,b.created_at FROM blog AS b, user AS u, reviewer AS r, blog_reviewer AS br WHERE " +
            "b.user_id=u.uid AND r.rid=br.reviewer_id AND b.bid=br.blog_id ORDER BY b.created_at DESC",nativeQuery = true)
    List<AssignDto> getAllAssignDetails();

    @Query(value = "SELECT b.title AS title,r.rid AS reviewerId,b.bid AS blogId,br.status AS status FROM blog AS b, user AS u, reviewer AS r, blog_reviewer AS br WHERE " +
            "b.user_id=u.uid AND r.rid=br.reviewer_id AND b.bid=br.blog_id AND u.uid=?1 AND br.status=0 ORDER BY b.created_at DESC",nativeQuery = true)
    List<NotificationDto> sendNotification(String uid);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO blog_reviewer (status,reviewer_id,blog_id) VALUES (0,?1,?2)", nativeQuery = true)
    void assignReviewer(int reviewerId,int blogId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE blog_reviewer SET status=1 WHERE reviewer_id=?1 AND blog_id=?2", nativeQuery = true)
    void getNotification(int reviewer_id,int blogId);

    @Query(value = "SELECT COUNT(bid) AS blogCount FROM blog", nativeQuery = true)
    String blogCount();

    @Query(value = "SELECT COUNT(status) AS blogCount FROM blog_reviewer", nativeQuery = true)
    String countAssignAll();

    @Query(value = "SELECT COUNT(status) AS blogCount FROM blog_reviewer WHERE status=0", nativeQuery = true)
    String countAssignStatus();

    @Query(value = "SELECT b.title AS title,b.bid AS blogId,u.name AS name, b.created_At from blog AS b,user AS u WHERE b.user_id=u.uid AND b.title LIKE %?1%", nativeQuery = true)
    List<SearchDto> searchBlog(String title);
}
