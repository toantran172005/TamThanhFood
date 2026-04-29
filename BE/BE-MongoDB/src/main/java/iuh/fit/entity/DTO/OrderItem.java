package iuh.fit.entity.DTO;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;


@Data
public class OrderItem {
    @Field(targetType = FieldType.OBJECT_ID)
    String foodId;

    String foodName;
    int quantity;
    Double price;
    String size;
    String note;
}
