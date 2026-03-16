import { useRef, useState } from 'react';
import {
  Appearance,
  type ColorSchemeName,
  StyleSheet,
  useColorScheme,
} from 'react-native';

// 创建样式表函数类型
type Creator<T> = (
  theme: typeof ThemeStyle,
) => ReturnType<typeof StyleSheet.create<T | any>>;

// Light theme
const ThemeLight = {
  background: '#f3f3f3',
  backgroundHighlight: '#cfe6ee',
  cardBackground: '#d3d3d3',
  cardOutline: '#dae1e7',
  textPrimary: '#000',
  textSecondary: '#404756',
};

// Dark theme
const ThemeDark = {
  background: '#000',
  backgroundHighlight: '#193c47',
  cardBackground: '#222',
  cardOutline: '#444',
  textPrimary: '#fff',
  textSecondary: '#c0c1c4',
};

// 主题样式变量
const ThemeStyle = getThemeStyle(Appearance.getColorScheme());

// 获取主题样式变量
function getThemeStyle(colorScheme: ColorSchemeName | null | undefined) {
  const themeStyle = colorScheme === 'dark' ? ThemeDark : ThemeLight;
  return { ...themeStyle };
}

// 更新主题样式变量
function updateThemeStyle(colorScheme: ColorSchemeName) {
  const themeStyle = getThemeStyle(colorScheme);
  Object.assign(ThemeStyle, { ...themeStyle });
}

// 创建样式表
function createStyle<T>(creator: Creator<T>) {
  return StyleSheet.create(creator(ThemeStyle));
}

// 使用主题样式变量
export function useThemeStyle<T>(creator: Creator<T>) {
  const sysColorScheme = useColorScheme();
  const [appColorScheme, setAppColorScheme] = useState<ColorSchemeName | null>(null);
  const colorScheme = appColorScheme || sysColorScheme;
  const currentColorScheme = colorScheme === 'dark' ? 'dark' : 'light';
  const prevColorScheme = useRef(currentColorScheme);
  const [styles, setStyles] = useState<ReturnType<Creator<T>>>(() =>createStyle(creator));
  if (currentColorScheme !== prevColorScheme.current) {
    prevColorScheme.current = currentColorScheme;
    updateThemeStyle(currentColorScheme);
    setStyles(createStyle(creator));
  }
  return {styles, appColorScheme, setAppColorScheme};
}
