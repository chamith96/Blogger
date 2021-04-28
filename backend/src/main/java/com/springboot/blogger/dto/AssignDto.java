package com.springboot.blogger.dto;

import java.util.Date;

public interface AssignDto {

    String getTitle();

    String getUsername();

    String getReviewerName();

    Integer getStatus();

    Date getCreated_at();
}
