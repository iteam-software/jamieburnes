
const path = require(`path`);
// In your gatsby-node.js file

const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node);
};

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const ProjectTemplate = path.resolve(`src/templates/ProjectsTemplate.js`);
    const categories = await graphql(`
    query categoryQuery {
        allFile(filter: {sourceInstanceName: {eq: "categories"}}) {
            nodes {
              name
              childMarkdownRemark {
                frontmatter {
                  slug
                }
              }
            }
          }
        }
  `);
    categories.data.allFile.nodes.forEach(node => {
      createPage({
        path: `/portfolio/${node.name}`,
        component: ProjectTemplate,
        context: {
          name: node.name,
          url: `/portfolio/${node.name}`
        },
      });
    });
  };