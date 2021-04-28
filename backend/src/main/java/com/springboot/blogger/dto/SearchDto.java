package com.springboot.blogger.dto;

import java.util.Date;

public interface SearchDto {

    String getName();

    Integer getBlogId();

    String getTitle();

    Date getCreated_At();

}
