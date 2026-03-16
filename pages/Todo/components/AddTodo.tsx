import { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Alert, TouchableOpacity } from 'react-native';
import css from '../../../styles/css';
import AddTodoModal from './AddTodoModal';
import { useTodo } from '../../../store/useTodo';

export default function AddTodo() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[css.mr_16]}
        onPress={() => {
          if (useTodo.getState().list.length >= 100) {
            Alert.alert('待办数量已达上限，请先清理后再试');
          } else {
            setOpen(true);
          }
        }}
      >
        <Ionicons name="create-outline" size={22} color={theme.colors.text} />
      </TouchableOpacity>
      {open && <AddTodoModal open={open} close={() => setOpen(false)} />}
    </>
  );
}

export function addTodo() {
  return <AddTodo />;
}
