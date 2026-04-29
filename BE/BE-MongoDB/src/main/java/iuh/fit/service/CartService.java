package iuh.fit.service;

import iuh.fit.TTUtil.ConvertData;
import iuh.fit.entity.Cart;
import iuh.fit.entity.DTO.AddToCartDTO;
import iuh.fit.entity.DTO.CartDTO;
import iuh.fit.entity.DTO.OrderItem;
import iuh.fit.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
    final CartRepository cartRepository;
    final ConvertData convertData;

    public CartDTO deleteItemFromCart(ObjectId userId, ObjectId foodId) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng của người dùng này!"));

        boolean removed = cart.getItems().removeIf(item ->
                item.getFoodId().equals(foodId.toString())
        );

        if (!removed) {
            throw new RuntimeException("Sản phẩm không có trong giỏ hàng!");
        }

        Cart savedCart = cartRepository.save(cart);

        return convertData.convertCartToCartDTO(savedCart);
    }

    public CartDTO getCartByUserId(ObjectId userId) {
        Optional<Cart> cartOp = cartRepository.findByUserId(userId);

        if(cartOp.isPresent()) {
            Cart cart = cartOp.get();
            return convertData.convertCartToCartDTO(cart);
        } else {
            throw new RuntimeException("Không tìm thấy giỏ hàng!");
        }
    }

    public CartDTO addToCart(AddToCartDTO dto) {
        ObjectId userObjectId = new ObjectId(dto.getUserId());

        Cart cart = cartRepository.findByUserId(userObjectId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(userObjectId);
                    newCart.setItems(new ArrayList<>());
                    return newCart;
                });

        Optional<OrderItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getFoodId().equals(dto.getFoodId()))
                .filter(item -> item.getSize().equals(dto.getSize()))
                .findFirst();

        if (existingItem.isPresent()) {
            OrderItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + dto.getQuantity());
        } else {
            OrderItem newItem = new OrderItem();
            newItem.setFoodId(dto.getFoodId());
            newItem.setFoodName(dto.getFoodName());
            newItem.setQuantity(dto.getQuantity());
            newItem.setPrice(dto.getPrice());
            newItem.setSize(dto.getSize());
            newItem.setNote(dto.getNote());

            cart.getItems().add(newItem);
        }

        Cart savedCart = cartRepository.save(cart);

        return convertData.convertCartToCartDTO(savedCart);
    }

}
