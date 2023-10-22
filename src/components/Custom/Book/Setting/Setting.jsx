import React, { useState } from 'react';
import { Wrapper } from './Setting.styled';
import {
  BsFillDoorClosedFill,
  BsFillDoorOpenFill,
  BsArrowsFullscreen,
  BsFullscreenExit,
  BsZoomIn,
  BsZoomOut,
  BsPlug,
  BsPlugin,
} from 'react-icons/bs';

import { TbLayersOff, TbLayersSubtract } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const Setting = ({
  setFull,
  full,
  setZoom,
  zoom,
  setAutoFlipTime,
  autoFlipTime,
  setAutoFlip,
  autoFlip,
  setPageNumGO,
  setBgColor,
  bgColor,
  bookShadow,
  setBookShadow,
  flippingTime,
  setFlippingTime,
  pages,
  handleResize,
  setReload,
  reload,
  presentationId,
}) => {
  const [menuPosition, setMenuPosition] = useState(false);
  const [closeSideBar, setCloseSideBar] = useState(true);

  const saveConfig = async () => {
    const Data = {
      bgColor,
      bookShadow,
      flippingTime,
      autoFlipTime,
      presentationId,
    };

    const response = await window.versions.presentationConfig(Data);
  };
  return (
    <Wrapper fixed={menuPosition} close={closeSideBar}>
      <span
        className="toggleSidebar"
        onClick={() => {
          setReload(reload + 1);
          setCloseSideBar(!closeSideBar);
          setTimeout(() => {
            handleResize();
          }, 1000);
        }}
      >
        {closeSideBar ? <BsFillDoorClosedFill /> : <BsFillDoorOpenFill />}
      </span>
      <div className="sideMenu">
        <div className="logo">move</div>
        <div className="itemsWrapper">
          <div
            className="menuItem"
            onClick={() => {
              setReload(reload + 1);
              setMenuPosition(!menuPosition);
              setTimeout(() => {
                handleResize();
              }, 0);
            }}
          >
            <span className="icon">
              {menuPosition ? (
                <TbLayersOff style={{ color: 'var(--thirdColor)' }} />
              ) : (
                <TbLayersSubtract />
              )}
            </span>
            <span className="text">Fixed Sidebar</span>
          </div>
          <div className="menuItem" onClick={() => setFull(!full)}>
            <span className="icon">
              {full ? (
                <BsFullscreenExit style={{ color: 'var(--thirdColor)' }} />
              ) : (
                <BsArrowsFullscreen />
              )}
            </span>
            <span className="text">Screen</span>
          </div>
          <div className="menuItem" onClick={() => setZoom(!zoom)}>
            <span className="icon">
              {zoom ? (
                <BsZoomOut style={{ color: 'var(--thirdColor)' }} />
              ) : (
                <BsZoomIn />
              )}
            </span>
            <span className="text">Zoom</span>
          </div>

          <hr />

          <div className="menuItem">
            <span className="icon">Background </span>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
          <div className="menuItem">
            <div className="icon">Shadow</div>
            <input
              type="range"
              min="0"
              max="100"
              value={bookShadow}
              onChange={(e) => setBookShadow(e.target.value)}
              className="slider"
              id="myRange"
            />
          </div>
          <div className="menuItemInput">
            <label htmlFor="">Flip Speed (sec)</label>
            <input
              type="text"
              value={flippingTime}
              placeholder=""
              onChange={(e) => setFlippingTime(e.target.value)}
            />
          </div>
          <hr />

          <div className="menuItem" onClick={() => setAutoFlip(!autoFlip)}>
            <span className="icon">
              {autoFlip ? (
                <BsPlug style={{ color: 'var(--thirdColor)' }} />
              ) : (
                <BsPlugin />
              )}
            </span>
            <span className="text">Auto Flip</span>
          </div>
          <div className="menuItemInput">
            <label htmlFor="">Auto Flip Time (sec)</label>
            <input
              type="text"
              value={autoFlipTime}
              onChange={(e) => setAutoFlipTime(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="menuItemInput">
            <label htmlFor="">Go To Page (Num)</label>
            <input
              type="text"
              placeholder=""
              onChange={(e) => {
                setPageNumGO(e.target.value);
              }}
            />
          </div>
          <hr />
          <div className="index">
            <div className="title">Book Index</div>
            <ul>
              {pages &&
                pages.map((page, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setPageNumGO(page.num);
                      setTimeout(() => {
                        setPageNumGO('');
                      }, 1000);
                    }}
                    className="indexItem"
                  >
                    {page.title}
                  </li>
                ))}
            </ul>
          </div>
          <div className="createPresentation">
            <Link to="/">Create Presentation</Link>
          </div>

          <button className="config" onClick={() => saveConfig()}>
            Save Config
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Setting;
