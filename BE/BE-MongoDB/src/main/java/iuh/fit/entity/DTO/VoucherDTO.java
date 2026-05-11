package iuh.fit.entity.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class VoucherDTO {
    String id;
    String code;
    String discountType;
    Double value;
    Double minOrder;
    Double maxOrder;
    Double maxDiscount;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    LocalDate expiredAt;
    Boolean isActive;
}
