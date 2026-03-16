const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
//   transformer: {
//     async getTransformOptions() {
//       return {
//         transform: {
//           // 禁用内联 require
//           inlineRequires: false,
//           inlineRequires: {
//             blockList: {
//               // 在 `DoNotInlineHere.js` 中的 require() 调用将不会被内联。
//               [require.resolve('./src/DoNotInlineHere.js')]: true,

//               // 其他地方的 require() 调用将被内联，除非它们
//               // 与 nonInlinedRequires 中的任何条目匹配（见下文）。
//             },
//           },
//           nonInlinedRequires: [
//             // 在任何地方的 require('react') 调用都不会被内联
//             'react',
//           ],
//         },
//       };
//     },
//   },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
