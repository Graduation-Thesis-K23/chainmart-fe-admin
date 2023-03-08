import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import WebpackBar from "webpackbar";

module.exports = {
  webpack: {
    plugins: [
      new WebpackBar({ profile: true }),
      ...(process.env.NODE_ENV === "development"
        ? [
            new BundleAnalyzerPlugin({
              openAnalyzer: false,
              analyzerPort: 3333,
            }),
          ]
        : []),
    ],
  },
};
