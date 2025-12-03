package com._Home.backend.dto;

import java.util.Set;
import java.util.stream.Collectors;

import com._Home.backend.models.Role;
import com._Home.backend.models.SpecialUser;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpecialUserDTO {
    private Integer id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private Integer propertyId;
    private java.sql.Timestamp createdAt;
    private Set<String> roles;

    public static SpecialUserDTO fromSpecialUser(SpecialUser user) {
        SpecialUserDTO dto = new SpecialUserDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhone(user.getPhone());
        dto.setEmail(user.getEmail());
        dto.setPropertyId(user.getPropertyId());
        dto.setCreatedAt(user.getCreatedAt());
        
        if (user.getRoles() != null) {
            dto.setRoles(user.getRoles().stream()
                .map(Role::getRole)
                .collect(Collectors.toSet()));
        }
        
        return dto;
    }
}
