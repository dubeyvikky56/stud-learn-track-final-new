package com.tracker.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Data
@Document(collection = "results")
public class Result {
    @Id
    private String id;
    
    @NotBlank(message = "Student ID is required")
    private String studentId;
    
    @NotBlank(message = "Assessment ID is required")
    private String assessmentId;
    
    @NotNull(message = "Marks obtained is required")
    @Min(value = 0, message = "Marks cannot be negative")
    private Double marksObtained;
    
    private Double percentage;
    
    private String grade;
    
    private LocalDateTime createdAt = LocalDateTime.now();
}
