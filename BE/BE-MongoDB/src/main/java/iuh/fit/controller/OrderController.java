package iuh.fit.controller;

import iuh.fit.entity.DTO.CreateOrderDTO;
import iuh.fit.entity.DTO.OrderDTO;
import iuh.fit.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    final OrderService orderService;

    // Lấy lịch sử đơn hàng theo userId
    @GetMapping("/history/{userId}")
    public ResponseEntity<List<OrderDTO>> getListOrdersByUserId(@PathVariable String userId) {
        ObjectId objectId = new ObjectId(userId);
        List<OrderDTO> orderDTOList = orderService.getListOrderByUserId(objectId);
        return new ResponseEntity<>(orderDTOList, HttpStatus.OK);
    }

    // Lấy chi tiết đơn hàng theo orderId
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable String orderId) {
        ObjectId objectId = new ObjectId(orderId);
        OrderDTO orderDTO = orderService.getOrderById(objectId);
        return new ResponseEntity<>(orderDTO, HttpStatus.OK);
    }

    // Tạo đơn hàng mới, trả về đúng đơn vừa tạo
    @PostMapping("/create")
    public ResponseEntity<OrderDTO> createNewOrder(@RequestBody CreateOrderDTO dto) {
        OrderDTO orderDTO = orderService.createOrder(dto);
        return new ResponseEntity<>(orderDTO, HttpStatus.OK);
    }

    // Cập nhật trạng thái đơn hàng: DELIVERING, COMPLETE, CANCELED
    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(
            @PathVariable String orderId,
            @RequestBody Map<String, String> body
    ) {
        String status = body.get("status");
        ObjectId objectId = new ObjectId(orderId);

        OrderDTO orderDTO = orderService.updateOrderStatus(objectId, status);
        return new ResponseEntity<>(orderDTO, HttpStatus.OK);
    }

    // Hủy đơn hàng
    @PostMapping("/canceledOrder/{userId}/{orderId}")
    public ResponseEntity<OrderDTO> canceledOrder(
            @PathVariable ObjectId userId,
            @PathVariable ObjectId orderId
    ) {
        OrderDTO orderDTO = orderService.canceledOrder(userId, orderId);
        return new ResponseEntity<>(orderDTO, HttpStatus.OK);
    }
}