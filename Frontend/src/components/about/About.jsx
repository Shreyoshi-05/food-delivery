import React from "react";
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-image">
          <img src="https://i.pinimg.com/1200x/53/b7/22/53b72291f7e8610b4f340fb7e38ee095.jpg" alt="Delicious Food" />
        </div>
        <div className="about-content">
          <h2>About  <span>Tomato</span></h2>
          <p>
            Welcome to  <strong>Tomato</strong>, your go-to food delivery app that connects you
            with your favorite restaurants and dishes in just a few clicks. We bring
            the best of your city’s cuisine straight to your doorstep — hot, fresh, and fast!
          </p>
          <p>
            Our mission is to make ordering food as delightful as eating it.
            Whether you're craving a spicy meal, a cheesy pizza, or a healthy bowl,
            FoodieExpress ensures quick delivery, trusted restaurants, and top quality.
          </p>
          <div className="about-stats">
            <div>
              <h3>500+</h3>
              <p>Restaurants</p>
            </div>
            <div>
              <h3>10K+</h3>
              <p>Orders Delivered</p>
            </div>
            <div>
              <h3>4.8★</h3>
              <p>Average Rating</p>
            </div>
          </div>
          <Link to="/">
          <button className="about-btn"> Order Now</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
