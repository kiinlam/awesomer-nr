import { type TabNavigatiorParamList } from '../../types/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// 导入底部标签栏图标组件
import {
  AboutTabBarIcon, // 关于页面图标
  HomeTabBarIcon, // 首页图标
  TodoTabBarIcon, // 计划页面图标
} from '../../components/Icons';
// 导入各个页面组件
import IndexPage from './Tabs/Index'; // 首页
import TodoPage from './Tabs/Todo'; // 待办页面 - 待办事项管理
import AboutPage from './Tabs/About'; // 关于页面 - 应用信息展示

// 创建带类型安全的底部标签导航器实例
// TabNavigatiorParamList 定义了所有可用的路由和参数类型
const Tab = createBottomTabNavigator<TabNavigatiorParamList>();
// const initialRouteName = __DEV__ ? 'TodoTab' : 'DefaultTab';

function Page() {
  return (
    <Tab.Navigator
      // 可选：设置初始路由名称，默认为第一个屏幕
      // initialRouteName={initialRouteName}
      screenOptions={{
        // 隐藏所有页面的头部标题栏
        // headerShown: false,
        // 关闭页面切换动画，避免切换 tab 时出现渲染问题导致页面空白
        animation: 'none',
        // 以下为可选的标签栏样式配置（已注释）：
        // tabBarLabelStyle: [],           // 标签文字样式
        // sceneStyle: [css.bg_primary],   // 页面场景样式
        // tabBarStyle: [css.bg_dark, css.border_0],  // 标签栏整体样式
        // tabBarBackground: TabBarBg,
        // tabBarActiveTintColor: css.light.color,        // 激活标签文字颜色
        // tabBarInactiveTintColor: css.dark.color,       // 非激活标签文字颜色
        // tabBarActiveBackgroundColor: css.dark.color,   // 激活标签背景色
        // tabBarInactiveBackgroundColor: css.light.color, // 非激活标签背景色
        // tabBarItemStyle: {},            // 标签项样式
      }}
    >
      {/* 首页Tab屏幕 */}
      <Tab.Screen
        name="DefaultTab" // 路由名称，必须与 TabNavigatiorParamList 中定义的一致
        component={IndexPage} // 对应的页面组件
        options={{
          title: '首页', // 标签显示的文字
          tabBarIcon: HomeTabBarIcon, // 标签图标组件
          headerShown: false,
        }}
      />
      {/* 待办Tab屏幕 */}
      <Tab.Screen
        name="TodoTab" // 路由名称
        component={TodoPage} // 待办事项页面组件
        options={{
          title: '待办', // 标签显示的文字
          tabBarIcon: TodoTabBarIcon, // 图标组件
          headerShown: false,
        }}
      />
      {/* 关于Tab屏幕 */}
      <Tab.Screen
        name="AboutTab" // 路由名称
        component={AboutPage} // 关于页面组件
        options={{
          title: '关于', // 标签显示的文字
          tabBarIcon: AboutTabBarIcon, // 关于图标组件
        }}
      />
    </Tab.Navigator>
  );
}

export default Page;
