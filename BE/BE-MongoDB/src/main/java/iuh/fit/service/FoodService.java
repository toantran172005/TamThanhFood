package iuh.fit.service;

import iuh.fit.TTUtil.ConvertData;
import iuh.fit.entity.DTO.FoodDTO;
import iuh.fit.entity.Food;
import iuh.fit.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodService {
    final FoodRepository foodRepository;
    final ConvertData convertData;

    public Page<FoodDTO> searchFoods(String name, String category, String sortDir, int page, int size) {

        int pageIndex = (page < 1) ? 0 : page - 1;

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by("price").descending()
                : Sort.by("price").ascending();

        Pageable pageable = PageRequest.of(pageIndex, size, sort);

        Page<Food> foodPage = foodRepository.findByNameContainingIgnoreCaseAndCategoryContainingIgnoreCase(
                name != null ? name : "",
                category != null ? category : "",
                pageable
        );

        return foodPage.map(convertData::convertFoodToFoodDTO);
    }


    public Page<FoodDTO> getFoods(int page, int size) {

        int pageIndex = (page < 1) ? 0 : page - 1;

        Pageable pageable = PageRequest.of(pageIndex, size);
        Page<Food> foodPage = foodRepository.findAll(pageable);

        return foodPage.map(convertData::convertFoodToFoodDTO);
    }

    public List<String> getAllCategories() {
        return foodRepository.getAllCategories();
    }

}
