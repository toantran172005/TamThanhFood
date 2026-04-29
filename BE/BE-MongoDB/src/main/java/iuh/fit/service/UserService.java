package iuh.fit.service;

import iuh.fit.TTUtil.ConvertData;
import iuh.fit.entity.DTO.UserDTO;
import iuh.fit.entity.User;
import iuh.fit.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    final UserRepository userRepository;
    final ConvertData convertData;

    public UserDTO findUserByEmailAndPassword(String email, String password) {
        Optional<User> userOptional = userRepository.findUserByEmailAndPassword(email, password);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return convertData.convertUserToUserDTO(user);
        } else {
            throw new RuntimeException("Email hoặc password nhập sai!");
        }
    }

    public UserDTO updateUser(UserDTO userDTO) {
        ObjectId id = new ObjectId(userDTO.getUserId());

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + userDTO.getUserId()));

        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setImage(userDTO.getImage());
        user.setAddress(userDTO.getAddress());

        User updatedUser = userRepository.save(user);

        return convertData.convertUserToUserDTO(updatedUser);
    }

}
