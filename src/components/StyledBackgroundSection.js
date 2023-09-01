import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from '@emotion/styled';

import BackgroundImage from 'gatsby-background-image'

const BackgroundSection = ({ className }) => (
  <StaticQuery
    query={graphql`
      query {
        allFile(
          filter: {
            sourceInstanceName: { eq: "assets" }
            name: { regex: "/home/" }
          }
        ) {
          nodes {
            childImageSharp {
              fluid(quality: 90, maxWidth: 1920) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    `}
    render={data => {
      if (typeof window !== `undefined`) {
        var width =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
      }

      const desktop = data.allFile.nodes.find(n => n.childImageSharp.fluid.src.includes("home.jpg"));
      const mobile = data.allFile.nodes.find(n => n.childImageSharp.fluid.src.includes("home-mobile.jpg"));

      const imageData = width > 768 ? desktop.childImageSharp.fluid : mobile.childImageSharp.fluid;
      return (
        <BackgroundImage
          Tag="section"
          className={className}
          fluid={imageData}
          backgroundColor={`#040e18`}
        />
      )
    }}
  />
)

const StyledBackgroundSection = styled(BackgroundSection)`
  width: 100%;
  height: calc(100vh - 64px);
  background-repeat: no-repeat;
  background-size: cover;
`

export default StyledBackgroundSection