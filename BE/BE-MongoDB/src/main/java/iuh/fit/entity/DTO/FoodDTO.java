package iuh.fit.entity.DTO;

import lombok.Data;

import java.util.List;

@Data
public class FoodDTO {
    String foodId;
    String description;
    String category;
    String name;
    Double rating;
    String image;
    List<String> size;
    List<Double> price;
    Boolean isAvailable;
}
