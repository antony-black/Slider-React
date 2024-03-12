import React from "react";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs";
import { useState, useEffect } from "react";
import "./index.scss";

export default function App() {
  const [images, setImages] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  let url = 'https://picsum.photos/v2/list';
  
  const fetchImages = async (curentURL) => {
    try {
      setLoading(true);
      const response = await fetch(`${curentURL}?page=1&limit=4`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch(e) {
      setErrorMsg(e.message);
      setLoading(false);
    }

  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  if(isLoading) {
    return <div>...loading</div>;
  }

  if(errorMsg) {
    return <div>{errorMsg}</div>
  }

  const handlePrevious = () => {
    setActiveSlide(activeSlide === 0 ? images.length - 1 : activeSlide - 1);
  }
  const handleNext = () => {
    setActiveSlide(activeSlide === images.length - 1 ? 0 : activeSlide + 1);
  }
  const handlePagination = (index) => {
    setActiveSlide(index);
  }

  return <div className="app">
    <BsArrowLeftCircleFill className="arrow arrow-left" onClick={handlePrevious}/>
    {
      images && images.length ?
      images.map((item, index) => {
        return <img 
        key={item.id}
        src={item.download_url} 
        alt={item.download_url}
        className= {activeSlide === index ? "active-image" : "hide-image"}
        />
      }) 
      : null
    }
    <BsArrowRightCircleFill className="arrow arrow-right" onClick={handleNext}/>
    <span className="pagination">
      {
        images && images.length ?
        images.map((_, index) => {
          return <button 
          key={index} 
          className={activeSlide === index 
            ? "switch-button active-button" 
            : "switch-button inactive-button"}
          onClick={() => handlePagination(index)}
          ></button>
        })
        : null
      }
    </span>
  </div>;
}
