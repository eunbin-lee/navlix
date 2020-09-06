import React from "react";
import axios from "axios";
import Search from "./Search";
import SearchedPage from "./SearchedPage";

class Latest extends React.Component {
  state = {
    isLoading: true,
    results: [],
    total_pages: 1,
    pages: 1,
  };
  NP_URL =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=72892f68da9d9b2d2cef54e7fa2b8bc8&language=en-US";
  ContentsEA = 30;
  movies = [];
  latestMovies = [];
  pageMovies = [];
  searchValue = [];

  createLi = (total_pages) => {
    const ul = document.querySelector("#ul");
    if (!ul.firstChild) {
      for (let i = 1; i <= total_pages; i++) {
        const li = document.createElement("li");
        li.innerText = `${i}`;

        li.addEventListener("click", (e) => {
          //setState가 이벤트에 제일 밑에 있어야 새로운 값을 넣을 수 있는데 setState 안에 값은 상관없다

          this.pageMovies = [];

          for (var j = 0; j < this.ContentsEA; j++) {
            var now = this.latestMovies[
              this.ContentsEA * (Number(e.target.innerText) - 1) + j
            ];

            if (now) {
              this.pageMovies[j] = now;
            }
          }
          this.setState({ pages: 2 });
        });
        ul.appendChild(li);
      }
    }
  };

  getMovie = async () => {
    const getTotalPages = await axios.get(`${this.NP_URL}&page=1`);
    const { total_pages } = getTotalPages.data;

    for (let i = 1; i <= total_pages; i++) {
      const getTotalPages = await axios.get(`${this.NP_URL}&page=${i}`);
      this.movies.push(getTotalPages);
    }

    for (let j = 0; j < this.movies.length; j++) {
      const latestFilter = this.movies[j].data.results.filter(
        (dish) =>
          dish.release_date.match("2020-08") && dish.poster_path !== null
      );
      this.latestMovies.push(...latestFilter);
    }

    //this.ContentsEA개씩 잘라서 넣는 것
    var total = Math.ceil(this.latestMovies.length / this.ContentsEA);

    //처음 1페이지
    for (var j = 0; j < this.ContentsEA; j++) {
      if (this.latestMovies[j]) {
        this.pageMovies[j] = this.latestMovies[j];
      }
    }
    this.createLi(total);
    this.setState({ total_pages, isLoading: false });
  };
  //컴포넌트 디드마운트에 getMovie를 넣으면 render뒤에 쓰이니까
  //이벤트는 실행
  //렌더->디드->(이벤트->렌더)반복
  componentDidMount() {
    this.getMovie();
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className="movieLatest">
        <Search
          onChangePage={(value) => {
            this.searchValue = [];
            this.movies.map((dish) =>
              dish.data.results.map((dish) => {
                if (value) {
                  if (dish.original_title.includes(value)) {
                    this.searchValue.push(dish);
                  }
                }
              })
            );
            this.setState({ isLoading: false });
          }}
        />
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : this.searchValue.length ? (
          this.searchValue.map((dish) => <SearchedPage dish={dish} />)
        ) : (
          <div>
            {this.pageMovies.map((dish) => (
              <div className="contentWrap">
                <div className="content">
                  <img
                    src={`http://i2.wp.com/image.tmdb.org/t/p/w780/${dish.poster_path}`}
                    alt={dish.poster_path}
                    className="imgsrc"
                  />
                  <p>{dish.original_title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="pageNum">
          <ul
            id="ul"
            style={{
              display: this.searchValue.length ? "none" : "block",
            }}
          ></ul>
        </div>
      </div>
    );
  }
}
export default Latest;