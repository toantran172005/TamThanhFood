package iuh.fit.repository;

import iuh.fit.entity.Food;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface FoodRepository extends MongoRepository<Food, ObjectId> {

    Page<Food> findByNameContainingIgnoreCaseAndCategoryContainingIgnoreCase(
            String name, String category, Pageable pageable);

    @Aggregation(pipeline = {
            "{ '$group': { '_id': '$category' } }"
    })
    List<String> getAllCategories();

    Food findFoodById(ObjectId id);
}
