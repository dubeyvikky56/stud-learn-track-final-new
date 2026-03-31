package com.tracker.repository;

import com.tracker.model.Result;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ResultRepository extends MongoRepository<Result, String> {
    List<Result> findByStudentId(String studentId);
    List<Result> findByAssessmentId(String assessmentId);
}
