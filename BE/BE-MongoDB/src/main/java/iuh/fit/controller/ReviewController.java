package iuh.fit.controller;

import iuh.fit.entity.DTO.CreateReviewDTO;
import iuh.fit.entity.DTO.ReviewDTO;
import iuh.fit.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    final ReviewService reviewService;

    @GetMapping("/food/{foodId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByFood(
            @PathVariable ObjectId foodId
            ){
        List<ReviewDTO> list = reviewService.getReviewsByFood(foodId);
        return new ResponseEntity<>(list, HttpStatus.OK);

    }

    @PostMapping("/createReview")
    public ResponseEntity<ReviewDTO> createReview(@RequestBody CreateReviewDTO dto) {
        ReviewDTO dtoReview = reviewService.createReview(dto);
        return new ResponseEntity<>(dtoReview, HttpStatus.CREATED);
    }



}
