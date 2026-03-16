import { useTheme } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Alert, TouchableOpacity } from 'react-native';
import css from '../../../styles/css';
import { useTodo } from '../../../store/useTodo';

export default function ClearDeleted() {
  const theme = useTheme();
  const clear = useTodo(state => state.clearDeleted);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[css.mr_16]}
      onPress={() => {
        Alert.alert('⚠️ 警告', '即将清空所有已删除待办，不可恢复，确认？', [
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

export function clearDeleted() {
  return <ClearDeleted />;
}
