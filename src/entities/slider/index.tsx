'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const CertificateSlider = ({ images }: { images: JSX.Element[] }) => {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'slick-dots',
    nextArrow: <button type="button" className="slick-next" style={{ backgroundColor: '#558D94' }} />,
    prevArrow: <button type="button" className="slick-prev" style={{ backgroundColor: '#558D94' }} />
  };

  const handlePrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
      currentSlide > 1 && setCurrentSlide(currentSlide - 1);
    }
  };
  const handleNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
      currentSlide < images.length && setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="relative">
      <Slider {...settings} ref={sliderRef}>
        {images.map((image, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer w-full"
            aria-label={`View certificate ${index + 1}`}
          >
            {image}
          </button>
        ))}
      </Slider>
      <button
        type="button"
        onClick={handlePrevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-4 hover:bg-opacity-75"
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        type="button"
        onClick={handleNextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-4 hover:bg-opacity-75"
        aria-label="Next slide"
      >
        →
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl flex items-center justify-center max-h-[90vh] mx-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
              aria-label="Close modal"
            >
              ✕
            </button>
            
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={4}
              centerOnInit
              wheel={{ wheelDisabled: false }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <TransformComponent
                    wrapperClass="w-full h-full flex items-center justify-center"
                    contentClass="flex items-center justify-center"
                  >
                    <div className="bg-white flex items-center justify-center">
                      {images[currentSlide]}
                    </div>
                  </TransformComponent>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    <button
                      type="button"
                      onClick={() => zoomIn()}
                      className="bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
                      aria-label="Zoom in"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => zoomOut()}
                      className="bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
                      aria-label="Zoom out"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => resetTransform()}
                      className="bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
                      aria-label="Reset zoom"
                    >
                      ↺
                    </button>
                  </div>
                </>
              )}
            </TransformWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateSlider;
