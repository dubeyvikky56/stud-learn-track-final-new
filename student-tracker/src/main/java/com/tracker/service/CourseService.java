package com.tracker.service;

import com.tracker.model.Course;
import com.tracker.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    
    public Course getCourseById(String id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }
    
    public Course createCourse(Course course) {
        course.setCourseId("CSE" + System.currentTimeMillis());
        return courseRepository.save(course);
    }
}
