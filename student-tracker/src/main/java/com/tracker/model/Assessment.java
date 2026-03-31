package com.tracker.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Document(collection = "assessments")
public class Assessment {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String assessmentId;
    
    @NotBlank(message = "Course ID is required")
    private String courseId;
    
    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title cannot exceed 100 characters")
    private String title;
    
    @NotNull(message = "Assessment type is required")
    private AssessmentType assessmentType;
    
    @NotNull(message = "Maximum marks is required")
    @Min(value = 1, message = "Maximum marks must be greater than 0")
    private Integer maxMarks;
    
    @NotNull(message = "Assessment date is required")
    private LocalDate date;
    
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;
    
    private LocalDateTime createdAt = LocalDateTime.now();
    
    public enum AssessmentType {
        QUIZ, ASSIGNMENT, EXAM, PROJECT
    }
}
