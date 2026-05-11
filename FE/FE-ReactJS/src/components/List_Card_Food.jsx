import React from "react";
import Card_Food from "./Card_Food";
import "../css/List_Card_Food.css";
import Header from "./Header";
import foodApi from "../api/foodApi";
import { useState, useEffect } from "react";

function List_Card_Food() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <Header onSearch={setSearchTerm}/>
      </div>
      <div>
        <div className="sort_filter">
          <div className="title_left">
            <p>Đặc biệt hôm nay</p>
          </div>

          <div className="filter_right">
            <select className="select-sort">
              <option value="all">Sắp xếp theo</option>
              <option value="popular">Phổ biến</option>
              <option value="new">Mới nhất</option>
            </select>
            <a href="">
              <i className="fa-solid fa-sliders"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="list_card_food">
        {loading ? (
          <p>Đang tải danh sách món ăn...</p>
        ) : filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <Card_Food 
              key={food.foodId} 
              {...food} 
              price={food.price[0]} 
            />
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%", marginTop: "20px" }}>
            Không tìm thấy món ăn nào khớp với "{searchTerm}"
          </p>
        )}
      </div>
    </div>
  );
}

export default List_Card_Food;
