import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  TodoCompletedScreenProps,
  TodoPendingScreenProps,
  TodoScreenProps,
  TodoTrashScreenProps,
} from '../../types/navigation';
import { TabView } from 'react-native-tab-view';
import { default as Text } from '../../components/ThemeText';
import { addTodo } from './components/AddTodo';
import { clearDeleted } from './components/ClearDeleted';
import TabViewLabel from './components/TabViewLabel';
import TabBarView from './components/TabBar';
import { sceneRoutes, renderScene } from './components/TodoScene';
import { TodoDataType, useTodo } from '../../store/useTodo';
import { useFocusEffect } from '@react-navigation/native';

// Todo 视图组件
type ContentProps =
  | TodoScreenProps
  | TodoPendingScreenProps
  | TodoCompletedScreenProps
  | TodoTrashScreenProps;

export default function Content({ navigation, route }: ContentProps) {
  const drawerName = route.name;
  const dimensions = useWindowDimensions();
  const filterType = useTodo(state => state.type);
  const activeTabIndex = useTodo(state => state.activeTabIndex);
  const setFilterType = useTodo(state => state.setFilterType);
  const setTabIndex = useTodo(state => state.setTabIndex);

  useFocusEffect(() => {
    // 设置 Todo 列表过滤类型
    setFilterType(drawerName);
  });

  useEffect(() => {
    // 设置导航右侧按钮
    navigation.setOptions({
      headerRight:
        drawerName === 'Completed'
          ? undefined
          : drawerName === 'Trash'
          ? clearDeleted
          : addTodo,
    });
  }, [navigation, drawerName]);

  return filterType === drawerName ? (
    <TabView
      initialLayout={{ width: dimensions.width }}
      navigationState={{ index: activeTabIndex, routes: sceneRoutes }}
      onIndexChange={i => {
        setTabIndex(i as TodoDataType);
      }}
      tabBarPosition="top"
      lazy
      renderLazyPlaceholder={() => <Text>loading</Text>}
      renderTabBar={TabBarView}
      renderScene={renderScene}
      // style={[]} // 整个界面的外层样式
      // pagerStyle={[]} // 包裹 tab 切换栏和内容层的 视图样式
      commonOptions={{
        // sceneStyle: [], // 内容层的样式
        // labelStyle: [],
        label: TabViewLabel,
      }}
    />
  ) : null;
}
