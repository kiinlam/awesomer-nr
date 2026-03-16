import { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { default as Text } from '../../components/ThemeText';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import { TodoDataType, useTodo } from '../../store/useTodo';
import css from '../../styles/css';
import { Button } from '@react-navigation/elements';
import Ionicons from '@react-native-vector-icons/ionicons';
import { sceneRoutes } from '../Todo/components/TodoScene';

export default function TodoEditModal() {
  const navigation = useNavigation();
  const theme = useTheme();
  const current = useTodo(state => state.current);
  const [todoType, setTodoType] = useState(current?.type || 0);
  const setCurrent = useTodo(state => state.setCurrent);
  const edit = useTodo(state => state.edit);
  const [value, setValue] = useState(current?.title || '');

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      if (!current) {
        Alert.alert('非法访问', '请从待办编辑进入', [
          {
            text: '确定',
            style: 'default',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setCurrent(null);
      };
    }, [current, setCurrent, navigation]),
  );

  return (
    <ScrollView>
      {current && (
        <View style={[css.gap_16]}>
          <TextInput
            autoComplete="off"
            autoFocus={true}
            placeholder={current.title}
            value={value}
            onChangeText={setValue}
            maxLength={40}
            clearButtonMode="while-editing"
            enterKeyHint="done"
            returnKeyType="done"
            style={[
              css.h_48,
              css.m_16,
              css.p_10,
              css.font_20,
              css.border_bottom,
              { color: theme.colors.text },
            ]}
          />
          <Text style={[css.ml_16]}>修改类型</Text>
          <View style={[css.bg_minor, css.p_1, css.gap_1]}>
            {sceneRoutes.map((item, index) => (
              <TouchableHighlight
                key={item.key}
                activeOpacity={0.6}
                underlayColor={css.bg_darkgray.backgroundColor}
                onPress={() => {
                  setTodoType(index);
                }}
              >
                <View
                  style={[
                    css.h_52,
                    css.p_16,
                    css.flex_row,
                    css.justify_between,
                    css.items_center,
                    css.bg_secondary,
                  ]}
                >
                  <Text style={[css.font_16]}>{item.title}</Text>
                  {todoType === index && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={css.success.color}
                    />
                  )}
                </View>
              </TouchableHighlight>
            ))}
          </View>
          <Button
            onPress={() => {
              edit({
                ...current,
                title: value || current.title,
                type: todoType as TodoDataType,
              });
              navigation.goBack();
            }}
          >
            保存
          </Button>
        </View>
      )}
    </ScrollView>
  );
}
