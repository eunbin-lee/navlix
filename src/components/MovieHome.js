import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './Movie.css';

class MovieHome extends React.Component {
    state = {
        isLoading: true,
        results: [],
        total_pages: 1,
        page: 1,
    };
    article = null;
    //페이지 선택 시 해당 정보만 넘겨준다
    //일단 총페이지 값 받아왔다
    //클릭이벤트를 넣어서
    //Hash->Route->Link->to={this.state.page}

    //하고자 하는 것: 페이지를 나눈다
    //페이지를 클릭하면 20개의 결과물이 나온다
    //for문을 쓰지 않는다
    createLi = (total_pages) => {
        const ul = document.querySelector('.pages');
        for (let i = 1; i <= total_pages; i++) {
            const li = document.createElement('li');
            li.innerText = `${i}`;
            ul.appendChild(li);
            li.addEventListener('click', (e) => {
                // e.preventDefault();
                this.setState({ page: Number(e.target.innerText) });
            });
        }
    };

    getMovie = async () => {
        const getTotalPages = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=72892f68da9d9b2d2cef54e7fa2b8bc8&language=en-US&page=${this.state.page}`,
        );
        const { total_pages, results } = getTotalPages.data;
        this.createLi(total_pages);
        this.setState({ results, total_pages, isLoading: false });
        console.log(this.state.page);
        console.log(getTotalPages.config.url);
    };

    componentDidMount() {
        this.getMovie();
    }

    render() {
        const { isLoading, results } = this.state;
        return (
            <div>
                <div className="container">
                    {isLoading ? (
                        <div>hi</div>
                    ) : (
                        <div className="movies">
                            {results.map((movie) => (
                                <Movie
                                    key={movie.id}
                                    title={movie.original_title}
                                    poster={movie.poster_path}
                                    // genre={movie.genre_ids}
                                    rating={movie.vote_average}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <ul className="pages"></ul>
            </div>
        );
    }
}
export default MovieHome;
