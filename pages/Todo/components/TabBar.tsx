import { TabBar, type TabViewProps, type Route } from 'react-native-tab-view';
import css from '../../../styles/css';

// Tab 切换栏
const TabBarView: TabViewProps<Route>['renderTabBar'] = props => {
  return (
    <TabBar
      {...props}
      // renderTabBarItem
      // renderIndicator
      // onTabPress
      // onTabLongPress
      // activeColor="firebrick"
      // inactiveColor="#fdf0d5"
      scrollEnabled={true}
      style={[css.bg_minor]} // tab 切换栏的样式
      indicatorStyle={[css.bg_gray]} // 激活 tab 的下边线样式
      // indicatorContainerStyle={{ backgroundColor: 'lightyellow'  }}
      tabStyle={[css.w_auto]} // 每个 tab 项的样式
      // contentContainerStyle={{ backgroundColor: 'lightyellow' }}
    />
  );
};

export default TabBarView;
