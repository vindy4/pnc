import { Button, Alert, Checkbox } from "@mui/material";
import React, { useState } from "react";
import DropBoxCont from "./DropBox";
import Imdb from "./Imdb";
import OTT from "./Ott";
import { setMovie } from "./FireBase";

function App() {
  const [fsData, setFsData] = useState({});
  const [error, setError] = useState(false);
  const [isMovie, setIsMovie] = useState(Boolean(false));
  const [isInCarausal, setIsInCarausal] = useState(false);
  const [ott, setOtt] = useState("");
  const [entrySuccessfull, setEntrySuccessfull] = useState(false);
  const [isDbxLinkGenerated, setisDbxLinkGenerated] = useState(false);
  const [isImdmConfirmed, setisImdmConfirmed] = useState(false);
  const [dbxSearchString, setdbxSearchString] = useState("");
  const [nextEpisodeID, setnextEpisodeID] = useState("");

  const dbxData = (data) => {
    setFsData({ ...fsData, ...data });
  };

  const imdbData = (data, nextEpisodeId) => {
    setFsData({ ...fsData, ...data });
    if (!isMovie) {
      setdbxSearchString(data.episodeName);
    } else {
      setdbxSearchString(data.name);
    }
    setnextEpisodeID(nextEpisodeId);
  };

  const addEntry = () => {
    if (!ott) {
      setError("Please select OTT");
      return;
    }

    fsData["iscarousel"] = isInCarausal;
    fsData["isTrending"] = true;
    fsData["platform"] = ott;
    fsData["isSeries"] = !isMovie;

    let missingKeys = [];
    Object.keys(fsData).forEach((k) => {
      if (fsData[k] === null || fsData[k] === undefined) {
        missingKeys.push(k);
      }
    });

    if (missingKeys.length) {
      console.log(missingKeys);
      setError(
        "key missing",
        missingKeys.map((k) => k)
      );
    } else if (!isDbxLinkGenerated || !isImdmConfirmed) {
      setError("Either dropbox link is not generated or Imdb not confirmed ");
    } else {
      try {
        setMovie(fsData, isMovie ? "Movies" : "Series");
        setEntrySuccessfull("Entry was added in database");
        setTimeout(() => {
          if ("URLSearchParams" in window && !isMovie && nextEpisodeID) {
            var searchParams = new URLSearchParams(window.location.search);
            searchParams.set("tvId", nextEpisodeID);
            window.location.search = searchParams.toString();
          }
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  console.log(fsData);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="MovieType">
      <div>
        <span>
          Resource Type : <b> {isMovie ? "Movie" : "Tv Series"} </b>
        </span>
        <Button
          variant="contained"
          onClick={() => {
            setIsMovie(!isMovie);
            localStorage.setItem("isMovie", isMovie);
          }}
          sx={{ marginLeft: "40px" }}
        >
          Change
        </Button>
        <div className="Carausal">
          Is in carasousal:
          <Checkbox {...label} onClick={() => setIsInCarausal(!isInCarausal)} />
        </div>
        <OTT
          value={ott}
          onChange={(v) => {
            console.log(v.target.value);
            setOtt(v.target.value);
          }}
        />
      </div>

      {error && <Alert severity="error">{error}!</Alert>}
      <Imdb
        setData={imdbData}
        isSeires={!isMovie}
        setFlag={setisImdmConfirmed}
      />
      {isImdmConfirmed && (
        <DropBoxCont
          setData={dbxData}
          setFlag={setisDbxLinkGenerated}
          searchQuery={dbxSearchString}
        />
      )}

      {entrySuccessfull && (
        <Alert severity="success">{entrySuccessfull}!</Alert>
      )}
      <Button
        variant="contained"
        onClick={addEntry}
        sx={{ marginLeft: "400px", marginTop: "50px" }}
      >
        Add Entry to DataBase
      </Button>
    </div>
  );
}

export default App;
