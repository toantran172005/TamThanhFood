package iuh.fit.TTUtil;

import iuh.fit.entity.*;
import iuh.fit.entity.DTO.*;
import iuh.fit.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ConvertData {
    final UserRepository userRepository;

    public VoucherDTO convertVoucherToVoucherDTO(Voucher voucher) {
        VoucherDTO voucherDTO = new VoucherDTO();
        voucherDTO.setId(voucher.getId().toString());
        voucherDTO.setCode(voucher.getCode());
        voucherDTO.setDiscountType(voucher.getDiscountType());
        voucherDTO.setValue(voucher.getValue());
        voucherDTO.setMaxDiscount(voucher.getMaxDiscount());
        voucherDTO.setMinOrder(voucher.getMinOrder());
        voucherDTO.setMaxOrder(voucher.getMaxOrder());
        voucherDTO.setExpiredAt(voucher.getExpiredAt());
        voucherDTO.setIsActive(voucher.getIsActive());

        return voucherDTO;
    }

    public CartDTO convertCartToCartDTO(Cart cart) {
        CartDTO dto = new CartDTO();
        dto.setCartId(cart.getId().toString());
        dto.setItems(cart.getItems());
        return dto;
    }

    public UserDTO convertUserToUserDTO(User user) {
        return new UserDTO(user.getId().toString(),
                user.getName(),user.getImage(),
                user.getEmail(), user.getPhone(),
                user.getAddress());
    }

    public OrderDTO convertOrderToOrderDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId().toString());
        dto.setUserId(order.getUserId().toString());
        dto.setVoucherId(order.getVoucherId() != null ? order.getVoucherId().toString() : "");
        dto.setItems(order.getItems());
        dto.setSubtotal(order.getSubtotal());
        dto.setDiscount(order.getDiscount());
        dto.setPayment(order.getPayment());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setStatus(order.getStatus());
        dto.setAddress(order.getAddress());
        dto.setCreatedAt(order.getCreatedAt());
        return dto;
    }

    public FoodDTO convertFoodToFoodDTO(Food food) {
        FoodDTO foodDTO = new FoodDTO();
        foodDTO.setFoodId(food.getId().toString());
        foodDTO.setName(food.getName());
        foodDTO.setRating(food.getRating());
        foodDTO.setImage(food.getImage());
        foodDTO.setCategory(food.getCategory());
        foodDTO.setSize(food.getSize());
        foodDTO.setPrice(food.getPrice());
        foodDTO.setDescription(food.getDescription());
        foodDTO.setIsAvailable(food.getIsAvailable());
        return foodDTO;
    }

    public Order convertCreateOrderDTOToOrder(CreateOrderDTO dto) {
        Order order = new Order();
        order.setUserId(dto.getUserId());

        String voucherId = dto.getVoucherId();
        if(voucherId == null || voucherId.isEmpty()) {
            order.setVoucherId(null);
        } else {
            order.setVoucherId(new ObjectId(voucherId));
        }

        order.setItems(dto.getItems());
        order.setSubtotal(dto.getSubtotal());
        order.setDiscount(dto.getDiscount());
        order.setTotalPrice(dto.getTotalPrice());
        order.setAddress(dto.getAddress());
        order.setPayment(dto.getPayment());
        order.setCreatedAt(LocalDate.now());
        order.setStatus("PENDING");

        return order;
    }

    public ReviewDTO convertReviewToReviewDTO(Review review) {

        ReviewDTO dto = new ReviewDTO();
        User user = new User();
        Optional<User> userOp = userRepository.findById(review.getUserId());

        if (userOp.isPresent()) {
            user = userOp.get();
        }

        dto.setComment(review.getComment());
        dto.setUserName(user.getName());
        dto.setRating(review.getRating());
        dto.setImage(user.getImage());
        dto.setCreatedAt(review.getCreatedAt());

        return dto;

    }

    public Review convertCreateReviewToReview(CreateReviewDTO dto) {
        Review review = new Review();
        review.setFoodId(dto.getFoodId());
        review.setUserId(dto.getUserId());
        review.setComment(dto.getComment());
        review.setRating(dto.getRating());
        review.setCreatedAt(LocalDate.now());

        return review;
    }
}
