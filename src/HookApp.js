import { useEffect, useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import Component from "./Component";

export function useIntersectionObserver(ref, options, forward) {
  const [element, setElement] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = (useRef < null) | (IntersectionObserver > null);

  const cleanOb = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };

  useEffect(() => {
    setElement(ref.current);
  }, [ref]);

  useEffect(() => {
    if (!element) return;
    cleanOb();
    const ob = (observer.current = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        if (!forward) {
          setIsIntersecting(isElementIntersecting);
        } else if (forward && !isIntersecting && isElementIntersecting) {
          setIsIntersecting(isElementIntersecting);
          cleanOb();
        }
      },
      { ...options }
    ));
    ob.observe(element);
    return () => {
      cleanOb();
    };
  }, [element, options]);
  // console.log("this...", ref, element, options);
  return isIntersecting;
}

function Home({ token, enqueueSnackbar, closeSnackbar }) {
  const loadingRef = useRef();
  const ref = useRef();
  const [page, setpage] = useState(0);
  const [photos, setphotos] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [prevY, setPrevY] = useState(0);
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0
  };

  const getPhotos = (page) => {
    setloading(true);
    axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
      )
      .then((res) => {
        console.log("res...", res.data);
        setloading(false);
        setphotos((prev) => [...prev, ...res.data]);
      });
  };

  useEffect(() => {
    getPhotos(page);
  }, [page]);

  const isBottomVisible = useIntersectionObserver(
    ref,
    {
      threshold: 0
    },
    false
  );

  useEffect(() => {
    isBottomVisible && setpage((prev) => prev + 1);
  }, [isBottomVisible]);
  const pageSize = 10;
  console.log(page, photos);
  return (
    <div className="container">
      <div className="main">
        <div style={{ minHeight: "800px" }}>
          {photos.map((data) => (
            <div style={{ height: "600px" }}>
              <img src={data.url} alt="pic" />
            </div>
          ))}
        </div>
        <div ref={ref} style={{ width: "100%", height: "20px" }}>
          Bottom
        </div>
        {/* <div
          ref={loadingRef}
          style={{
            height: "100px",
            border: "1px solid red",
            margin: "30px",
            position: "relative"
          }}
        >
          <span
            style={{
              display: loading ? "block" : "none",
              justifyContent: "center",
              alignSelf: "center"
            }}
          >
            Loading...
          </span>
        </div> */}
      </div>
    </div>
  );
}
export default Home;
