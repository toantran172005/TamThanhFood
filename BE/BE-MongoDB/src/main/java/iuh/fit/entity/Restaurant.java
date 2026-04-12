package iuh.fit.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "restaurants")
public class Restaurant {
    @Id
    ObjectId id;
    String name;
    String address;
    String phone;
    String image;
    Double rating;
    String openTime;
    String closeTime;
}
