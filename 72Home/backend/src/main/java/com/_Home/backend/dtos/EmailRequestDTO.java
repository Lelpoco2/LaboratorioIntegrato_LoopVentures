package com._Home.backend.dtos;

import com._Home.backend.models.OmiZone;
import com._Home.backend.models.Property;
import com._Home.backend.models.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailRequestDTO {

    private User user;
    private Property property;

}
