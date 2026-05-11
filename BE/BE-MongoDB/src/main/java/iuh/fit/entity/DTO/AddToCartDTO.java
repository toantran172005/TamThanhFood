package iuh.fit.entity.DTO;

import lombok.Data;

@Data
public class AddToCartDTO {
    String userId;
    String foodId;
    String foodName;
    int quantity;
    Double price;
    String size;
    String note;
}
