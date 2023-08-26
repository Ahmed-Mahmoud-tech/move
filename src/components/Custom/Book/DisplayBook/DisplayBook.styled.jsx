import styled from 'styled-components';
export const Wrapper = styled.div`
  color: white;
  min-height: 100%;
  min-width: 100%;
  position: relative;
  background-color: ${(props) => props.bg};
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr auto;
  .divRef {
    position: relative;
  }
`;
