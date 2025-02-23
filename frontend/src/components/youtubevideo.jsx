const YouTubeVideo = () => {
  return (
    <div className="p-10 space-y-5">
      <div className="text-center font-bold text-[32px]">
        <h1>Why Choose Us?</h1>
      </div>
      <div className="flex justify-center ">
        <iframe
          width="700"
          height="400"
          src="https://www.youtube.com/embed/6DIuNf_5in0?si=7rWvb4QVVrHjyiXd"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubeVideo;
