import React, { Component } from "react";
import axios from "axios";

class ScrollComponent extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: false,
      page: 0,
      prevY: 0
    };
  }

  componentDidMount() {
    this.getPhotos(this.state.page);

    this.observer = new IntersectionObserver(this.handleObserver.bind(this), {
      root: null,
      rootMargin: "0px",
      threshold: 1
    });
    console.log("componentdidmount");
    this.observer.observe(this.loadingRef);
  }
  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    console.log("y...", this.state.prevY, y);
    if (this.state.prevY > y) {
      const lastPhoto = this.state.photos[this.state.photos.length - 1];
      const curPage = lastPhoto.albumId;
      this.getPhotos(curPage);
      this.setState({ page: curPage });
    }
    console.log("y1...", this.state.prevY, y);
    this.setState({ prevY: y });
  }

  getPhotos(page) {
    this.setState({ loading: true });
    axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
      )
      .then((res) => {
        this.setState({ photos: [...this.state.photos, ...res.data] });
        this.setState({ loading: false });
      });
  }

  render() {
    // Additional css
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };

    // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
    // console.log("lngth", this.state.photos.length);
    return (
      <div className="container">
        <div style={{ minHeight: "800px" }}>
          {this.state.photos.map((user, i) => (
            <img
              src={user.url}
              alt="asssssss"
              key={i}
              height="200px"
              width="200px"
            />
          ))}
        </div>
        <div
          ref={(loadingRef) => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>
    );
  }
}

export default ScrollComponent;
