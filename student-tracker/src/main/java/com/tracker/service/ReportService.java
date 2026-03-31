package com.tracker.service;

import com.tracker.model.*;
import com.tracker.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ResultRepository resultRepository;
    private final StudentRepository studentRepository;
    private final AssessmentRepository assessmentRepository;
    
    public Map<String, Object> getPerformanceReport(String studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        List<Result> results = resultRepository.findByStudentId(studentId);
        
        double avgPercentage = results.stream()
                .mapToDouble(Result::getPercentage)
                .average()
                .orElse(0.0);
        
        Map<String, Object> report = new HashMap<>();
        report.put("student", student);
        report.put("results", results);
        report.put("averagePercentage", avgPercentage);
        report.put("totalAssessments", results.size());
        
        return report;
    }
}
