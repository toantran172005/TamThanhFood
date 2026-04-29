package iuh.fit.entity.DTO;

import lombok.Data;
import org.bson.types.ObjectId;

import java.util.List;

@Data
public class CreateOrderDTO {
    ObjectId userId;
    String voucherId;
    List<OrderItem> items;
    Double subtotal;
    Double discount;
    Double totalPrice;
    String address;
    String payment;
}
