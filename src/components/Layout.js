import React, { useState } from "react";
import PropTypes from "prop-types";
import SEO from "./SEO";
import { useStaticQuery, graphql } from "gatsby";
import { Global, css } from "@emotion/core";

import Nav from "./Nav";
import { startCase } from "lodash";
import Footer from "./Footer";

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  const title = data?.site?.siteMetadata?.title ?? "Jamie Burnes";
  const description = data?.site?.siteMetadata?.description ?? "Jamie Burnes is a metal sculpture artist based in Santa Fe County, New Mexico.";
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const isHome = location?.pathname == "/";
  const pageTitle = `${title} - ${startCase(location?.pathname) || "Home"}`;
  return (
    <>
        <Nav
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <SEO
          pageTitle={pageTitle}
          canonical_url={location.href}
          description={description}
        />
        {children}
        {!isHome && <Footer />}
        <Global
          styles={css`
            @import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap");
            :root {
              --font-color: #8a3014;
            }
            body {
              #SRLLightbox {
                z-index: 100;
              }
              overflow-y: ${isOpen ? "hidden" : "scroll"};
              margin: 0;
              width: 100%;
              overflow-x: hidden;
              font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial,
                sans-serif;
            }
          `}
        ></Global>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
