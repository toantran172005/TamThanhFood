package iuh.fit.entity.DTO;

import lombok.Data;

import java.util.List;

@Data
public class CartDTO {
    String cartId;
    List<OrderItem> items;
}
