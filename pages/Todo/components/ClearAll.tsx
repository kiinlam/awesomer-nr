import { useTheme } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Alert, TouchableOpacity } from 'react-native';
import { useTodo } from '../../../store/useTodo';

export default function ClearAll() {
  const theme = useTheme();
  const clear = useTodo(state => state.clearAll);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        Alert.alert('⚠️ 警告', '即将清空所有待办事项，不可恢复，确认？', [
          {
            text: '取消',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: '确认',
            style: 'destructive',
            onPress: clear,
          },
        ]);
      }}
    >
      <Ionicons name="trash-outline" size={20} color={theme.colors.text} />
    </TouchableOpacity>
  );
}

