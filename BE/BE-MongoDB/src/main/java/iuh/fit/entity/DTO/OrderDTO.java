package iuh.fit.entity.DTO;

import lombok.Data;
import org.bson.types.ObjectId;

import java.time.LocalDate;
import java.util.List;

@Data
public class OrderDTO {
    String id;
    String userId;
    String voucherId;
    List<OrderItem> items;
    Double subtotal;
    String address;
    Double discount;
    Double totalPrice;
    String status;
    LocalDate createdAt;
}
