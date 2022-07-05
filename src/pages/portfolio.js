import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { css } from "@emotion/core";
import PortfolioCard from "../components/PortfolioCard";
import { Header } from "../css/shared";
export default () => {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { sourceInstanceName: { eq: "categories" } }) {
        nodes {
          childMarkdownRemark {
            frontmatter {
              category_img {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              slug
            }
          }
        }
      }
    }
  `);
  const { nodes } = data.allFile;
  const cards = nodes.map(node => {
    const { category_img, slug } = node.childMarkdownRemark.frontmatter;
    const {fluid} = category_img.childImageSharp;
    return (
      <PortfolioCard
        key={node.id}
        src={fluid}
        slug={slug}
        category_name={slug.replace('-', ' ')}
      />
    );
});
  return (
    <div className="container mt-16 mx-auto lg:w-1/2 flex justify-around flex-row flex-wrap">
      <Header lg className="m-4">
        Portfolio
      </Header>
      <p
        className="text-center m-4"
        css={css`
          flex-basis: 100%;
          font-size: .875rem;
        `}
      >
        Click on a category to view the works.
      </p>
{cards}
    </div>
  );
};
