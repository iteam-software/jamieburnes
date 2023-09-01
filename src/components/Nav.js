import React from "react";
import classNames from "classnames";
import { Link, useStaticQuery, graphql } from "gatsby";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const MenuItem = styled.div`
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
  color: #8a3014;
  font-size: 1.25rem;
  font-weight: 300;
`;

const navLinkStyle = css`
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
`;

const activeLinkStyle = {
  borderLeft: "10px solid rgb(138, 48, 20)",
  cursor: "pointer",
  display: "block",
  left: "0",
};
export default function Nav({
  isOpen,
  setIsOpen,
  toggleSidebar,
  closeSidebar,
}) {
  const data = useStaticQuery(graphql`
    query ArticleQuery {
      allFile(
        sort: {
          order: ASC
          fields: childMarkdownRemark___frontmatter___articles___date_published
        }
        filter: { sourceInstanceName: { eq: "bio" } }
      ) {
        nodes {
          childMarkdownRemark {
            id
            frontmatter {
              articles {
                article_hyperlink
              }
            }
          }
        }
      }
      show_announcement: allFile(
        filter: { sourceInstanceName: { eq: "show_announcement" } }
      ) {
        nodes {
          childMarkdownRemark {
            frontmatter {
              pdf {
                publicURL
              }
            }
          }
        }
      }
    }
  `);

  const articles = data?.allFile?.nodes[0]?.childMarkdownRemark?.frontmatter?.articles;
  const show_announcement = data?.show_announcement?.nodes[0]?.childMarkdownRemark?.frontmatter?.pdf?.publicURL;
  let sideBarClass = classNames({
    offScreen: !isOpen,
    onScreen: isOpen,
  });

  let overLayClass = classNames({
    isOpaque: isOpen,
    isTransparent: !isOpen,
  });
  return (
    <div>
      <nav
        className="flex items-center justify-between flex-wrap shadow-lg fixed w-full top-0 z-10"
        css={css`
          height: 64px;
          background-color: #eee;
          color: #8a3014;
        `}
      >
        <div className="flex items-center flex-shrink-0">
          <span className="font-bold text-xl">
            <button
              onClick={toggleSidebar}
              className="mx-4 px-2 hover:bg-gray-300"
            >
              <i className="fa fa-bars"></i>
            </button>
          </span>
          <span>
            <button
              className="uppercase tracking-widest font-hairline hover:bg-gray-300 px-3"
              css={css`
                font-size: 1.25rem;
                transition-duration: 0.5s;
                transition-timing-function: ease-in-out;
              `}
            >
              <Link to="/">
                Jamie{" "}
                <span
                  css={css`
                    @media (max-width: 364px) {
                      display: none;
                    }
                  `}
                >
                  Burnes
                </span>
                <span className="hidden md:inline"> | Sculpture</span>
              </Link>
            </button>
          </span>
        </div>

        <div className="flex flex-row md:mr-12 uppercase">
          <div className="px-3 py-2 hover:bg-gray-300" css={navLinkStyle}>
            <i
              className="far fa-envelope md:mr-2"
              css={css`
                @media (max-width: 350px) {
                  display: none;
                }
              `}
            ></i>
            <span className="hidden md:inline">
              <a
                href="mailto:jamie@jamieburnes.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                jamie@jamieburnes.com
              </a>
            </span>
          </div>
          <div
            className="px-3 py-2 hover:bg-gray-300 rounded-lg"
            css={navLinkStyle}
          >
            <a
              href="https://www.instagram.com/jamieburnessculpture/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fab fa-instagram md:mr-2"
                css={css`
                  @media (max-width: 350px) {
                    display: none;
                  }
                `}
              ></i>
              <span className="hidden md:inline">Instagram</span>
            </a>
          </div>
        </div>
      </nav>

      <div
        className={`${sideBarClass} fixed left-0 top-0 h-full z-40`}
        css={css`
          background-color: #eee;
          width: 18rem;
        `}
      >
        <div className="py-5 bg-white border-b-2 border-red-700 w-full">
          <button
            className="ml-4 mr-10 px-2 py-1 rounded-full hover:bg-gray-300"
            css={navLinkStyle}
            onClick={toggleSidebar}
          >
            <i
              className="fa fa-arrow-left"
              css={css`
                color: var(--font-color);
              `}
            ></i>
          </button>
          <span
            css={css`
              font-size: 1.25rem;
              font-weight: 700;
              color: var(--font-color);
            `}
          >
            JAMIE BURNES
          </span>
        </div>
        <div className="flex-col flex-grow text-center uppercase">
          <hr />

          <Link to="/" activeStyle={activeLinkStyle} onClick={closeSidebar}>
            <MenuItem className="hover:bg-gray-300 py-4 cursor-pointer">
              Home
            </MenuItem>
          </Link>
          <Link to="/bio" activeStyle={activeLinkStyle} onClick={closeSidebar}>
            <MenuItem className="hover:bg-gray-300 py-4 cursor-pointer">
              Bio
            </MenuItem>
          </Link>
          <Link
            to="/portfolio"
            activeStyle={activeLinkStyle}
            onClick={closeSidebar}
          >
            <MenuItem className="hover:bg-gray-300 py-4 cursor-pointer">
              Portfolio
            </MenuItem>
          </Link>
          { show_announcement &&
          <a
            href={show_announcement}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MenuItem className="hover:bg-gray-300 py-4 cursor-pointer">
              Show Announcement
            </MenuItem>
          </a>
          }
          {articles &&
          <a href={articles.sort((a,b) => a.publish_date < b.published_date)[0].article_hyperlink || "#"} target="_blank" rel="noopener noreferrer">
            <MenuItem className="py-4">Recent Articles</MenuItem>
          </a>
          }
        </div>
      </div>
      <div
        className={`${overLayClass} fixed w-full top-0 h-full z-40`}
        onClick={closeSidebar}
      />
    </div>
  );
}
