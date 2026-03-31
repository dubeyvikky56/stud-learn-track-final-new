package com.tracker.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "courses")
public class Course {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String courseId;
    
    @NotBlank(message = "Course name is required")
    @Size(max = 100, message = "Course name cannot exceed 100 characters")
    private String courseName;
    
    @NotBlank(message = "Instructor name is required")
    @Size(max = 100, message = "Instructor name cannot exceed 100 characters")
    private String instructor;
    
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;
    
    private List<String> students = new ArrayList<>();
    
    private LocalDateTime createdAt = LocalDateTime.now();
}
