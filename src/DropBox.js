import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import { Button, TextField, Alert, Card } from "@mui/material";

require("isomorphic-fetch");
var Dropbox = require("dropbox").Dropbox;

const accessToken =
  "sl.BTXEJG0Js1UDAX9URJH3ckM5PZUibvkukwqbtHlnP4a17OzOaiuDF44MyYltXT7EyXnLueS-LHQjDJejNC0CnqSChiYzdIQNnccNbUnavrl3GdomWk0V3WTb4cF2XopuJxLXnbeBI02o";
var dbx = new Dropbox({ accessToken });

function SearchList(props) {
  const { options, onItemClick } = props;
  return (
    <ul className="DropboxList">
      {options.map((item) => {
        return (
          <li
            className="DropboxListItem"
            key={item.id}
            onClick={() => {
              onItemClick(item);
            }}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

function DropboxContainer(props) {
  const { setData, setFlag, searchQuery } = props;
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [shareablelink, setShareablelink] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      dbx
        .sharingCreateSharedLinkWithSettings({
          path: searchQuery,
        })
        .then((link) => {
          console.log(link.result.url, "dfkjdfkjdfkj");
        });
    }
  }, []);

  const getSharableLink = async (item) => {
    try {
      const dpxLink = await dbx.sharingCreateSharedLinkWithSettings({
        path: item.path_lower,
      });
      setShareablelink({ sourceUrl: dpxLink.result.url });
      setData({ sourceUrl: dpxLink.result.url });
    } catch (error) {
      setError(error.message);
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value) {
      setLoading(true);
      dbx
        .filesSearchV2({ query: value })
        .then((resp) => {
          const responseList = resp.result.matches.map((item) => {
            return item.metadata.metadata;
          });
          const onlyFiles = responseList.filter((li) => li[".tag"] === "file");
          onlyFiles.sort((a, b) => a.name.localeCompare(b.name));
          setList(onlyFiles);
          setLoading(false);
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceOnChange = useCallback(debounce(onChange, 400), []);

  const onItemClick = (item) => {
    setSelectedResource(item);
  };

  return (
    <Card variant="outlined">
      {error && <Alert severity="error">{error}!</Alert>}
      <h4 className="Heading">DropBox</h4>
      <div className="DropboxContainer">
        <div className="SearchDropBox">
          <TextField
            id="search-movie-tv"
            label="Movie - Tv Series"
            variant="standard"
            onChange={debounceOnChange}
            sx={{ width: 400 }}
            defaultValue={searchQuery}
          />
        </div>
        {loading ? (
          <p>loading...</p>
        ) : selectedResource ? (
          <div>
            <p>
              {selectedResource.name}
              <span
                className="CloseSelected"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedResource(null);
                  setFlag(false);
                }}
              >
                &#10006;
              </span>
            </p>
            <Button
              variant="contained"
              onClick={async () => {
                await getSharableLink(selectedResource);
                setFlag(true);
              }}
            >
              Set VideoPlayer Link
            </Button>
          </div>
        ) : (
          <SearchList options={list} onItemClick={onItemClick} />
        )}
        {shareablelink ? <p className="Green"> link generated </p> : <></>}
      </div>
    </Card>
  );
}

export default DropboxContainer;
