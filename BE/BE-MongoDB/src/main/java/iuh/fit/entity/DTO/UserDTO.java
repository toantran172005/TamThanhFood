package iuh.fit.entity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    String userId;
    String name;
    String email;
    String phone;
    String image;
    List<String> address;
}
