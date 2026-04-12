package iuh.fit.repository;

import iuh.fit.entity.Cart;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CartRepository extends MongoRepository<Cart, ObjectId> {
    Cart findCartById(ObjectId userId);
}
