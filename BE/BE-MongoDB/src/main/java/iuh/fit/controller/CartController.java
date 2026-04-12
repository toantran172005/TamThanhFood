package iuh.fit.controller;

import iuh.fit.entity.DTO.CartDTO;
import iuh.fit.service.CartService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    final CartService cartService;

    @GetMapping("/{id}")
    public ResponseEntity<CartDTO> getCart(@PathVariable ObjectId id) {
        return new ResponseEntity<>(cartService.getCartByUserId(id), HttpStatus.OK);
    }
}
