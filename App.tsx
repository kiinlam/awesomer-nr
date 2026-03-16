/**
 * 主应用入口文件
 * 配置底部标签导航器和整体应用主题
 *
 * 功能说明：
 * - 使用 React Navigation 实现导航
 * - 配置深色主题和自定义样式
 * - 支持深度链接 (Deep Linking)
 * - 集成安全区域适配
 */

import { StatusBar, Text } from 'react-native';
// 安全区域上下文提供者，用于处理不同设备的安全区域适配
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// React Navigation 核心容器和默认主题
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// 导入样式配置
import css from './styles/css';
// 导入导航参数类型定义
import { type MainStackNavigatorParamList } from './types/navigation';
import { lazy } from 'react';
import { LazyComponent } from './components/LazyComponent';
import CloseModalButton from './components/CloseModalButton';

const Stack = createNativeStackNavigator<MainStackNavigatorParamList>();
const MainPage = lazy(() => import('./pages/Main'));
const DemoPage = lazy(() => import('./pages/Demo'));
const CodeModal = lazy(() => import('./pages/Modal/Code'));
const TodoEditModal = lazy(() => import('./pages/Modal/TodoEdit'));

function App() {
  return (
    <GestureHandlerRootView>
      {/* 提供安全区域上下文，确保内容不会被状态栏、刘海屏等遮挡 */}
      <SafeAreaProvider>
        {/* 设置状态栏样式为浅色内容，适配深色背景 */}
        <StatusBar barStyle="light-content" />
        {/* React Navigation 容器，包裹整个导航结构 */}
        <NavigationContainer
          // 配置深度链接支持，允许通过 awsrn:// 协议打开应用
          linking={{ prefixes: ['awsrn://'] }}
          // 导航加载时显示的后备组件
          fallback={<Text>Loading...</Text>}
          // 自定义导航主题配置
          theme={{
            dark: true, // 启用深色模式
            colors: {
              // 主色调 - 使用白色
              primary: css.light.color,
              // 背景色 - 深灰色主背景
              background: css.bg_primary.backgroundColor,
              // 卡片背景色 - 稍浅的灰色
              card: css.bg_secondary.backgroundColor,
              // 边框颜色 - 透明
              border: 'transparent',
              // 文字颜色 - 浅灰色
              text: css.lightgray.color,
              // 通知颜色 - 番茄红
              notification: css.tomato.color,
            },
            // 使用默认字体配置
            fonts: DefaultTheme.fonts,
          }}
        >
          <Stack.Navigator
            screenLayout={LazyComponent}
            // initialRouteName="Home"
            screenOptions={{
              // headerStyle: [css.bg_secondary],
              // headerTintColor: 'white',
              // headerTitleStyle: {
              //   fontSize: 20,
              // },
              // animation: 'slide_from_right',
              headerBackButtonDisplayMode: 'minimal',
              // contentStyle: [css.bg_primary],
            }}
          >
            <Stack.Screen
              name="Home"
              component={MainPage}
              options={{
                title: '首页',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Demo"
              component={DemoPage}
              options={{
                title: '演示',
              }}
            />
            <Stack.Screen
              name="CodeModal"
              component={CodeModal}
              options={{
                title: '代码示例',
                presentation: 'modal',
                headerRight: CloseModalButton
              }}
            />
            <Stack.Screen
              name="TodoEditModal"
              component={TodoEditModal}
              options={{
                title: '编辑待办',
                presentation: 'modal',
                headerRight: CloseModalButton,
                gestureEnabled: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
