package com.tracker.service;

import com.tracker.model.*;
import com.tracker.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultService {
    private final ResultRepository resultRepository;
    private final AssessmentRepository assessmentRepository;
    
    public Result createResult(Result result) {
        Assessment assessment = assessmentRepository.findById(result.getAssessmentId())
                .orElseThrow(() -> new RuntimeException("Assessment not found"));
        
        double percentage = (result.getMarksObtained() / assessment.getMaxMarks()) * 100;
        result.setPercentage(percentage);
        result.setGrade(calculateGrade(percentage));
        
        return resultRepository.save(result);
    }
    
    public List<Result> getResultsByStudent(String studentId) {
        return resultRepository.findByStudentId(studentId);
    }
    
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }
    
    private String calculateGrade(double percentage) {
        if (percentage >= 90) return "A+";
        if (percentage >= 80) return "A";
        if (percentage >= 70) return "B+";
        if (percentage >= 60) return "B";
        if (percentage >= 50) return "C+";
        if (percentage >= 40) return "C";
        if (percentage >= 33) return "D";
        return "F";
    }
}
