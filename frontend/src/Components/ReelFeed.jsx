import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ReelFeed = ({
  items = [],
  onLike,
  onSave,
  emptyMessage = "No videos yet.",
}) => {
  const videoRefs = useRef(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    );

    videoRefs.current.forEach((vid) => observer.observe(vid));
    return () => observer.disconnect();
  }, [items]);

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  return (
    <div className="h-[100dvh] bg-black overflow-hidden">
      <div
        className="h-full w-full overflow-y-auto snap-y snap-mandatory overscroll-contain scroll-smooth"
        role="list"
      >
        {items.length === 0 && (
          <div className="absolute inset-0 grid place-items-center text-white text-center">
            <p>{emptyMessage}</p>
          </div>
        )}

        {items.map((item) => (
          <section
            key={item._id}
            className="relative h-[100dvh] w-full snap-start bg-black"
            role="listitem"
          >
            {/* Video */}
            <video
              ref={setVideoRef(item._id)}
              className="absolute inset-0 w-full h-full object-cover object-center bg-black"
              src={item.video}
              playsInline
              loop
              preload="metadata"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex items-end pointer-events-none">
              {/* Gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 via-65% to-black/65"
                aria-hidden="true"
              />

              {/* Actions */}
              <div className="absolute right-[10px] bottom-[96px] flex flex-col gap-[14px] pointer-events-auto">
                {/* Like */}
                <div className="flex flex-col items-center gap-1 text-white">
                  <button
                    onClick={onLike ? () => onLike(item) : undefined}
                    aria-label="Like"
                    className="w-12 h-12 rounded-full grid place-items-center bg-black/35 backdrop-blur-sm border border-white/15 shadow-md active:translate-y-[1px]"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                    </svg>
                  </button>
                  <div className="text-xs text-white">
                    {item.likeCount ?? item.likesCount ?? item.likes ?? 0}
                  </div>
                </div>

                {/* Save */}
                <div className="flex flex-col items-center gap-1 text-white">
                  <button
                    onClick={onSave ? () => onSave(item) : undefined}
                    aria-label="Save"
                    className="w-12 h-12 rounded-full grid place-items-center bg-black/35 backdrop-blur-sm border border-white/15 shadow-md active:translate-y-[1px]"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                    </svg>
                  </button>
                  <div className="text-xs text-white">
                    {item.saveCount ?? item.bookmarks ?? item.saves ?? 0}
                  </div>
                </div>

                {/* Comments */}
                <div className="flex flex-col items-center gap-1 text-white">
                  <button
                    aria-label="Comments"
                    className="w-12 h-12 rounded-full grid place-items-center bg-black/35 backdrop-blur-sm border border-white/15 shadow-md active:translate-y-[1px]"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                    </svg>
                  </button>
                  <div className="text-xs text-white">
                    {item.commentsCount ??
                      (Array.isArray(item.comments) ? item.comments.length : 0)}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative w-full flex flex-col gap-4 px-6 pb-[calc(env(safe-area-inset-bottom,0)+72px)] pr-[4.5rem] pointer-events-auto md:px-9">
                <p
                  className="text-white text-base md:text-lg leading-tight line-clamp-2 max-w-[90ch] md:max-w-[70ch] text-shadow-sm"
                  title={item.description}
                >
                  {item.description}
                </p>

                {item.foodPartner && (
                  <Link
                    to={"/foodPartner/" + item.foodPartner}
                    aria-label="Visit store"
                    className="self-start bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-5 py-2 font-semibold shadow-md tracking-wide active:translate-y-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white transition-all"
                  >
                    Visit Store
                  </Link>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ReelFeed;
