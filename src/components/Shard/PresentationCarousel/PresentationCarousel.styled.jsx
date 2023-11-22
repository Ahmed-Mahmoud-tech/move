import styled from 'styled-components';
export const Wrapper = styled.div`
  /* Carousel.css */

  .carousel {
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  .carousel-wrapper {
    display: flex;
    transition: transform 0.5s ease;
  }

  .carousel-item {
    flex-shrink: 0;
    width: 100%;
    display: flex;
    align-items: end;
  }

  .carousel-item-content {
    flex-grow: 1;
    margin: 0 5px;

    .imageWrapper {
      overflow: hidden;
    }
    div a {
      overflow: hidden;
      display: block;
      margin-bottom: 10px;

      img {
        max-width: 120%;
        position: relative;
        left: -10%;
        top: 10px;
      }
    }
  }

  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgb(122 122 122 / 44%);
    border: none;
    font-size: 24px;
    cursor: pointer;
    outline: none;
    padding: 10px;
  }

  .prev {
    left: 10px;
  }

  .next {
    right: 10px;
  }
`;
