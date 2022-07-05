import React from "react";
import { graphql, Link } from "gatsby";
import { css } from "@emotion/core";
import ProjectSection from "../components/ProjectSection";
import { Header } from "../css/shared";

const ProjectTemplate = ({ data, pageContext }) => {
    let projects = data?.allFile?.nodes?.map((el, i) => {
      const { id = i } = el;
      if(el?.childMarkdownRemark?.frontmatter) {
        const {
          title,
          projectImages,
          description,
        } = el.childMarkdownRemark.frontmatter;
        return (
          <ProjectSection
            key={id}
            description={description}
            title={title}
            projectImages={projectImages}
          />
        );
      }
    });

  return (
    <>
      <div className="container mx-auto mt-32">
        <div className="mx-32 mt-40">
          <Link
            to="/portfolio"
            className="uppercase fontcolor whitespace-no-wrap"
          >
            <i className="fa fa-arrow-left"></i>
            <span className="ml-4">Back </span>
            <span
              css={css`
                @media (max-width: 442px) {
                  display: none;
                }
              `}
            >
              to Portfolio
            </span>
          </Link>
          <Header lg className="mt-16">
            {pageContext.name.replace("-", " ")}
          </Header>
        </div>
        <div className="mx-auto flex flex-col justify-center">
          {projects ? projects : "Could not find any projects."}
        </div>
      </div>
    </>
  );
};

export default ProjectTemplate;

export const pageQuery = graphql`
  query projectQuery($name: String!) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "projects" }
        childMarkdownRemark: { frontmatter: { slug: { eq: $name } } }
      }
    ) {
      nodes {
        name
        childMarkdownRemark {
          frontmatter {
            slug
            title
            projectImages {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            description
          }
        }
      }
    }
  }
`;
