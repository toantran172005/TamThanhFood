package iuh.fit.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.cglib.core.Local;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "vouchers")
public class Voucher {
    @Id
    ObjectId id;
    String code;
    String discountType;
    Double value;
    Double minOrder;
    Double maxOrder;
    Double maxDiscount;
    LocalDate expiredAt;
    Boolean isActive;

}
