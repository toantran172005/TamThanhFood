package iuh.fit.controller;

import iuh.fit.entity.DTO.LoginRequest;
import iuh.fit.entity.DTO.RegisterRequest;
import iuh.fit.entity.DTO.UserDTO;
import iuh.fit.entity.User;
import iuh.fit.service.UserService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> userLogin(@RequestBody LoginRequest login) {
//        System.out.println("Email nhận từ React: [" + login.getEmail() + "]");
//        System.out.println("Pass nhận từ React: [" + login.getPassword() + "]");

        UserDTO userDTO = userService.findUserByEmailAndPassword(login.getEmail(), login.getPassword());
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO) {
        UserDTO newUser = userService.updateUser(userDTO);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<UserDTO> getUserDetails(@PathVariable ObjectId id) {
        UserDTO userDTO = userService.getUserDetails(id);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody RegisterRequest request) {
        try {
            UserDTO newUser = userService.registerUser(request);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED); 
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
