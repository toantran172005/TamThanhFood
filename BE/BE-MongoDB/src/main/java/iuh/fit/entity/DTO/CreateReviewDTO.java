package iuh.fit.entity.DTO;

import lombok.Data;
import org.bson.types.ObjectId;

@Data
public class CreateReviewDTO {
    ObjectId foodId;
    ObjectId userId;
    Double rating;
    String comment;
}
