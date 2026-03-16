import { useState } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { default as Text } from '../../../components/ThemeText';
import { useTodo } from '../../../store/useTodo';

type Props = {
  open: boolean;
  close: () => void;
};

export default function AddTodoModal({ open, close }: Props) {
  const activeTabIndex = useTodo(state => state.activeTabIndex);
  const addTodo = useTodo(state => state.add);
  const [value, setValue] = useState('');

  const handleSubmit = (val: string) => {
    if (val) {
      addTodo({
        title: val,
        id: Date.now(),
        done: false,
        deleted: false,
        type: activeTabIndex,
      });
    }
    close();
  };

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      supportedOrientations={[
        'portrait',
        'portrait-upside-down',
        'landscape',
        'landscape-left',
        'landscape-right',
      ]}
      onRequestClose={close} // 当用户尝试关闭 Modal 时调用
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS 用 padding, Android 用 height
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>添加待办事项</Text>
            <Ionicons name="close" size={22} color="black" onPress={close} />
          </View>
          <TextInput
            value={value}
            onChangeText={setValue}
            style={styles.input}
            autoComplete="off"
            autoFocus={true}
            enterKeyHint="done"
            maxLength={40}
            placeholder="请输入"
            placeholderTextColor="#999"
            onSubmitEditing={() => handleSubmit(value)}
          />
          <Button title="添加" onPress={() => handleSubmit(value)} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: '90%',
    gap: 16,
    backgroundColor: '#d3d3d3',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Android 阴影
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    color: '#545454',
    textAlign: 'center',
  },
  input: {
    padding: 6,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#898989',
  },
});
