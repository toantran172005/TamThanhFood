package iuh.fit.service;

import iuh.fit.entity.DTO.FoodDTO;
import iuh.fit.entity.Food;
import iuh.fit.repository.FoodRepository;
import iuh.fit.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodService {
    final FoodRepository foodRepository;
    final RestaurantRepository restaurantRepository;

    public Page<FoodDTO> getFoods(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Food> foodPage = foodRepository.findAll(pageable);

        return  foodPage.map(food -> {
            FoodDTO foodDTO = new FoodDTO();
            foodDTO.setFoodId(food.getId().toString());
            foodDTO.setName(food.getName());
            foodDTO.setRating(food.getRating());
            foodDTO.setImage(food.getImage());
            foodDTO.setCategory(food.getCategory());
            foodDTO.setSize(food.getSize());
            foodDTO.setPrice(food.getPrice());
            foodDTO.setDescription(food.getDescription());
            foodDTO.setIsAvailable(food.getIsAvailable());

            return foodDTO;
        });
    }

}
