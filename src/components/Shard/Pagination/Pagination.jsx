/* eslint-disable indent */
// Carousel.js

import React, { useState } from 'react';
import './Pagination.styled'; // Import the styles
import { Wrapper } from './Pagination.styled';
import Button from '../Button/Button';

const Pagination = ({ presentations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  const book = (presentation) => (
    <div>
      <a href={`/display/${presentation.id}`}>
        <div className="imageWrapper">
          <img
            className=""
            src={`/presentationsDirectory/${
              presentation.id
            }/outputImages/page-${'0'.repeat(
              presentation.pagesCount.toString().length - 1
            )}1.png`}
            alt=""
          />
        </div>
        <div className="text-center whitespace-nowrap overflow-hidden text-ellipsis">
          {presentation.name}
        </div>
      </a>
      <div className="flex rounded-md overflow-hidden">
        <Button
          onClick={() => exportPresentation(presentation.id)}
          text={'Export'}
          className="bg-thirdColor py-1 px-3 text-lg w-1/2"
        />

        <Button
          style={{ background: 'red', padding: '5px' }}
          className="bg-error py-1 px-3 text-lg  w-1/2"
          action={() => deletePre(presentation.id)}
          text={'Delete'}
        />
      </div>
    </div>
  );
  const getSlideContent = () => {
    const sectionCount = 3;

    return (
      <>
        {presentations.map((x, index) => (
          <>
            {index % sectionCount == 0 && (
              <>
                <div
                  className="carousel-item pb-4 px-2 bg-darkBlueColor"
                  key={index}
                >
                  {presentations
                    .slice(index, index + sectionCount)
                    .map((bookPresentation, index2) => (
                      <div
                        className="carousel-item-content"
                        key={index2}
                        style={{ maxWidth: `${100 / sectionCount}%` }}
                      >
                        {book(bookPresentation)}
                      </div>
                    ))}
                </div>
              </>
            )}
          </>
        ))}
      </>
    );
  };

  return (
    <Wrapper>
      <div className="carousel">
        <div
          className="carousel-wrapper"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {getSlideContent()}
        </div>

        <button onClick={prevSlide} className="carousel-btn prev">
          &#9664;
        </button>
        <button onClick={nextSlide} className="carousel-btn next">
          &#9654;
        </button>
      </div>
    </Wrapper>
  );
};

export default Pagination;
