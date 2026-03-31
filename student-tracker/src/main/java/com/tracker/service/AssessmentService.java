package com.tracker.service;

import com.tracker.model.Assessment;
import com.tracker.repository.AssessmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssessmentService {
    private final AssessmentRepository assessmentRepository;
    
    public List<Assessment> getAllAssessments() {
        return assessmentRepository.findAll();
    }
    
    public Assessment getAssessmentById(String id) {
        return assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));
    }
    
    public Assessment createAssessment(Assessment assessment) {
        assessment.setAssessmentId("ASM" + System.currentTimeMillis());
        return assessmentRepository.save(assessment);
    }
    
    public List<Assessment> getAssessmentsByCourse(String courseId) {
        return assessmentRepository.findByCourseId(courseId);
    }
}
