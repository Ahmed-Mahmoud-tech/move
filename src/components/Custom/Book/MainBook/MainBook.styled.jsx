import styled from 'styled-components';
export const Wrapper = styled.div`
  .videoCont {
    position: absolute;
    min-width: 800px;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    border: 1px solid #292929;
    box-shadow: 0 0 5px 5px #222222;
    box-sizing: content-box;
  }

  /************************ */
  /* 
  .rtl .page-cover {
    transform: rotateZ(180deg);
  } */

  .flip-book {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
    display: none;
    background-size: cover;
  }

  .page {
    background-color: hsl(35, 55, 98);
    color: hsl(35, 35, 35);
    border: solid 1px hsl(35, 20, 70);
    overflow: hidden;

    .page-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;

      .page-header {
        height: 30px;
        font-size: 100%;
        text-transform: uppercase;
        text-align: center;
      }

      .page-image {
        height: 100%;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
      }

      .page-text {
        height: 100%;
        flex-grow: 1;
        font-size: 80%;
        text-align: justify;
        margin-top: 10px;
        padding-top: 10px;
        box-sizing: border-box;
        border-top: solid 1px hsl(35, 55, 90);
      }

      .page-footer {
        height: 30px;
        border-top: solid 1px hsl(35, 55, 90);
        font-size: 80%;
        color: hsl(35, 20, 50);
      }
    }

    &.--left .shadow {
      // for left page (property will be added automatically)
      border-right: 0;
      /* box-shadow: inset -7px 0 50px -7px red; */
      box-shadow: inset -7px 0 50px -7px rgba(0, 0, 0, 0.3);
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 1;

      &:after {
        content: '';
        width: 0px;
        height: 100%;
        position: absolute;
        right: 0;
        /* background: rgba(0, 0, 0, 0.1); */
        box-shadow: 0px 0 50px 10px rgba(0, 0, 0, 0.6);
      }
    }

    &.--right .shadow {
      // for right page (property will be added automatically)
      border-left: 0;
      box-shadow: inset 7px 0 30px -7px rgba(0, 0, 0, 0.3);
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 1;
      &:after {
        content: '';
        width: 0px;
        height: 100%;
        position: absolute;
        left: 0;
        /* background: rgba(0, 0, 0, 0.1); */
        box-shadow: 0px 0 50px 10px rgba(0, 0, 0, 0.3);
      }
      &:before {
        content: '';
        width: 0px;
        height: 100%;
        position: absolute;
        left: 15%;

        /* background: rgba(0, 0, 0, 0.1); */
        box-shadow: 0px 0 50px 10px rgba(255, 255, 255, 0.5);
      }
    }

    &.hard {
      // for hard page
      background-color: hsl(35, 50, 90);
      border: solid 1px hsl(35, 20, 50);
    }

    &.page-cover {
      background-color: hsl(35, 45, 80);
      color: hsl(35, 35, 35);
      border: solid 1px hsl(35, 20, 50);
      h2 {
        text-align: center;
        padding-top: 50%;
        font-size: 210%;
      }

      &.page-cover-top {
        box-shadow:
          inset 0px 0 30px 0px rgba(36, 10, 3, 0.3),
          -2px 0 5px 2px rgba(0, 0, 0, 0.4);
      }

      &.page-cover-bottom {
        box-shadow:
          inset 0px 0 30px 0px rgba(36, 10, 3, 0.3),
          10px 0 8px 0px rgba(0, 0, 0, 0.4);
      }
    }
  }
`;
