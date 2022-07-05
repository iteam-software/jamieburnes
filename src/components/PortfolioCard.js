import React from "react";
import { css } from "@emotion/core";
import { Link } from "gatsby"
import Img from "gatsby-image";
const PortfolioCard = ({ category_name, src, slug }) => {
  return (
    <Link to={`/portfolio/${slug}`}>
      <div className="h-56 w-56"
      css={css`
      cursor: pointer;
      transition: all ease-in-out .3s;
      &:hover,&:focus {
        transform: scale(1.05);
        color: grey;
        box-shadow: 0 3px 5px -1px;
      }
      `}
      >
        <Img className="w-full" fluid={src} alt={slug} />
      </div>
      <h5
        className="text-center text-lg uppercase mb-3"
        css={css`
          flex-basis: 100%;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--font-color);
        `}
      >
        {category_name}
      </h5>
    </Link>
  );
};

export default PortfolioCard;
