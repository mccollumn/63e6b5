module.exports = {
  presets: [
    "next/babel",
    "@babel/preset-typescript",
    "@babel/preset-env",
    { targets: { node: "current" } },
  ],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-modules-commonjs"],
    },
  },
};
