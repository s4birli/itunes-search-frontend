import styled from 'styled-components';

const BodyStyled = styled.div`
  display: flex;
  border-radius: 4px;
  border: 2px solid #eee;
  padding: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  min-height: 120px;
  > .loading {
    padding: 10px;
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 /0.75);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;Bo
    color: #fff;
  }
  .files {
    width: 100%;
    .file {
      position: relative;
      .trash {
        position: absolute;
        z-index: 2;
        top: 10px;
        right: 10px;
        background-color: #fff;
        border-radius: 100%;
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      > div > img, div > video {
        max-height: 400px;
        width: 100%;
        object-fit: cover;
      }
    }
  }
`;

export default BodyStyled;
