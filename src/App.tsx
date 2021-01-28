import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import downloadIcon from '../assets/download.svg';
import './App.global.css';

import { getSearchResults, getSongData } from './utils';

const Hello = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [serachResults, setSearchResults] = React.useState<any>([]);

  return (
    <div className="container">
      <div className="row searchContainer">
        <div className="col-12">
          <div className="input-group">
            <input
              style={{ width: '90vw' }}
              type="text"
              className="form-control"
              placeholder="Search here"
              onChange={(e) => {
                const str = e.target.value;
                getSearchResults(str, 20)
                  // eslint-disable-next-line promise/always-return
                  .then((res) => {
                    setSearchResults(res);
                  })
                  .catch(() => setSearchResults([]));
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        {serachResults.map(
          (item: {
            bestThumbnail: { url: string | undefined };
            id: string | number | null | undefined;
            title: string;
            url: string;
          }) => {
            if (item.bestThumbnail) {
              return (
                <div className="col-12 searchResult">
                  <div className="searchItem">
                    <img
                      src={item.bestThumbnail.url}
                      key={item.id}
                      alt="some shit"
                      className="img-fluid"
                      width="200px"
                    />
                    <h4 className="title">{item.title}</h4>
                  </div>
                  <div>
                    <button
                      onClick={async () => {
                        const { songData, songTypeData } = await getSongData(
                          item.url
                        );
                        const blob = new Blob([songData]);
                        const fileName = `${item.title}.${songTypeData?.ext}`;
                        const link = document.createElement('a');
                        const url = URL.createObjectURL(blob);
                        link.setAttribute('href', url);
                        link.setAttribute('download', fileName);
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      type="button"
                      className="btn btn-link"
                    >
                      <img
                        src={downloadIcon}
                        alt="download"
                        width="50px"
                        style={{ cursor: 'pointer' }}
                      />
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          }
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
