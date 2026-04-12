package iuh.fit.entity;

import iuh.fit.entity.DTO.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "carts")
public class Cart {
    @Id
    ObjectId id;
    ObjectId userId;
    List<OrderItem> items;
}
