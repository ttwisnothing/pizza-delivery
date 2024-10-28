import React, { useEffect, useState } from "react";
import "./home.css";
import Header from "../../components/header/header";
import ExploreMenu from "../../components/exploreMenu/exploreMenu";
import FoodDisplay from "../../components/foodDisplay/foodDisplay";
import AppDownload from "../../components/appdownload/appdownload";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    loadData();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
