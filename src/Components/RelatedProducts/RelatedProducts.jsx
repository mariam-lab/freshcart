import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { getAllProducts } from "../../../services/products-service";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import ProductCard from "../ProductCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
export default function RelatedProducts({ productDetails }) {
  const { category } = productDetails;
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  async function fetchRelatedProducts() {
    try {
      setIsLoading(true);
      const response = await getAllProducts({ category: category._id });
      if (response.success) {
        setIsLoading(false);

        setRelatedProducts(response.data.data);
      }
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchRelatedProducts();
  }, []);
  if (isloading) return <Loading />;
  return (
    <>
      <section id="related-products" className="py-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
            <div className="flex space-x-2">
              <button className="related-prev-btn h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className="related-next-btn h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            spaceBetween={10}
            loop={true}
            navigation={{
              nextEl: ".related-next-btn",
              prevEl: ".related-prev-btn",
            }}
          >
            {relatedProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard productInfo={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
