import React from "react";
import { css } from "@emotion/core";
import StyledBackgroundSection from "./StyledBackgroundSection";
const Splash = () => {
  return (
    <div
      css={css`
        position: relative;
        top: 64px;
      `}
    >
      <StyledBackgroundSection />
    </div>
  );
};

export default Splash;
