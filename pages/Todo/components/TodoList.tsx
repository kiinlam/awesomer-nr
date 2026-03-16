import { memo } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import css from '../../../styles/css';
import { useFilteredTodo, useTodo } from '../../../store/useTodo';
import TodoItem from './TodoItem';
import { default as Text } from '../../../components/ThemeText';
import { Button } from '@react-navigation/elements';

// TabView 内容
function TodoList() {
  const safeAreaInsets = useSafeAreaInsets();
  const todos = useFilteredTodo(state => state.filteredList);

  return (
    <ScrollView style={[css.flex_1]} contentContainerStyle={[css.flex_1]}>
      {todos.length > 0 ? (
        todos.map(item => (
          <TodoItem key={item.id} data={item} safeAreaInsets={safeAreaInsets} />
        ))
      ) : (
        <View
          style={[css.flex_1, css.items_center, css.justify_center, css.gap_24]}
        >
          <Text style={[css.text_center]}>暂无数据</Text>
          {useTodo.getState().list.length === 0 && (
            <Button
              onPress={() => {
                useTodo.getState().addTestData();
              }}
            >
              添加测试数据
            </Button>
          )}
        </View>
      )}
    </ScrollView>
  );
}

export default memo(TodoList);
