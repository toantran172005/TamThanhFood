package iuh.fit.controller;

import iuh.fit.entity.DTO.LoginRequest;
import iuh.fit.entity.DTO.UserDTO;
import iuh.fit.entity.User;
import iuh.fit.service.UserService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> userLogin(@RequestBody LoginRequest login) {
        UserDTO userDTO = userService.findUserByEmailAndPassword(login.getEmail(), login.getPassword());
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

}
