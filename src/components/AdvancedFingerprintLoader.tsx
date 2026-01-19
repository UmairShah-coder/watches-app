import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FingerprintSwitch: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!checked) return;
    setProgress(0);
    setScanComplete(false);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setScanComplete(true);
          return 100;
        }
        return p + 2; // 2% per tick
      });
    }, 30); // ~1.5s total
  }, [checked]);

  return (
    <StyledWrapper>
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div className="button">
          <div className="icon">
            {/* Fingerprint SVG */}
            <svg viewBox="0 0 64 64">
              <g stroke="white" strokeWidth="2" fill="none">
                <path
                  d="M32 4c-10 0-12 12-12 12s0 16 12 16 12-16 12-16-2-12-12-12z"
                  strokeDasharray="100"
                  strokeDashoffset={100 - progress}
                />
                <path
                  d="M32 20c-6 0-8 8-8 8s0 10 8 10 8-10 8-10-2-8-8-8z"
                  strokeDasharray="100"
                  strokeDashoffset={100 - progress}
                />
                <path
                  d="M32 36c-4 0-5 6-5 6s0 8 5 8 5-8 5-8-1-6-5-6z"
                  strokeDasharray="100"
                  strokeDashoffset={100 - progress}
                />
              </g>
            </svg>

            {/* Tick mark */}
            {scanComplete && (
              <svg
                className="tick"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch input {
    display: none;
  }
  .button {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .button .icon {
    width: 80px;
    height: 80px;
    position: relative;
  }
  .button .icon svg {
    width: 100%;
    height: 100%;
  }
  .tick {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    transform: translate(-50%, -50%) scale(0);
    animation: tickScale 0.5s forwards;
  }
  @keyframes tickScale {
    0% { transform: translate(-50%, -50%) scale(0); }
    100% { transform: translate(-50%, -50%) scale(1); }
  }
`;

export default FingerprintSwitch;
