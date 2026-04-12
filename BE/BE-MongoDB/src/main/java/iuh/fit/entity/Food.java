package iuh.fit.entity;

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
@Document(collection = "foods")
public class Food {
    @Id
    ObjectId id;
    String name;
    String description;
    Double rating;
    List<Double> price;
    List<String> size;
    String image;
    String category;
    Boolean isAvailable;
}
