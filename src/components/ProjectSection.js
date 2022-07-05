import React from "react";
import { css } from "@emotion/core";
import Img from "gatsby-image";
import { Header } from "../css/shared";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
const ProjectSection = ({ projectImages, title, description }) => {


  const firstImage = css`
    width: 500px;
    @media (max-width: 1200px) {
      width: 375px;
    }
    @media (max-width: 400px) {
      width: 260px;
    }
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    &:hover,
    &:focus {
      color: grey;
      box-shadow: 0 5px 10px -2px;
    }
  `;
  const followingImages = css`
    overflow: hidden;
    position: absolute;
    top: -500px;
    left: -5000px;
    height: 0;
  `;

  const images = projectImages.map((image, i) => (
      <Img
        key={i}
        css={i == 0 ? firstImage : followingImages}
        fluid={image.childImageSharp.fluid}
        alt={title}
      />
    ));

  const options = {
    settings: {},
    caption: {
      showCaption: false,
    },
    buttons: {
      showAutoplayButton: false,
      showDownloadButton: false,
      showFullscreenButton: false,
    },
    thumbnails: {
      showThumbnails: true,
    },
    progressBar: {},
  };
  return (
    <SimpleReactLightbox>
      <SRLWrapper options={options}>
        <div
          className="flex flex-col md:flex-row my-16 mx-auto items-center justify-center w-3/5"
          css={css`
            border-bottom-color: rgba(230, 230, 230, 0.87);
            border-bottom-style: solid;
            border-bottom-width: 1px;
          `}
        >
          <div>
            {images}
            <small className="text-center my-3 block">
              Click to view {projectImages.length} images(s)
            </small>
          </div>
          <div className="flex flex-col ml-10 md:ml-64 lg:ml-8 lg:w-1/3">
            <Header left>{title}</Header>
            <p
              css={css`
                font-size: .875rem;
                min-width: 256px;
              `}
            >
              {description}
            </p>
          </div>
          <hr />
        </div>
      </SRLWrapper>
    </SimpleReactLightbox>
  );
};

export default ProjectSection;
