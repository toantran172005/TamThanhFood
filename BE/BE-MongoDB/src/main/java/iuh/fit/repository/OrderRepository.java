package iuh.fit.repository;

import iuh.fit.entity.Order;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, ObjectId> {
    List<Order> findOrdersByUserId(ObjectId userId);
}
