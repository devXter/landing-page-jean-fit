import React from 'react';
import useKeenSlider from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const testimonios = [
  {
    nombre: 'Javiera',
    edad: 25,
    imagen: '/IMG_6046.jpeg',
    texto: 'Bajé 10 kilos de grasa en un año. Lo mejor fue tener una planificación clara y motivación constante.'
  },
  {
    nombre: 'Mariana',
    edad: 28,
    imagen: '/f804fb8d-fcdb-4c01-8436-6f8c60e274d7.jpeg',
    texto: 'Mejoré glúteos, cintura y tonifiqué brazos. El plan me ayudó a enfocarme y sentirme más segura entrenando.'
  },
  {
    nombre: 'Miguel',
    edad: 33,
    imagen: '/IMG_5758.jpeg',
    texto: 'Entreno con JeanFIT y su plan con nutrición hace más de un año. He visto cambios sorprendentes tanto en mi físico como en mi energía diaria.'
  }
];

const autoplay = (slider) => {
  let timeout;
  let mouseOver = false;
  function clearNextTimeout() {
    clearTimeout(timeout);
  }
  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      if (slider) slider.next();
    }, 4000);
  }
  slider.on('created', () => {
    slider.container.addEventListener('mouseover', () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener('mouseout', () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on('dragStarted', clearNextTimeout);
  slider.on('animationEnded', nextTimeout);
  slider.on('updated', nextTimeout);
};

export default function TestimonialCarousel() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 768px)': { perView: 2 },
      '(min-width: 1024px)': { perView: 3 },
    },
    created() {
      // No-op, autoplay plugin se encarga
    },
  }, [autoplay]);

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        {testimonios.map((t, idx) => (
          <div className="keen-slider__slide flex flex-col items-center testimonial-card group" key={idx}>
            <div className="testimonial-img-wrapper">
              <img src={t.imagen} alt={`Testimonio ${t.nombre}`} className="testimonial-img" />
            </div>
            <div className="testimonial-caption">
              <span className="font-bold text-dark-900">{t.nombre}</span>
              <span className="text-gray-500 text-sm">, {t.edad} años</span>
            </div>
            <blockquote className="testimonial-quote">
              <span className="testimonial-quote-mark">"</span>{t.texto}<span className="testimonial-quote-mark">"</span>
            </blockquote>
          </div>
        ))}
      </div>
      {/* Flechas */}
      <div className="flex justify-center gap-6 mt-8">
        <button
          aria-label="Anterior"
          className="arrow-btn"
          onClick={() => instanceRef.current && instanceRef.current.prev()}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          aria-label="Siguiente"
          className="arrow-btn"
          onClick={() => instanceRef.current && instanceRef.current.next()}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <style jsx>{`
        .testimonial-card {
          background: #fff;
          border-radius: 1.5rem;
          box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);
          padding: 2rem 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.3s ease;
          position: relative;
          min-height: 480px;
          margin: 0 0.5rem;
        }
        .testimonial-card:hover {
          box-shadow: 0 8px 32px 0 rgba(237, 28, 36, 0.15);
          transform: translateY(-4px);
        }
        .testimonial-img-wrapper {
          position: relative;
          margin-bottom: 1rem;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }
        .testimonial-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .group:hover .testimonial-img {
          transform: scale(1.05);
        }
        .group:hover .testimonial-img-wrapper {
          box-shadow: 0 0 20px 0 rgba(237, 28, 36, 0.4);
        }
        .testimonial-caption {
          text-align: center;
          font-size: 1rem;
          font-weight: 600;
          color: #23272f;
          margin-bottom: 0.5rem;
        }
        .testimonial-quote {
          font-size: 1.1rem;
          color: #23272f;
          font-weight: 500;
          text-align: center;
          margin-top: 0.5rem;
          margin-bottom: 0;
          position: relative;
        }
        .testimonial-quote-mark {
          color: #ed1c24;
          font-size: 2.2rem;
          font-weight: bold;
          vertical-align: middle;
          line-height: 1;
        }
        .arrow-btn {
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 2px 8px 0 rgba(237, 28, 36, 0.10);
          border: 2px solid #ed1c24;
          color: #ed1c24;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .arrow-btn:hover {
          background: #ed1c24;
          color: #fff;
          box-shadow: 0 4px 16px 0 rgba(237, 28, 36, 0.18);
        }
        @media (max-width: 768px) {
          .testimonial-card {
            min-height: 420px;
            padding: 1.5rem 0.5rem 1rem 0.5rem;
          }
          .testimonial-img-wrapper {
            width: 160px;
            height: 160px;
          }
        }
      `}</style>
    </div>
  );
} 