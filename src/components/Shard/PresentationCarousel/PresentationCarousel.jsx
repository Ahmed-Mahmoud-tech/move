import React, { useEffect, useState } from 'react';
import { Wrapper } from './PresentationCarousel.styled';
import Button from '../Button/Button';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const PresentationCarousel = ({
  presentations: sourcePresentation,
  deletePre,
  exportPresentation,
}) => {
  const [sectionCount, setSectionCount] = useState(3);
  const [presentations, setPresentations] = useState(sourcePresentation);
  const presentationsCount = Math.ceil(presentations.length / sectionCount);

  useEffect(() => {
    setSectionCount(window.innerWidth > 1000 ? 3 : 2);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % presentationsCount);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + presentationsCount) % presentationsCount
    );
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
        <div className="text-center whitespace-nowrap overflow-hidden text-ellipsis ">
          {presentation.name}
        </div>
      </a>
      <div className="flex rounded-md overflow-hidden">
        <Button
          action={() => exportPresentation(presentation.id)}
          text={'Export'}
          className="  py-1 px-3 text-lg w-1/2 text-secondColor border border-secondColor rounded-tl-md rounded-bl-md"
        />

        <Button
          style={{ background: 'red', padding: '5px' }}
          className="text-thirdColor py-1 px-3 text-lg  w-1/2  border border-thirdColor rounded-tr-md rounded-br-md"
          action={() => deletePre(presentation.id)}
          text={'Delete'}
        />
      </div>
    </div>
  );
  const getSlideContent = () => {
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

  /*************************** */

  const filterByName = (value) => {
    const lowercasedValue = value.toLowerCase();
    return sourcePresentation.filter((item) =>
      item.name.toLowerCase().includes(lowercasedValue)
    );
  };

  /******************************* */

  return (
    <Wrapper>
      <div className="search relative  my-2">
        <FaMagnifyingGlass className="absolute top-3 left-3" />

        <input
          type="text"
          name=""
          id=""
          className="w-full p-2 pl-9 bg-blackColor border border-whiteColor rounded-lg overflow-hidden"
          onChange={(e) => setPresentations(filterByName(e.target.value))}
        />
      </div>

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

export default PresentationCarousel;
