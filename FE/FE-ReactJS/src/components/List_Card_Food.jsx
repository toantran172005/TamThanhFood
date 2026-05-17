import React, { useState, useEffect } from "react";
import Card_Food from "./Card_Food";
import "../css/List_Card_Food.css";
import Header from "./Header";
import foodApi from "../api/foodApi";

function List_Card_Food() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("all"); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await foodApi.getAll();
        setFoods(response.content);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu món ăn:", error);
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Lọc theo tìm kiếm
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp
  const sortedFoods = [...filteredFoods].sort((a, b) => {
    if (sortOption === "popular") {
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;
      return ratingB - ratingA;
    }
    
    if (sortOption === "new") {
      const idA = a.foodId || "";
      const idB = b.foodId || "";
      return idB.localeCompare(idA);
    }
    return 0;
  });

  // --- XỬ LÝ PHÂN TRANG ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedFoods.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>
        <Header 
          onSearch={(term) => {
            setSearchTerm(term);
            setCurrentPage(1); 
          }} 
        />
      </div>
      <div>
        <div className="sort_filter">
          <div className="title_left">
            <p>Đặc biệt hôm nay</p>
          </div>

          <div className="filter_right">
            <select 
              className="select-sort"
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">Sắp xếp theo</option>
              <option value="popular">Phổ biến nhất</option>
              <option value="new">Mới nhất</option>
            </select>
            <a href="#/">
              <i className="fa-solid fa-sliders"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="list_card_food">
        {loading ? (
          <p>Đang tải danh sách món ăn...</p>
        ) : currentItems.length > 0 ? (
          currentItems.map((food) => {
            const firstPrice =
              Array.isArray(food.price) && food.price.length > 0
                ? food.price[0]
                : 0;

            return (
              <Card_Food
                key={food.foodId}
                {...food}
                price={firstPrice} 
              />
            );
          })
        ) : (
          <p style={{ textAlign: "center", width: "100%", marginTop: "20px" }}>
            Không tìm thấy món ăn nào khớp với "{searchTerm}"
          </p>
        )}
      </div>

      {/* CHUYỂN TRANG  */}
      {totalPages > 1 && (
        <div className="pagination" style={{ display: 'flex', justifyContent: 'center', margin: '30px 0', gap: '10px' }}>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ padding: '8px 16px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            Trước
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button 
              key={number} 
              onClick={() => paginate(number)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                backgroundColor: currentPage === number ? '#ff9900' : 'white',
                color: currentPage === number ? 'white' : 'black',
                border: '1px solid #ccc',
                fontWeight: currentPage === number ? 'bold' : 'normal'
              }}
            >
              {number}
            </button>
          ))}

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ padding: '8px 16px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}

export default List_Card_Food;