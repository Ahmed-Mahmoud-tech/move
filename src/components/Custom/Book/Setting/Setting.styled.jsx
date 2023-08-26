/* eslint-disable indent */
import styled from 'styled-components';
export const Wrapper = styled.div`
  .toggleSidebar {
    position: absolute;
    top: 3rem;
    z-index: 10000;
    right: 1rem;
    cursor: pointer;
    font-size: 2rem;
  }
  .sideMenu {
    transform: ${(props) => (props.close ? 'translateX(100%)' : '0')};
    position: ${(props) =>
      !props.fixed || props.close ? 'fixed' : 'relative'};
    right: 0;
    padding: 1rem;
    background: var(--darkBg);
    border-radius: 5px 0 0 5px;
    top: 2rem;
    height: fit-content;
    z-index: 100;
    transition: 0.25s;
  }
  .logo {
    font-size: var(--hugFont);
    line-height: 2rem;
    margin-bottom: 2rem;
    color: var(--mainColor);
    text-transform: capitalize;
    font-family: fantasy;
  }

  .menuItem {
    padding: 0.5rem;
    display: flex;
    align-items: center;
  }

  .title {
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: var(--bigFont);
  }

  .icon {
    margin-right: 0.5rem;
  }
  span.text {
    position: relative;
    top: -2px;
  }

  .menuItemInput {
    padding: 0 0.5rem;
    margin: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: end;

    label {
      margin-bottom: 2px;
      display: block;
    }

    input {
      width: 100%;
      max-width: 50px;
    }
  }
  li.indexItem {
    margin: 0.5rem 0.5rem 0.5rem 0;
  }

  hr {
    margin: 1rem;
    border: 1px solid var(--secondColor);
  }

  .itemsWrapper {
    max-height: calc(100vh - 150px);
    overflow-y: auto;
  }
`;
