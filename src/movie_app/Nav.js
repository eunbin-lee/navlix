import React from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";
class Nav extends React.Component {
  state = {
    title: this.props.results,
  };
  // getTitle() {
  //   const { title } = this.state;
  //   for (let i = 0; i < title.length; i++) {
  //     this.setState({ title: this.props.results });
  //   }
  // }
  render() {
    return (
      //API,내가찜한 콘텐츠,검색기능,추천검색어
      <div className="headerWrap">
        <header className="header">
          <div className="logo">
            <img src={logo} alt="Navlix" className="movie_logo" />
          </div>
          <ul className="movie_nav">
            <li className="active">
              <Link to="/movie/home" className="link home">
                홈
              </Link>
            </li>
            <li>
              <Link to="/movie/latest" className="link latest">
                최신 콘텐츠
              </Link>
            </li>
            <li>
              <Link to="/movie/mylist" className="link mylist">
                내가 찜한 콘텐츠
              </Link>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}
export default Nav;
