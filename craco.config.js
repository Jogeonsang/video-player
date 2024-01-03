const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "~components": path.resolve(__dirname, "src/components/"),
      "~features": path.resolve(__dirname, "src/features/"),
      "~styles": path.resolve(__dirname, "src/styles/"),
      "~hooks": path.resolve(__dirname, "src/hooks/"),
    },
  },
};
