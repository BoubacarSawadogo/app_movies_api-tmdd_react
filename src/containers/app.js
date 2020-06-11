import React, { Component } from "react";
import SearchBar from "../components/search-bar";
import VideoList from "../containers/video-list";
import axios from "axios";
import VideoDetail from "../components/video-detail";
import Video from "../components/video";
import "../style/style.css";

const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL =
  "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";
const API_KEY = "api_key=0c24217672c886d51c39a20d9fe69044";
const SEARCH_URL = "search/movie?language=fr&include_adult=false";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: {},
      currentMovie: {},
    };
  }

  componentWillMount() {
    this.getMovies();
  }

  getMovies() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(
      function (response) {
        this.setState(
          {
            movieList: response.data.results.slice(),
            currentMovie: response.data.results[0],
          },
          function () {
            this.applyVideoToCurrentMovie();
          }
        );
      }.bind(this)
    );
  }

  applyVideoToCurrentMovie() {
    axios
      .get(
        `${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adulte=false`
      )
      .then(
        function (response) {
          console.log("mama", response);

          const youtubKey = response.data.videos.results[0].key;
          let newCurrentMovieState = this.state.currentMovie;
          newCurrentMovieState.videoId = youtubKey;
          this.setState({ currentMovie: newCurrentMovieState });
        }.bind(this)
      );
  }

  onClickListItem = (movie) => {
    this.setState(
      {
        currentMovie: movie,
      },
      function () {
        this.applyVideoToCurrentMovie();
        this.setRecommandation();
      }
    );
  };

  setRecommandation = () => {
    axios
      .get(
        `${API_END_POINT}movie/${this.state.currentMovie.id}/recommandations?${API_KEY}&language=fr`
      )
      .then(
        function (response) {
          console.log("SSS", response.data);

          this.setState({
            movieList: response.data.results.slice(0, 5),
          });
        }.bind(this)
      );
  };

  onClickSearch = (searchText) => {
    if (searchText) {
      axios
        .get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`)
        .then(
          function (response) {
            if (response.data && response.data.results[0]) {
              if (response.data.results[0].id !== this.state.currentMovie.id) {
                this.setState(
                  {
                    currentMovie: response.data.results[0],
                  },
                  () => {
                    this.applyVideoToCurrentMovie();
                    this.setRecommandation();
                  }
                );
              }
            }
          }.bind(this)
        );
    }
  };

  render() {
    const renderVideoList =
      this.state.movieList.length >= 5 ? (
        <VideoList
          movieList={this.state.movieList}
          callback={this.onClickListItem}
        />
      ) : null;

    return (
      <div>
        <div className="search_bar">
          <SearchBar callback={this.onClickSearch} />
        </div>

        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId} />
            <VideoDetail
              title={this.state.currentMovie.title}
              description={this.state.currentMovie.overview}
            />
          </div>
          <div
            classname="col-md-5"
            id="scrollItem"
            style={{
              height: 550,
              width: 350,
              overflow: "auto",
              scrollbarBaseColor: "gold",
              fontFamily: "sans-serif",
              padding: 10,
            }}
          >
            {renderVideoList}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
