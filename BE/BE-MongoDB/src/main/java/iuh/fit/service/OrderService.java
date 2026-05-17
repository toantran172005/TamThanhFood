package iuh.fit.service;

import iuh.fit.TTUtil.ConvertData;
import iuh.fit.entity.DTO.CreateOrderDTO;
import iuh.fit.entity.DTO.OrderDTO;
import iuh.fit.entity.Order;
import iuh.fit.entity.User;
import iuh.fit.repository.OrderRepository;
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
    final ConvertData convertData;

    public OrderDTO getOrderById(ObjectId orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng với ID: " + orderId));

        return convertData.convertOrderToOrderDTO(order);
    }

    public List<OrderDTO> getListOrderByUserId(ObjectId userId) {
        if (userId == null) {
            throw new RuntimeException("Bạn cần đăng nhập để xem các đơn hàng của mình!");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại với ID: " + userId));

        List<Order> listOrder = orderRepository.findOrdersByUserId(userId);

        return listOrder
                .stream()
                .map(convertData::convertOrderToOrderDTO)
                .toList();
    }

    public OrderDTO createOrder(CreateOrderDTO createOrderDTO) {
        Order order = convertData.convertCreateOrderDTOToOrder(createOrderDTO);

        Order savedOrder = orderRepository.save(order);

        return convertData.convertOrderToOrderDTO(savedOrder);
    }

    public OrderDTO updateOrderStatus(ObjectId orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng!"));

        if (status == null || status.isBlank()) {
            throw new RuntimeException("Trạng thái đơn hàng không hợp lệ!");
        }

        order.setStatus(status);

        Order updatedOrder = orderRepository.save(order);

        return convertData.convertOrderToOrderDTO(updatedOrder);
    }

    public OrderDTO canceledOrder(ObjectId userId, ObjectId orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng!"));

        if (!order.getUserId().equals(userId)) {
            throw new RuntimeException("Bạn không có quyền hủy đơn hàng này!");
        }

        if (!order.getStatus().equals("PENDING") && !order.getStatus().equals("CONFIRMED")) {
            throw new RuntimeException("Đơn hàng đã được xử lý hoặc đang giao, không thể hủy!");
        }

        order.setStatus("CANCELED");

        Order updatedOrder = orderRepository.save(order);

        return convertData.convertOrderToOrderDTO(updatedOrder);
    }
}