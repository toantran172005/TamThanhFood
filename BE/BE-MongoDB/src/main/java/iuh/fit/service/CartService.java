package iuh.fit.service;

import iuh.fit.entity.Cart;
import iuh.fit.entity.DTO.CartDTO;
import iuh.fit.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {
    final CartRepository cartRepository;

    public CartDTO getCartByUserId(ObjectId userId) {
        Cart cart = cartRepository.findCartById(userId);
        CartDTO cartDTO = new CartDTO();
        cartDTO.setCartId(cart.getId().toString());
        cartDTO.setItems(cart.getItems());
        return cartDTO;
    }
}
