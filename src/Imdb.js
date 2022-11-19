import "./App.css";
import React, { useState } from "react";
import { Button, TextField, Alert } from "@mui/material";
import Picker from "./Picker";

// const apiKey = "k_tzrvo3ni";
const apiKey = "k_05p3o8d3";

function DropboxContainer(props) {
  const { setData, isSeires, setFlag, tvId } = props;

  const [movieInfo, setMovieInfo] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [itemId, setItemId] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImages, setselectedImages] = useState([]);
  const [detailsFinal, setdetailsFinal] = useState(false);

  const getResourceDetails = () => {
    if (itemId) {
      setLoading(true);
      fetch(
        `https://imdb-api.com/en/API/Title/${apiKey}/${itemId}/FullActor,Posters`
      )
        .then((response) => response.json())
        .then((data) => {
          setMovieInfo(data);

          const itemIdForImage = isSeires
            ? data.tvEpisodeInfo.seriesId
            : itemId;
          fetch(
            `https://imdb-api.com/en/API/Images/${apiKey}/${itemIdForImage}`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data?.items?.length) {
                const imgs = data.items
                  .filter((i) => !i.title.includes("event"))
                  .map((i) => i.image);
                setImages(imgs);
              }
              setLoading(false);
            })
            .catch((e) => {
              setError(e.message);
            });
          setLoading(false);
        })
        .catch((e) => {
          setError(e.message);
        });
    }
  };

  let fsObject = {};
  if (Object.keys(movieInfo).length) {
    fsObject = {
      imdbId: movieInfo.id,
      name: movieInfo.title,
      description: movieInfo.plot,
      keywordList: movieInfo.keywordList,
      languageList: movieInfo.languageList.map((l) => l.value),
      runTime: movieInfo.runtimeStr,
      rating: movieInfo.imDbRating,
      stars: movieInfo.starList.map((s) => s.name),
      genre: movieInfo.genres,
      landscapeImages: selectedImages,
      directors: movieInfo.directorList.map((d) => d.name),
      posterUrl: movieInfo.image,
    };

    const startWithImage = fsObject.stars.map((s) => {
      const startDetails = movieInfo.actorList.find((al) => al.name === s);
      return {
        name: s,
        image: startDetails?.image,
      };
    });

    fsObject.stars = startWithImage;

    if (isSeires) {
      fsObject.episode = movieInfo.tvEpisodeInfo.episodeNumber;
      fsObject.season = movieInfo.tvEpisodeInfo.seasonNumber;
      fsObject.name = movieInfo.tvEpisodeInfo.seriesTitle;
      fsObject.episodeName = movieInfo.title;
    }

    console.log("fsObj", fsObject);
  }

  return (
    <div className="ImdbContainer">
      {error && <Alert severity="error">{error}!</Alert>}

      <div className="searchID">
        <TextField
          id="search-movie-tv"
          label="Imdb ID"
          variant="standard"
          sx={{ width: 400 }}
          onChange={(e) => {
            setdetailsFinal(false);
            setItemId(e.target.value);
            setFlag(false);
          }}
          value={itemId}
        />
        <Button
          variant="contained"
          sx={{ marginTop: "40px" }}
          onClick={() => {
            getResourceDetails();
            setdetailsFinal(false);
            setFlag(false);
          }}
        >
          Get Details
        </Button>
      </div>

      {loading ? (
        <p> loading... </p>
      ) : (
        <div className="MovieDetails">
          <ul>
            <li> name : {fsObject.name} </li>
            <li> plot : {fsObject.description} </li>
            <li> rating : {fsObject.rating} </li>
            {isSeires && (
              <>
                <li>
                  next episode imdb id:
                  {movieInfo?.tvEpisodeInfo?.nextEpisodeId}
                </li>
                <li>episodeName : {movieInfo.title}</li>
              </>
            )}
          </ul>
          <Button
            variant="contained"
            onClick={() => {
              setdetailsFinal(true);
              setData(fsObject, movieInfo?.tvEpisodeInfo?.nextEpisodeId);
              setFlag(true);
            }}
          >
            Confirm details
          </Button>
          <p>
            data confirmed :
            {detailsFinal ? (
              <span className="Green">yes</span>
            ) : (
              <span className="Red"> no</span>
            )}
          </p>
          <div>
            {images.length > 0 && (
              <>
                All Images
                <Picker
                  images={images.map((image, i) => ({ src: image, value: i }))}
                  onPick={(v) => {
                    const newImages = images.filter((img) => img !== v.src);
                    setImages(newImages);
                    setselectedImages([...selectedImages, v.src]);
                  }}
                  updateImage={setImages}
                />
              </>
            )}

            {selectedImages.length > 0 && (
              <>
                selected images
                <Picker
                  images={selectedImages.map((image, i) => ({
                    src: image,
                    value: i,
                  }))}
                  onPick={(v) => {
                    const newselectedImages = selectedImages.filter(
                      (img) => img !== v.src
                    );
                    setselectedImages(newselectedImages);
                    setImages([...images, v.src]);
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropboxContainer;
