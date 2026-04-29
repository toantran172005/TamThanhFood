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

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    final OrderRepository orderRepository;
    final UserRepository userRepository;
    final ConvertData convertData;

    public OrderDTO canceledOrder(ObjectId userId, ObjectId orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng!"));

        if (!order.getStatus().equals("PENDING") && !order.getStatus().equals("CONFIRMED")) {
            throw new RuntimeException("Đơn hàng đã được xử lý hoặc đang giao, không thể hủy!");
        }

        order.setStatus("CANCELED");

        Order updatedOrder = orderRepository.save(order);
        return convertData.convertOrderToOrderDTO(updatedOrder);
    }

    public List<OrderDTO> getListOrderByUserId(ObjectId userId) {
        if (userId == null) {
            throw new RuntimeException("Bạn cần đăng nhập để xem các đơn hàng của mình!");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại với ID: " + userId));

        List<Order> listOrder = orderRepository.findOrdersByUserId(userId);
        System.out.println(listOrder);
        return listOrder.stream().map(convertData::convertOrderToOrderDTO).toList();
    }

    public List<OrderDTO> createOrder(CreateOrderDTO createOrderDTO) {
        Order order = convertData.convertCreateOrderDTOToOrder(createOrderDTO);
        orderRepository.save(order);

        List<Order> orderList = orderRepository.findOrdersByUserId(order.getUserId());
        return orderList.stream().map(convertData::convertOrderToOrderDTO).toList();
    }

}
