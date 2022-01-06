import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

const ProductImage = ({ detail }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (detail.images && detail.images.length > 0) {
      const images = [];
      detail.images.map((item) =>
        images.push({
          original: `https://ootd-dongit.herokuapp.com/${item}`,
          thumbnail: `https://ootd-dongit.herokuapp.com/${item}`,
        })
      );
      setImages(images);
    }
  }, [detail.images]);

  return (
    <div>
      <ImageGallery items={images} />
    </div>
  );
};

export default ProductImage;