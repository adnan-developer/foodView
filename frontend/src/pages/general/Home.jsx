import React, { useEffect, useState } from "react";
import axios from "axios";
import ReelFeed from "../../Components/ReelFeed";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState({}); // 👈 per-video loader state

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food", {
          withCredentials: true,
        });
        setVideos(response.data.foodItems);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleVideoReady = (id) => {
    setVideoLoaded((prev) => ({ ...prev, [id]: true }));
  };

  async function likeVideo(item) {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/food/like`,
      { foodId: item._id },
      { withCredentials: true }
    );

    setVideos((prev) =>
      prev.map((v) =>
        v._id === item._id
          ? { ...v, likeCount: v.likeCount + (response.data.like ? 1 : -1) }
          : v
      )
    );
  }

  async function saveVideo(item) {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/food/save`,
      { foodId: item._id },
      { withCredentials: true }
    );

    setVideos((prev) =>
      prev.map((v) =>
        v._id === item._id
          ? { ...v, saveCount: v.saveCount + (response.data.save ? 1 : -1) }
          : v
      )
    );
  }

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      emptyMessage="No videos available."
    />
  );
};

export default Home;
