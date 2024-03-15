export default function Pagination({images,activeSlide, setActiveSlide}) {
  const handlePaginationClick = (index ) => {
    setActiveSlide(index);
  }

  const isActive = (index) => {
    return activeSlide === index ? "active-button" : "";
  }

  const createPaginationButtons = () => {
    const paginations = images.map((_, index) => (
      <button 
      key={index}
      className={`switch-button ${isActive(index)}`}
      onClick={() => handlePaginationClick(index)}
      >
      </button>
    ))
    return paginations;
  }
  return (
    <span className="pagination">
    {createPaginationButtons()}
   </span>
  )
}