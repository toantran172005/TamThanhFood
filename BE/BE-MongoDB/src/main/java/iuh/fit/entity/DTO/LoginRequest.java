package iuh.fit.entity.DTO;

import lombok.Data;

@Data
public class LoginRequest {
    String email;
    String password;
}
