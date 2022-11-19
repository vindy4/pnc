import React, { useEffect, useState } from "react";

const Picker = (props) => {
  const { images, onPick } = props;
  const [filterImages, setFilterImages] = useState(images);
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
    });
  }, [true]);

  return (
    <div className="ImagePicker">
      {filterImages.map((im) => {
        return (
          <div
            key={im.src}
            className="LandscapeImage"
            onClick={() => onPick({ im })}
          >
            <img
              src={im.src}
              alt="nahi load hui bc"
              width={200}
              height={200}
              onLoad={(e) => {
                console.log(
                  e.target.naturalHeight,
                  "height",
                  "    ",
                  e.target.naturalWidth,
                  " width"
                );
                if (
                  e.target.naturalHeight < 728 ||
                  e.target.naturalWidth < 1024
                ) {
                  const fi = filterImages.filter(
                    (fimgage) => fimgage.src !== im.src
                  );
                  setFilterImages(fi);
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Picker;
