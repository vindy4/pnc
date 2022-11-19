import React, { useEffect, useState } from "react";

const Picker = (props) => {
  const { images, onPick } = props;
  const [filterImages, setFilterImages] = useState([]);
  const [imLoadingDone, setimLoadingDone] = useState(false);
  console.log(filterImages?.length);

  useEffect(() => {
    Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            })
        )
    ).then(() => {
      console.log("images finished loading");
      setimLoadingDone(true);
    });
  }, [true]);

  return (
    <>
      {imLoadingDone && <span className="Green"> loading done</span>}
      <div className="ImagePicker">
        {images.map((im, i) => {
          return (
            <img
              key={`${im.src}-${i}`}
              src={im.src}
              alt="nahi load hui bc"
              style={{ display: "none" }}
              onLoad={(e) => {
                if (
                  e.target.naturalHeight > 728 &&
                  e.target.naturalWidth > 1024
                ) {
                  console.log(filterImages.length, "reduced");

                  setFilterImages([...filterImages, im]);
                }
              }}
            />
          );
        })}
        {filterImages.map((im, i) => {
          return (
            <div
              key={`${im.src}-${(i + 1) * 300}`}
              className="LandscapeImage"
              onClick={() => onPick(im)}
            >
              <img
                src={im.src}
                alt="nahi load hui bc"
                width={200}
                height={200}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Picker;
