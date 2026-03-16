import { ScrollView, Linking, TouchableOpacity, View } from 'react-native';
import ThemeText from '../../components/ThemeText/index.tsx';
import css from '../../styles/css.ts';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const GithubButton = () => (
  <TouchableOpacity
    activeOpacity={0.6}
    style={[css.mr_16, css.rounded, css.bg_lightgray]}
    onPress={() => {
      Linking.openURL('https://github.com/kiinlam/awesomer-nr');
    }}
  >
    <Ionicons
      name="logo-github"
      size={28}
      color={css.bg_dark.backgroundColor}
    />
  </TouchableOpacity>
);

const ALink = (props: { url: string; text?: string }) => (
  <TouchableOpacity
    activeOpacity={0.6}
    onPress={() => {
      Linking.openURL(props.url);
    }}
  >
    <ThemeText style={[css.primary, css.font_16]}>
      {props.text || props.url}{' '}
      <Ionicons
        name="arrow-up-right-box-outline"
        size={14}
        color={css.bg_lightgray.backgroundColor}
      />
    </ThemeText>
  </TouchableOpacity>
);

export default function About() {
  const navigation = useNavigation();

  const headerStyle = [
    css.font_20,
    css.font_bold,
    css.mt_8,
    css.pt_8,
    css.pb_8,
    css.border_bottom,
  ];
  const header2Style = [
    css.font_16,
    css.mt_8,
    css.p_8,
    css.border_left,
    {
      borderLeftWidth: 4,
    },
  ];
  const textStyle = [css.font_16];

  useEffect(() => {
    // 设置导航右侧按钮
    navigation.setOptions({
      headerRight: GithubButton,
    });
  });
  return (
    <ScrollView style={[css.flex_1]} contentContainerStyle={[css.p_24]}>
      <View style={[css.gap_16]}>
        <ThemeText style={[css.font_24, css.text_center, css.primary]}>
          🎉 Awesome RN 🎉
        </ThemeText>
        <ThemeText style={headerStyle}>✨ 项目说明</ThemeText>
        <ThemeText style={textStyle}>
          ✎ 使用 React Native(v0.83.1) 框架开发，主要适配 iOS 平台，Android
          平台适配中...
        </ThemeText>
        <ThemeText style={textStyle}>
          ✎ 完全使用 TypeScript 编写，确保代码的类型安全与可维护性
        </ThemeText>
        <ThemeText style={textStyle}>
          ✎ 采用 React Navigation 实现完整的路由及导航功能
        </ThemeText>
        <ThemeText style={textStyle}>
          ✎ 架构设计：
        </ThemeText>
        <ThemeText style={[css.font_16, css.ml_16]}>
          • 使用 Native Stack Navigator 实现堆栈式导航
        </ThemeText>
        <ThemeText style={[css.font_16, css.ml_16]}>
          • 首页嵌套 Bottom Tabs Navigator，实现底部标签页切换
        </ThemeText>
        <ThemeText style={textStyle}>
          ✎ 支持 Deep Link 唤起应用，URL scheme 为{" "}
          <ThemeText selectable={true}>awsrn://</ThemeText>
          {" "}（路径参数暂不支持）
        </ThemeText>

        <ThemeText style={headerStyle}>🌟 功能模块</ThemeText>

        <View style={[css.gap_8]}>
          <ThemeText style={header2Style}>🏠 首页</ThemeText>
          <ThemeText style={textStyle}>
            - 演示 React Native 的核心组件与功能特性
          </ThemeText>
          <ThemeText style={textStyle}>
            - 提供交互式示例和代码片段展示
          </ThemeText>
          <ThemeText style={textStyle}>
            - 帮助开发者快速了解 React Native 的能力边界
          </ThemeText>
        </View>

        <View style={[css.gap_8]}>
          <ThemeText style={header2Style}>✅ 待办事项管理</ThemeText>
          <ThemeText style={textStyle}>
            - 🚪 抽屉导航：使用 Drawer Navigator 实现右滑展开的抽屉式导航
          </ThemeText>
          <ThemeText style={textStyle}>
            - 📑 标签切换：通过 TabView 实现四个列表页面的流畅切换
          </ThemeText>
          <ThemeText style={textStyle}>
            - 💾 状态管理：
          </ThemeText>
          <ThemeText style={[css.font_16, css.ml_16]}>
            • 使用 Zustand 进行全局状态与数据管理
          </ThemeText>
          <ThemeText style={[css.font_16, css.ml_16]}>
            • 集成 Zustand immer 中间件，简化不可变数据更新操作
          </ThemeText>
          <ThemeText style={[css.font_16, css.ml_16]}>
            • 采用 react-native-mmkv 实现高性能数据持久化存储
          </ThemeText>
          <ThemeText style={textStyle}>
            - 🎯 交互功能：
          </ThemeText>
          <ThemeText style={[css.font_16, css.ml_16]}>
            • 支持左滑展开操作按钮（编辑、删除、恢复）
          </ThemeText>
          <ThemeText style={[css.font_16, css.ml_16]}>
            • 完整的 CRUD 操作：添加、编辑、删除、恢复、清空
          </ThemeText>
          <ThemeText style={[css.font_16, css.ml_16]}>
            • 四象限分类功能（紧急度 × 重要性矩阵）
          </ThemeText>
        </View>

        <View style={[css.gap_8]}>
          <ThemeText style={header2Style}>🎵 音乐播放器</ThemeText>
          <ThemeText style={textStyle}>
            - 基于 react-native-track-player 实现专业级音频播放
          </ThemeText>
          <ThemeText style={textStyle}>
            - 支持歌单管理、后台播放等核心功能
          </ThemeText>
          <ThemeText style={textStyle}>
            - 进度条拖拽使用 react-native-gesture-handler 实现，优雅解决与导航返回手势的冲突
          </ThemeText>
        </View>

        <ThemeText style={headerStyle}>📦 技术选型</ThemeText>

        <View style={[css.gap_8]}>
          <ThemeText style={header2Style}>核心库</ThemeText>
          <ALink url="https://reactnavigation.org/" text="路由导航 - React Navigation" />
          <ALink url="https://docs.swmansion.com/react-native-gesture-handler/" text="手势处理 - Gesture Handler" />
          <ALink url="https://docs.swmansion.com/react-native-reanimated/" text="动画 - Reanimated" />
          <ALink url="https://zustand.docs.pmnd.rs/" text="状态管理 - Zustand" />
          <ALink url="https://github.com/mrousavy/react-native-mmkv" text="数据存储 - MMKV" />
          <ALink url="https://doublesymmetry.github.io/react-native-track-player/" text="音频播放 - Track Player" />
          <ALink url="https://github.com/oblador/react-native-vector-icons" text="UI 图标 - Vector Icons" />
          <ALink url="https://github.com/conorhastings/react-native-syntax-highlighter" text="代码高亮 - Syntax Highlighter" />
        </View>

        <ThemeText style={headerStyle}>☕️ 源码地址</ThemeText>
        <ThemeText style={textStyle}>
          项目开源在 GitHub：{" "}
          <ALink url="https://github.com/kiinlam/awesomer-nr" text="kiinlam/awesomer-nr" />
        </ThemeText>
        <ThemeText style={textStyle}>
          欢迎 ⭐️ Star 支持，也期待 🐛 Issue 和 💡 PR 改进！
        </ThemeText>
      </View>
    </ScrollView>
  );
}
