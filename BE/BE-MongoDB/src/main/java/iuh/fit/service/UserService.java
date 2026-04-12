package iuh.fit.service;

import iuh.fit.entity.DTO.UserDTO;
import iuh.fit.entity.User;
import iuh.fit.repository.UserRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    final UserRepository userRepository;

    public UserDTO findUserByEmailAndPassword(String email, String password) {
        Optional<User> userOptional = userRepository.findUserByEmailAndPassword(email, password);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return new UserDTO(user.getId().toString(),user.getName(),user.getImage(), user.getEmail(), user.getPhone(), user.getAddress());
        } else {
            throw new RuntimeException("Email hoặc password nhập sai!");
        }
    }

}
