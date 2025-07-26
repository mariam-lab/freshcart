import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import homeSliderImg from "../../assets/images/home-slider-1.png";
export default function HomeSlider() {
  return (
    <>
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        navigation
      >
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url('${homeSliderImg}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay text-white  py-24 bg-gradient-to-r from-primary-600/95 to-primary-600/40">
              <div className="container space-y-4">
                <h2 className="text-2xl font-bold">
                  Fresh Products delivered <br /> to your Door
                </h2>
                <p>Get 20% off for your first order</p>
                <div className="space-x-3">
                  <button className="btn bg-white hover:bg-gray-100 text-primary-600 border-2 border-white">
                    Shop now
                  </button>
                  <button className="btn border-2 hover:bg-white hover:text-primary-600 border-white bg-transparent text-white ">
                    View Deals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url('${homeSliderImg}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay text-white  py-24 bg-gradient-to-r from-primary-600/95 to-primary-600/40">
              <div className="container space-y-4">
                <h2 className="text-2xl font-bold">
                  Fresh Products delivered <br /> to your Door
                </h2>
                <p>Get 20% off for your first order</p>
                <div className="space-x-3">
                  <button className="btn bg-white hover:bg-gray-100 text-primary-600 border-2 border-white">
                    Shop now
                  </button>
                  <button className="btn border-2 hover:bg-white hover:text-primary-600 border-white bg-transparent text-white ">
                    View Deals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url('${homeSliderImg}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay text-white  py-24 bg-gradient-to-r from-primary-600/95 to-primary-600/40">
              <div className="container space-y-4">
                <h2 className="text-2xl font-bold">
                  Fresh Products delivered <br /> to your Door
                </h2>
                <p>Get 20% off for your first order</p>
                <div className="space-x-3">
                  <button className="btn bg-white hover:bg-gray-100 text-primary-600 border-2 border-white">
                    Shop now
                  </button>
                  <button className="btn border-2 hover:bg-white hover:text-primary-600 border-white bg-transparent text-white ">
                    View Deals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      ;
    </>
  );
}
