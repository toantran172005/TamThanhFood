package iuh.fit.controller;

import iuh.fit.entity.DTO.AddToCartDTO;
import iuh.fit.entity.DTO.CartDTO;
import iuh.fit.service.CartService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    final CartService cartService;

    @GetMapping("/{id}")
    public ResponseEntity<CartDTO> getCart(@PathVariable ObjectId id) {
        CartDTO newCart = cartService.getCartByUserId(id);
        return new ResponseEntity<>(newCart, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<CartDTO> addToCart(
            @RequestBody AddToCartDTO cartDTO
            ) {
        CartDTO newCart = cartService.addToCart(cartDTO);
        return new ResponseEntity<>(newCart, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{userId}/{foodId}")
    public ResponseEntity<CartDTO> deleteItem(
            @PathVariable ObjectId userId,
            @PathVariable ObjectId foodId) {
        CartDTO updatedCart = cartService.deleteItemFromCart(userId, foodId);
        return new ResponseEntity<>(updatedCart, HttpStatus.OK);
    }

}
