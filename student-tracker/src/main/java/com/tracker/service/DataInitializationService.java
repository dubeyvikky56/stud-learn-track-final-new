package com.tracker.service;

import com.tracker.model.*;
import com.tracker.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class DataInitializationService implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final AssessmentRepository assessmentRepository;
    private final ResultRepository resultRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Only initialize if database is empty
        if (userRepository.count() == 0) {
            initializeData();
        }
    }

    private void initializeData() {
        // Create Admin User
        User admin = new User();
        admin.setName("Admin User");
        admin.setEmail("admin@test.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(User.Role.ADMIN);
        userRepository.save(admin);

        // Create Student User
        User studentUser = new User();
        studentUser.setName("John Doe");
        studentUser.setEmail("student@test.com");
        studentUser.setPassword(passwordEncoder.encode("student123"));
        studentUser.setRole(User.Role.STUDENT);
        userRepository.save(studentUser);

        // Create Students
        Student student1 = new Student();
        student1.setStudentId("STU" + System.currentTimeMillis());
        student1.setName("John Doe");
        student1.setEmail("student@test.com");
        studentRepository.save(student1);

        Student student2 = new Student();
        student2.setStudentId("STU" + (System.currentTimeMillis() + 1));
        student2.setName("Jane Smith");
        student2.setEmail("jane@test.com");
        studentRepository.save(student2);

        Student student3 = new Student();
        student3.setStudentId("STU" + (System.currentTimeMillis() + 2));
        student3.setName("Mike Johnson");
        student3.setEmail("mike@test.com");
        studentRepository.save(student3);

        // Create Courses
        Course course1 = new Course();
        course1.setCourseId("CSE" + System.currentTimeMillis());
        course1.setCourseName("Data Structures and Algorithms");
        course1.setInstructor("Dr. Smith");
        course1.setDescription("Fundamental data structures and algorithms");
        courseRepository.save(course1);

        Course course2 = new Course();
        course2.setCourseId("CSE" + (System.currentTimeMillis() + 1));
        course2.setCourseName("Database Management Systems");
        course2.setInstructor("Prof. Johnson");
        course2.setDescription("Database design and management");
        courseRepository.save(course2);

        Course course3 = new Course();
        course3.setCourseId("CSE" + (System.currentTimeMillis() + 2));
        course3.setCourseName("Web Development");
        course3.setInstructor("Dr. Brown");
        course3.setDescription("Full-stack web development");
        courseRepository.save(course3);

        // Create Assessments
        Assessment assessment1 = new Assessment();
        assessment1.setAssessmentId("ASM" + System.currentTimeMillis());
        assessment1.setCourseId(course1.getId());
        assessment1.setTitle("Midterm Exam");
        assessment1.setAssessmentType(Assessment.AssessmentType.EXAM);
        assessment1.setMaxMarks(100);
        assessment1.setDate(LocalDate.now().minusDays(10));
        assessment1.setDescription("Midterm examination covering first half of syllabus");
        assessmentRepository.save(assessment1);

        Assessment assessment2 = new Assessment();
        assessment2.setAssessmentId("ASM" + (System.currentTimeMillis() + 1));
        assessment2.setCourseId(course2.getId());
        assessment2.setTitle("Database Project");
        assessment2.setAssessmentType(Assessment.AssessmentType.PROJECT);
        assessment2.setMaxMarks(50);
        assessment2.setDate(LocalDate.now().minusDays(5));
        assessment2.setDescription("Design and implement a database system");
        assessmentRepository.save(assessment2);

        Assessment assessment3 = new Assessment();
        assessment3.setAssessmentId("ASM" + (System.currentTimeMillis() + 2));
        assessment3.setCourseId(course3.getId());
        assessment3.setTitle("Quiz 1");
        assessment3.setAssessmentType(Assessment.AssessmentType.QUIZ);
        assessment3.setMaxMarks(25);
        assessment3.setDate(LocalDate.now().minusDays(3));
        assessment3.setDescription("HTML and CSS basics");
        assessmentRepository.save(assessment3);

        // Create Results
        Result result1 = new Result();
        result1.setStudentId(student1.getId());
        result1.setAssessmentId(assessment1.getId());
        result1.setMarksObtained(85.0);
        result1.setPercentage(85.0);
        result1.setGrade("A");
        resultRepository.save(result1);

        Result result2 = new Result();
        result2.setStudentId(student1.getId());
        result2.setAssessmentId(assessment2.getId());
        result2.setMarksObtained(42.0);
        result2.setPercentage(84.0);
        result2.setGrade("A");
        resultRepository.save(result2);

        Result result3 = new Result();
        result3.setStudentId(student2.getId());
        result3.setAssessmentId(assessment1.getId());
        result3.setMarksObtained(78.0);
        result3.setPercentage(78.0);
        result3.setGrade("B+");
        resultRepository.save(result3);

        Result result4 = new Result();
        result4.setStudentId(student3.getId());
        result4.setAssessmentId(assessment3.getId());
        result4.setMarksObtained(20.0);
        result4.setPercentage(80.0);
        result4.setGrade("A");
        resultRepository.save(result4);

        System.out.println("✅ Demo data initialized successfully!");
        System.out.println("🔐 Admin Login: admin@test.com / admin123");
        System.out.println("👤 Student Login: student@test.com / student123");
    }
}