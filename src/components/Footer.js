import React from "react";
import { css } from "@emotion/core";
const Footer = () => {
  return (
    <footer
      className="text-center w-full p-8"
      css={css`
        font-size: .83rem;
      `}
    >
      Designed and developed by{" "}
      <a
        css={css`
          color: #ff4081;
        `}
        target="_blank"
        rel="noreferrer noopener"
        href="https://iteamnm.com"
      >
        iTeam Consulting
      </a>
      .
    </footer>
  );
};

export default Footer;
