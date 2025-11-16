import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/foodPartner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems || []);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <main className="min-h-screen bg-gray-900 text-white px-4 md:px-20 py-12">
      {/* Profile Header */}
      <section className="flex flex-col items-center text-center gap-6 mb-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-wrap">
          <img
            className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
            src={
              profile?.avatar ||
              "https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60"
            }
            alt="Food Partner"
          />
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl md:text-4xl font-bold tracking-wide">
              {profile?.businessName || "Business Name"}
            </h1>
            <p className="text-gray-400 text-sm md:text-base mt-1">
              {profile?.address || "Business Address"}
            </p>
          </div>
        </div>
      </section>

      <hr className="border-gray-700 mb-10" />

      {/* Videos Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.length > 0 ? (
          videos.map((v) => (
            <div
              key={v.id}
              className="relative rounded-xl overflow-hidden shadow-lg group bg-gray-800 transition-transform transform hover:scale-105"
            >
              <video
                className="w-full h-48 md:h-56 object-cover"
                src={v.video}
                muted
                autoPlay
                loop
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-medium text-center text-sm md:text-base transition-opacity">
                {v.title || "Meal Video"}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No videos found.
          </p>
        )}
      </section>
    </main>
  );
};

export default Profile;
