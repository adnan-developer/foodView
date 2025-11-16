import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!videoFile) {
      setVideoURL("");
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setVideoFile(null);
      setFileError("");
      return;
    }
    if (!file.type.startsWith("video/")) {
      setFileError("Please select a valid video file.");
      return;
    }
    setFileError("");
    setVideoFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setFileError("Please drop a valid video file.");
      return;
    }
    setFileError("");
    setVideoFile(file);
  };

  const onDragOver = (e) => e.preventDefault();
  const openFileDialog = () => fileInputRef.current?.click();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !name.trim()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", videoFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/food",
        formData,
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const isDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile]);

  return (
    <div className="min-h-screen flex items-start justify-center p-4 md:p-8 bg-gray-900">
      <div className="w-full max-w-3xl bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col gap-6 transition-colors duration-300">
        {/* Header */}
        <header className="grid gap-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Create Food
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Upload a short video, give it a name, and add a description.
          </p>
        </header>

        {/* Form */}
        <form className="grid gap-5 md:gap-6" onSubmit={onSubmit}>
          {/* Video Upload */}
          <div className="grid gap-1">
            <label className="text-xs md:text-sm uppercase tracking-widest font-semibold text-gray-400">
              Food Video
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={onFileChange}
            />
            <div
              role="button"
              tabIndex={0}
              onClick={openFileDialog}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? openFileDialog() : null)}
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="border-2 border-dashed border-gray-600 bg-gray-700 rounded-xl p-6 cursor-pointer select-none transition-all duration-200 hover:border-indigo-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <div className="grid place-items-center text-center gap-3 text-gray-400">
                <svg
                  className="text-indigo-500 w-10 h-10"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10.8 3.2a1 1 0 0 1 .4-.08h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v7.2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6.4a1 1 0 0 1 1-1h1.6V3.2a1 1 0 0 1 1-1h1.6a1 1 0 0 1 .6.2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5"
                    fill="currentColor"
                  />
                </svg>
                <div className="text-white font-semibold">Tap to upload or drag and drop</div>
                <div className="text-xs text-gray-400">MP4, WebM, MOV • Up to ~100MB</div>
              </div>
            </div>

            {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}

            {videoFile && (
              <div className="flex flex-wrap items-center gap-3 mt-3 p-3 bg-gray-700 border border-gray-600 rounded-xl w-full">
                <span className="font-medium truncate text-white">{videoFile.name}</span>
                <span className="text-sm text-gray-400 ml-auto">
                  {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                </span>
                <div className="inline-flex items-center gap-2">
                  <button
                    type="button"
                    onClick={openFileDialog}
                    className="bg-transparent border border-transparent text-indigo-500 px-3 py-1 rounded-full font-semibold text-sm hover:bg-indigo-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoFile(null);
                      setFileError("");
                    }}
                    className="bg-transparent border border-transparent text-red-500 px-3 py-1 rounded-full font-semibold text-sm hover:bg-red-600/20 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Video Preview */}
          {videoURL && (
            <div className="w-full rounded-xl overflow-hidden border border-gray-600 bg-gray-700 grid place-items-center mt-3">
              <video
                className="w-full h-64 md:h-80 object-contain"
                src={videoURL}
                controls
                playsInline
                preload="metadata"
              />
            </div>
          )}

          {/* Name */}
          <div className="grid gap-1 mt-3">
            <label className="text-xs md:text-sm uppercase tracking-widest font-semibold text-gray-400">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g., Spicy Paneer Wrap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-600 rounded-xl p-3 bg-gray-700 text-white outline-none focus:border-indigo-500 focus:bg-gray-600 transition-colors duration-200"
            />
          </div>

          {/* Description */}
          <div className="grid gap-1 mt-3">
            <label className="text-xs md:text-sm uppercase tracking-widest font-semibold text-gray-400">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Write a short description: ingredients, taste, spice level, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-600 rounded-xl p-3 bg-gray-700 text-white outline-none focus:border-indigo-500 focus:bg-gray-600 transition-colors duration-200 resize-vertical min-h-[100px]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              disabled={isDisabled}
              className="bg-indigo-500 text-white rounded-xl px-6 py-3 font-semibold tracking-wide disabled:opacity-60 disabled:cursor-not-allowed hover:bg-indigo-600 active:translate-y-0.5 transition-all duration-200"
            >
              Save Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
