package iuh.fit.repository;

import iuh.fit.entity.Food;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FoodRepository extends MongoRepository<Food, ObjectId> {
    Page<Food> findAll(Pageable pageable);

    Page<Food> findByNameContainingIgnoreCase(String name, Pageable pageable);

}
