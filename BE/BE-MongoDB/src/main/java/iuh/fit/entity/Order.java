package iuh.fit.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import iuh.fit.entity.DTO.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "orders")
public class Order {
    @Id
    ObjectId id;
    ObjectId userId;
    ObjectId voucherId;
    List<OrderItem> items;
    Double subtotal;
    String address;
    Double discount;
    Double totalPrice;
    String status;
    String payment;
    LocalDate createdAt;
}
