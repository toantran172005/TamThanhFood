package iuh.fit.controller;

import iuh.fit.entity.DTO.CreateOrderDTO;
import iuh.fit.entity.DTO.OrderDTO;
import iuh.fit.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    final OrderService orderService;

    @GetMapping("/{id}")
    public ResponseEntity<List<OrderDTO>> getListOrdersByUserId(@PathVariable String id) {
        ObjectId objectId = new ObjectId(id);
        List<OrderDTO> orderDTOList = orderService.getListOrderByUserId(objectId);
        return new ResponseEntity<>(orderDTOList, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<List<OrderDTO>> createNewOrder(@RequestBody CreateOrderDTO dto) {
        List<OrderDTO> list = orderService.createOrder(dto);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/canceledOrder/{userId}/{orderId}")
    public ResponseEntity<OrderDTO> canceledOrder(
            @PathVariable ObjectId userId,
            @PathVariable ObjectId orderId
    ) {
        OrderDTO orderDTO = orderService.canceledOrder(userId, orderId);
        return new ResponseEntity<>(orderDTO, HttpStatus.OK);
    }

}
