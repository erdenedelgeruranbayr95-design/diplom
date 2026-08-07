module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // Reanimated 4-т babel plugin нь `react-native-worklets`-д нүүсэн
    // (өмнөх `react-native-reanimated/plugin` биш). ЖАГСААЛТЫН ХАМГИЙН СҮҮЛД байх ёстой.
    plugins: ["react-native-worklets/plugin"],
  };
};
