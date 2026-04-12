package iuh.fit.controller;

import iuh.fit.entity.DTO.FoodDTO;
import iuh.fit.entity.Food;
import iuh.fit.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
public class FoodController {
    final FoodService foodService;

    @GetMapping
    public ResponseEntity<Page<FoodDTO>> getAllFoods(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<FoodDTO> foodPage = foodService.getFoods(page, size);
        return new ResponseEntity<>(foodPage, HttpStatus.OK);
    }

}
