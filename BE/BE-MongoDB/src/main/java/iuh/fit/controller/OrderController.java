package iuh.fit.controller;

import iuh.fit.entity.DTO.OrderDTO;
import iuh.fit.repository.OrderRepository;
import iuh.fit.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
