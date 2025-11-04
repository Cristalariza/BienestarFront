import { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import styles from "../../../styles/shared/slider.module.css";

const Slider = ({
  slides = [],
  autoPlayInterval = 5000,
  showDots = true,
  pauseOnHover = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const timerRef = useRef(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (isPaused || slides.length <= 1 || autoPlayInterval <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, goToNext, autoPlayInterval, slides.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  if (!slides || slides.length === 0) {
    return (
      <div className={styles.sliderContainer}>
        <div className={styles.loading}>
          <p>No hay slides disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.sliderContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={styles.sliderWrapper}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id || index} className={styles.slide}>
            <img
              src={slide.image}
              alt={slide.alt || slide.title || `Slide ${index + 1}`}
              className={styles.slideImage}
              loading={index === 0 ? "eager" : "lazy"}
            />

            {slide.showOverlay !== false && (
              <div className={styles.slideOverlay}></div>
            )}

            {(slide.title || slide.subtitle || slide.buttonText) && (
              <div className={styles.slideContent}>
                {slide.title && (
                  <h2 className={styles.slideTitle}>{slide.title}</h2>
                )}
                {slide.subtitle && (
                  <p className={styles.slideSubtitle}>{slide.subtitle}</p>
                )}
                {slide.buttonText && slide.buttonLink && (
                  <a
                    href={slide.buttonLink}
                    className={styles.slideButton}
                    onClick={slide.onButtonClick}
                  >
                    {slide.buttonText}
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.sliderOverlay}></div>

      {showDots && slides.length > 1 && (
        <div className={styles.dotsContainer}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                currentIndex === index ? styles.dotActive : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Slider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ).isRequired,
  autoPlayInterval: PropTypes.number,
  showDots: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
};

export default Slider;
