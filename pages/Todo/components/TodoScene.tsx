import { type Route } from 'react-native-tab-view';
import TodoList from './TodoList';
import { useTodo } from '../../../store/useTodo';

/*
Q1: Urgent & Important
Q2: Not Urgent but Important
Q3: Urgent but Not Important
Q4: Not Urgent & Not Important
*/
export const sceneRoutes: Route[] = [
  {
    key: 'Q1',
    title: '紧急 & 重要',
  },
  {
    key: 'Q2',
    title: '不紧急 & 重要',
  },
  {
    key: 'Q3',
    title: '紧急 & 不重要',
  },
  {
    key: 'Q4',
    title: '不紧急 & 不重要',
  },
];

// 每个 tab 对应的内容组件
export const renderScene = ({ route }: { route: Route }) => {
  const activeTabIndex = useTodo.getState().activeTabIndex;
  const sceneIndex = sceneRoutes.findIndex(scene => scene.key === route.key);
  return activeTabIndex === sceneIndex ? <TodoList /> : null;
};
