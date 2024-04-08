const esmRequire = require("./esmRequire");

const remarkDirective = esmRequire("remark-directive");
const { visit } = esmRequire("unist-util-visit");
const { h } = esmRequire("hastscript");

module.exports.setParserPlugins = () => [remarkDirective];
module.exports.default = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, (node) => {
    if (
      node.type === "textDirective" ||
      node.type === "leafDirective" ||
      node.type === "containerDirective"
    ) {
      const data = node.data || (node.data = {});
      const hast = h(node.name, node.attributes);

      data.hName = hast.tagName;
      data.hProperties = hast.properties;
    }
  });
};
