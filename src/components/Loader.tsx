// src/components/Loader.tsx
import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const dash = keyframes`
  0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
  100% { stroke-dasharray: 1, 150; stroke-dashoffset: -125; }
`;

const Loader: React.FC = () => {
  return (
    <Wrapper>
      <svg className="circular" viewBox="25 25 50 50">
        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="4" />
      </svg>
      <div className="text">Loading</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .circular {
    width: 80px;
    height: 80px;
    animation: ${rotate} 2s linear infinite;
  }

  .path {
    stroke: #00bfa5;
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
  }

  .text {
    margin-top: 1em;
    font-size: 1.5em;
    color: #00bfa5;
    font-weight: bold;
    letter-spacing: 2px;
  }
`;

export default Loader;
