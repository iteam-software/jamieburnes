import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Img from "gatsby-image";
const Header = styled.div`
  text-transform: uppercase;
  text-align: center;
  color: var(--font-color);
  font-weight: 700;
  font-size: ${props => (props.lg ? "2.125rem" : "1.25rem")};
  padding-top: ${props => (props.lg ? "60px" : "0px")};
`;

const Section = styled.section`
  padding: ${props => (props.padding ? props.padding : "2.5rem 25px")};
  font-size: 0.875rem;
`;
export default () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      allFile(
        filter: { sourceInstanceName: { eq: "bio" } }
        sort: {
          fields: childMarkdownRemark___frontmatter___articles___date_published
        }
      ) {
        nodes {
          name
          childMarkdownRemark {
            id
            frontmatter {
              artist_name
              artist_origin
              artist_profile_pic {
                alt_text
                photo_cred
                profile_pic {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              awards {
                award
                city_received
                state_received
                year_awarded
              }
              articles {
                article_hyperlink
                article_title
                date_published
              }
              title
              galleries
              bibliography
              selected_shows {
                show_name
                gallery_name
                show_city
                show_state
                show_year
              }
              selected_collections_installations {
                collection_name
                gallery_name
                city
                state
                year_installed
              }
            }
          }
        }
      }
    }
  `);
  const {
    artist_name,
    artist_origin,
    artist_profile_pic,
    awards,
    articles,
    galleries,
    bibliography,
    selected_shows,
    selected_collections_installations,
  } = data.allFile.nodes[0].childMarkdownRemark.frontmatter;
  const { profile_pic, alt_text, photo_cred } = artist_profile_pic;
  const { fluid } = profile_pic.childImageSharp;
  return (
    <div
      className="container mx-auto mt-5"
      css={css`
        top: 64px;
        line-height: 2.5rem;
      `}
    >
      <Header lg>{artist_name}</Header>
      <div className="text-center">Born: {artist_origin}</div>
      <div className="mx-auto lg:w-1/3 w-2/3 my-4">
        <Img className="w-full" fluid={fluid} alt={alt_text} />
        <div className="text-center">{photo_cred}</div>
      </div>
      <Section padding="0 0 1rem 0">
        <Header className="mt-16">Galleries</Header>
        {galleries &&
          galleries.map((gallery, i) => (
            <div key={i} className="text-center">
              {gallery}
            </div>
          ))}
      </Section>
      <Section>
        <Header>Awards</Header>
        {awards &&
          awards.map((el, i) => {
            const { award, state_received, city_received, year_awarded } = el;
            return (
              <div key={i} className="text-center">
                {`${award}, ${city_received} ${state_received}, ${year_awarded}`}
              </div>
            );
          })}
      </Section>
      <Section>
        <Header>Articles</Header>
        {articles &&
          articles
            .sort((a, b) => a.date_published < b.date_published)
            .map((el, i) => {
              const { article_title, article_hyperlink } = el;
              return (
                <a
                  key={i}
                  className="block text-center underline text-red-800"
                  href={article_hyperlink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article_title}
                </a>
              );
            })}
      </Section>
      <Section>
        <Header>Selected Shows</Header>
        {selected_shows &&
          selected_shows.map((el, i) => {
            const {
              show_name,
              gallery_name,
              show_city,
              show_state,
              show_year,
            } = el;
            return (
              <div key={i} className="text-center">
                <span className="italic">{show_name},</span>
                {`${
                  gallery_name ? `${gallery_name},` : ""
                } ${show_city}, ${show_state}, ${show_year}`}
              </div>
            );
          })}
      </Section>
      <Section>
        <Header>Selected Collections and Installations</Header>
        {selected_collections_installations &&
          selected_collections_installations.map((el, i) => {
            const {
              gallery_name,
              collection_name,
              city,
              state,
              year_installed,
            } = el;
            return (
              <div key={i} className="text-center">
                <span className="italic">{collection_name}</span>,{" "}
                {gallery_name} {city} {state}, {year_installed}{" "}
              </div>
            );
          })}
      </Section>
      <Section>
        <Header>Bibliography</Header>
        {bibliography &&
          bibliography.map((el, i) => (
            <div key={i} className="text-center">
              {el}
            </div>
          ))}
      </Section>
    </div>
  );
};
