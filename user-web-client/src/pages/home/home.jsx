import React, { useEffect, useState } from "react";
import "./home.css";
import Header from "../../components/header/header";
import ExploreMenu from "../../components/exploreMenu/exploreMenu";
import FoodDisplay from "../../components/foodDisplay/foodDisplay";
import AppDownload from "../../components/appdownload/appdownload";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true); // สถานะการโหลด
  const [error, setError] = useState(null); // สถานะข้อผิดพลาด

  useEffect(() => {
    // ฟังก์ชันที่ใช้ในการโหลดข้อมูล
    const loadData = async () => {
      try {
        // สมมติว่าคุณมีฟังก์ชันในการโหลดข้อมูลที่นี่
        // await fetchData(category);
        setLoading(false); // หยุดการโหลดเมื่อโหลดข้อมูลเสร็จ
      } catch (err) {
        setError("Failed to load data"); // ตั้งค่าข้อผิดพลาด
        setLoading(false); // หยุดการโหลดเมื่อเกิดข้อผิดพลาด
      }
    };

    loadData();
  }, [category]); // โหลดข้อมูลใหม่เมื่อหมวดหมู่เปลี่ยน

  if (loading) {
    return <div>Loading...</div>; // แสดงข้อความขณะโหลด
  }

  if (error) {
    return <div>{error}</div>; // แสดงข้อความข้อผิดพลาด
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
