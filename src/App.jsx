import React from "react";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs";
import Slide from "./components/Slide";
import Pagination from "./components/Pagination";
import { useState, useEffect } from "react";
import "./index.scss";

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  const url = 'https://picsum.photos/v2/list?page=1&limit=4';
  
  const fetchImages = async (curentURL) => {
    try {
      setLoading(true);
      const response = await fetch(curentURL);
      const data = await response.json();

      if (data?.length) {
        setImages(data);
        setLoading(false);
      }
    } catch(e) {
      setErrorMsg(e);
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchImages(url);
  },[url]);

  if(isLoading) {
    return <div>...loading</div>;
  }

  if(errorMsg) {
    return <div>{errorMsg}</div>
  }

  const handleNextArrow = () => {
    activeSlide === images.length -1 
      ? setActiveSlide(0) 
      : setActiveSlide(activeSlide + 1);
  }
  
  const handlePreviousArrow = () => {
    activeSlide === 0 
      ? setActiveSlide(images.length -1)
      : setActiveSlide(activeSlide - 1);
  }

  return <div className="app">
    <BsArrowLeftCircleFill className="arrow arrow-left" onClick={handlePreviousArrow}/>
    <Slide images={images} activeSlide={activeSlide}/>
    <BsArrowRightCircleFill className="arrow arrow-right" onClick={handleNextArrow}/>
    < Pagination 
    images={images} 
    activeSlide={activeSlide}
    setActiveSlide={setActiveSlide}
    />
  </div>;
}