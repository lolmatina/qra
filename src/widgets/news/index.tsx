'use client';

import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextLink from 'next/link';
interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  preview_image: string;
}

function NewsSlider() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news?page=1&limit=9');
        const data = await res.json();
        setNewsItems(data.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch news:', error);
      }
    }
    fetchNews();
  }, []);

  const handlePrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
      currentSlide > 1 && setCurrentSlide(currentSlide - 1);
    }
  };
  const handleNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
      currentSlide < newsItems.length && setCurrentSlide(currentSlide + 1);
    }
  };

  if (!newsItems.length) {
    return null;
  }

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  

  return (
    <div className="relative">
      <Slider {...settings} ref={sliderRef}>
        {newsItems.map((item: NewsItem) => (
          <div key={item.id} className="px-2">
            <div className="h-[400px] relative">
              <img
                src={item.preview_image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <NextLink href={`/news/${item.id}`} className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-6 hover:bg-opacity-75 transition-opacity">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm">{item.summary.length > 100 ? `${item.summary.slice(0, 100)}...` : item.summary}</p>
              </NextLink>
            </div>
          </div>
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
    </div>
  );
}

export default function News() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Последние новости</h2>
        <NewsSlider />
      </div>
    </section>
  );
}