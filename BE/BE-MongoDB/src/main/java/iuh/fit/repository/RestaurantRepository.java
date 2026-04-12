package iuh.fit.repository;

import iuh.fit.entity.Restaurant;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RestaurantRepository extends MongoRepository<Restaurant, ObjectId> {
    List<Restaurant> findRestaurantsByNameContainingIgnoreCase(String name);

    Restaurant getRestaurantById(ObjectId id);
}
