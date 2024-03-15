export default function Slide({images, activeSlide}) {
  const getImages = () => {
    return images.map((image, index) => (
      <img
      key={image.id}
      src={image.download_url}
      alt={image.download_url}
      className={activeSlide === index ? "active-image" : "hide-image"}
      />
    ))
  }
  return getImages();
}