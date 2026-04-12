package iuh.fit.service;

import ch.qos.logback.core.util.StringUtil;
import iuh.fit.entity.DTO.OrderDTO;
import iuh.fit.entity.Order;
import iuh.fit.entity.Restaurant;
import iuh.fit.entity.User;
import iuh.fit.repository.OrderRepository;
import iuh.fit.repository.RestaurantRepository;
import iuh.fit.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    final OrderRepository orderRepository;
    final UserRepository userRepository;

    public List<OrderDTO> getListOrderByUserId(ObjectId userId) {
        if (userId == null) {
            throw new RuntimeException("Bạn cần đăng nhập để xem các đơn hàng của mình!");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại với ID: " + userId));

        List<Order> listOrder = orderRepository.findOrdersByUserId(userId);
        System.out.println(listOrder);
        return listOrder.stream().map(order -> {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setId(order.getId().toString());
            orderDTO.setUserId(order.getUserId().toString());
            orderDTO.setVoucherId(
                    order.getVoucherId() != null ? order.getVoucherId().toString() : ""
            );
            orderDTO.setItems(order.getItems());
            orderDTO.setSubtotal(order.getSubtotal());
            orderDTO.setDiscount(order.getDiscount());
            orderDTO.setTotalPrice(order.getTotalPrice());
            orderDTO.setStatus(order.getStatus());
            orderDTO.setAddress(order.getAddress());
            orderDTO.setCreatedAt(order.getCreatedAt());
            return orderDTO;
        }).toList();
    }

}
