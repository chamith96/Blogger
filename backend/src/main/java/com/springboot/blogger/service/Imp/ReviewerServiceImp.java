package com.springboot.blogger.service.Imp;

import com.springboot.blogger.model.Reviewer;
import com.springboot.blogger.repository.ReviewerRepository;
import com.springboot.blogger.service.ReviewerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewerServiceImp implements ReviewerService {

    @Autowired
    private ReviewerRepository reviewerRepository;

    @Override
    public List<Reviewer> findAll() {
        return reviewerRepository.findAll();
    }

    @Override
    public Optional<Reviewer> findById(int id) {
        return reviewerRepository.findById(id);
    }

    @Override
    public void save(Reviewer reviewer) {
        reviewerRepository.save(reviewer);
    }

    @Override
    public void edit(Reviewer reviewer) {
        reviewerRepository.save(reviewer);
    }

    @Override
    public void delete(int id) {
        reviewerRepository.deleteById(id);
    }

    @Override
    public String countAll() {
        return reviewerRepository.countAll();
    }
}

