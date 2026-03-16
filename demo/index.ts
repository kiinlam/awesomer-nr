import { lazy } from 'react';

// 定义演示组件的数据结构
interface DemoItem {
    name: string;
  code: string;
  desc: string;
}

// 演示组件列表
export const demoItems: DemoItem[] = [
  { name: "文本", code: 'Text', desc: "展示文本内容及格式的基本组件，支持嵌套、样式，以及触摸事件" },
  { name: "文本输入", code: 'TextInput', desc: "通过键盘输入文本的基础组件，可配置自动更正、自动大小写、占位文字，以及各种不同键盘类型" },
  { name: "自定义标题组件", code: 'Heading', desc: "仿 HTML 标题组件<h1> - <h6>" },
  { name: "按钮", code: 'Button', desc: "展示系统按钮及自定义按钮的用法" },
  { name: "开关", code: 'Switch', desc: "系统受控开关组件" },
  { name: "图片", code: 'Image', desc: "用于显示多种不同类型图片的组件，包括网络图片、静态资源、临时本地图片、以及本地磁盘上的图片（如相册）" },
  { name: "音频播放", code: 'Audio', desc: "一个简易的播放器，支持列表播放，可设置循环模式，控制跳转，拖拽进度，支持后台播放" },
  { name: "滚动视图", code: 'ScrollView', desc: "展示长内容的滚动视图，支持水平或垂直滚动，内容超长时容易引发性能问题" },
  { name: "虚拟长列表", code: 'FlatList', desc: "高性能的简单列表组件，支持丰富的功能，如自定义头部组件、尾部组件、项目间的分隔线、下拉刷新、上拉加载、跳转、多列布局" },
  { name: "虚拟分组列表", code: 'SectionList', desc: "高性能的分组列表组件，支持丰富的功能，如自定义头部组件、尾部组件、项目间的分隔线、分组头部组件、分组分隔线、下拉刷新、上拉加载、跳转" },
  { name: "下拉刷新", code: 'RefreshControl', desc: "指定 RefreshControl 组件，用于为滚动视图或虚拟列表提供下拉刷新功能。只能用于垂直视图，即 horizontal 不能为 true，下拉会触发一个onRefresh事件，设置 refreshing 为 true 来保持展开 RefreshControl 组件，false 则收起" },
  { name: "状态栏", code: 'StatusBar', desc: "控制应用状态栏的组件，改变状态栏的颜色或可见性" },
  { name: "对话框", code: 'Modal', desc: "覆盖在其他视图之上的视图" },
  { name: "加载指示器", code: 'ActivityIndicator', desc: "显示一个圆形的加载指示器，表示正在加载" },
  { name: "主题色", code: 'Appearance', desc: "获取、设置用户偏好的配色方案（浅色或深色）" },
  { name: "动画", code: 'Animated', desc: "在 UI 线程中执行动画效果的演示，拖拽方块后甩出，方块会先惯性运动，然后弹回原点" },
  { name: "滑动交互", code: 'Swipeable', desc: "可水平滑动，展开更多操作的组件。待办功能使用了该交互模式" },
  { name: "软键盘", code: 'Keyboard', desc: "控制键盘相关的事件，处理软键盘遮挡输入框问题" },
  { name: "抽屉布局", code: 'DrawerLayout', desc: "从屏幕边缘滑出的浮层面板" },
  { name: "原生底部标签栏", code: 'NativeBottomTab', desc: "在屏幕底部添加原生标签栏来切换页面，⚠️该 API 为实验性功能" },
  { name: "导航返回拦截", code: 'PreventRemove', desc: "阻止用户离开当前导航界面，仅在界面会被移除的情况下有效" },
];

// 演示组件
export const DemoComponents = {
  ActivityIndicator: lazy(() => import('./ActivityIndicator')),
  Animated: lazy(() => import('./Animated')),
  Appearance: lazy(() => import('./Appearance')),
  Audio: lazy(() => import('./Audio')),
  Button: lazy(() => import('./Button')),
  DrawerLayout: lazy(() => import('./DrawerLayout')),
  FlatList: lazy(() => import('./FlatList')),
  Heading: lazy(() => import('./Heading')),
  Image: lazy(() => import('./Image')),
  Keyboard: lazy(() => import('./Keyboard')),
  Modal: lazy(() => import('./Modal')),
  NativeBottomTab: lazy(() => import('./NativeBottomTab')),
  PreventRemove: lazy(() => import('./PreventRemove')),
  RefreshControl: lazy(() => import('./RefreshControl')),
  ScrollView: lazy(() => import('./ScrollView')),
  SectionList: lazy(() => import('./SectionList')),
  StatusBar: lazy(() => import('./StatusBar')),
  Swipeable: lazy(() => import('./Swipeable')),
  Switch: lazy(() => import('./Switch')),
  Text: lazy(() => import('./Text')),
  TextInput: lazy(() => import('./TextInput')),
} as const;