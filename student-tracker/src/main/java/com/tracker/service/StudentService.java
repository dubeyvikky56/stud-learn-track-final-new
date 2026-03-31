package com.tracker.service;

import com.tracker.model.Student;
import com.tracker.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    public Student getStudentById(String id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }
    
    public Student createStudent(Student student) {
        student.setStudentId("STU" + System.currentTimeMillis());
        return studentRepository.save(student);
    }
    
    public Student updateStudent(String id, Student student) {
        Student existing = getStudentById(id);
        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setCourses(student.getCourses());
        return studentRepository.save(existing);
    }
    
    public void deleteStudent(String id) {
        studentRepository.deleteById(id);
    }
}
