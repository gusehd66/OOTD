import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

const ProductImage = ({ detail }) => {
  const [images, setImages] = useState([]);
  console.log(detail);
  useEffect(() => {
    if (detail.images && detail.images.length > 0) {
      const imagesArray = [];
      detail.images.map((item) =>
        imagesArray.push({
          original: item.image,
          thumbnail: item.image,
        })
      );
      setImages(imagesArray);
    }
  }, [detail.images]);

  return (
    <div>
      <ImageGallery items={images} />
    </div>
  );
};

export default ProductImage;
