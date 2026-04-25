import React from "react";
import Card_Food from "./Card_Food";
import "../css/List_Card_Food.css";
import Header from "./Header";

function List_Card_Food() {
  const foods = [
    {
      id: 1,
      name: "Grill Sandwich",
      price: 30.0,
      description: "Sandwich bread, Butter, Cheese, Ham, Tomato",
      image: "/Grill_Sandwich.png",
      rating: 5.0,
    },
    {
      id: 2,
      name: "Bison Burger",
      price: 30.0,
      description: "Bison patty, Brioche bread, Onion, Cucumber, Cheese...",
      image: "/Bison_Burger.png",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Grill Chicken",
      price: 45.0,
      description: "Chicken breast, Garlic, Honey, Olive oil, Lemon,...",
      image: "/Grill_Chicken.png",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Beef Curry",
      price: 40.0,
      description: "Beef shank , Potatoes, Carrots, Coconut milk,...",
      image: "/Beef_Curry.png",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Grill Shrimp",
      price: 33.0,
      description: "Fresh shrimp, Garlic butter, Salt and Pepper,... ",
      image: "/Grill_Shrimp.png",
      rating: 4.4,
    },
    {
      id: 6,
      name: "Spring Rolls",
      price: 20.0,
      description: "Minced meat, Shrimp, Wood ear mushrooms, Vermicelli,...",
      image: "/Spring_Rolls.png",
      rating: 5.0,
    },
    {
      id: 7,
      name: "Salad",
      price: 15.0,
      description: "Chicken breast, Lettuce, Cherrytomatoes, Cucumber,...",
      image: "/Salad.png",
      rating: 4.5,
    },
    {
      id: 8,
      name: "Pan-Fried Tofu",
      price: 25.0,
      description: "Tofu, Sesame oil, Soy sauce, Wine, Garlic,... ",
      image: "/Pan_Fried_Tofu.png",
      rating: 4.8,
    },
  ];

  return (
    <div>
      <div>
        <Header></Header>
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
        {foods.map((food) => (
          <Card_Food key={food.id} {...food} />
        ))}
      </div>
    </div>
  );
}

export default List_Card_Food;
