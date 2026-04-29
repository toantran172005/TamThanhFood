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

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
public class FoodController {
    final FoodService foodService;

    @GetMapping("/search")
    public ResponseEntity<Page<FoodDTO>> searchFoods(
            @RequestParam(required = false, defaultValue = "") String name,
            @RequestParam(required = false, defaultValue = "") String category,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "9") int size
    ) {
        Page<FoodDTO> foodPage = foodService.searchFoods(name, category, sortDir, page, size);
        return new ResponseEntity<>(foodPage, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<Page<FoodDTO>> getAllFoods(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "9") int size
    ) {
        Page<FoodDTO> foodPage = foodService.getFoods(page, size);
        return new ResponseEntity<>(foodPage, HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        return new ResponseEntity<>(foodService.getAllCategories(), HttpStatus.OK);
    }



}
