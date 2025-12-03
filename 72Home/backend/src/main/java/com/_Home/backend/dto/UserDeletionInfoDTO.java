package com._Home.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDeletionInfoDTO {
    private Integer userId;
    private String userName;
    private Integer relatedPropertiesCount;
    private Integer relatedEvaluationsCount;
    private boolean hasRelatedData;
}
