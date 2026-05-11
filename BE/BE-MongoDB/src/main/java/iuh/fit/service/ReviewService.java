package iuh.fit.service;

import iuh.fit.TTUtil.ConvertData;
import iuh.fit.entity.DTO.CreateReviewDTO;
import iuh.fit.entity.DTO.ReviewDTO;
import iuh.fit.entity.Review;
import iuh.fit.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    final ReviewRepository reviewRepository;
    final ConvertData convertData;

    public List<ReviewDTO> getReviewsByFood(ObjectId foodId) {
        List<Review> list = reviewRepository.findReviewByFoodId(foodId);
        return list.stream().map(convertData::convertReviewToReviewDTO).toList();
    }

    public ReviewDTO createReview(CreateReviewDTO reviewDTO) {
        Review review = convertData.convertCreateReviewToReview(reviewDTO);
        return convertData.convertReviewToReviewDTO(reviewRepository.save(review));
    }

}
