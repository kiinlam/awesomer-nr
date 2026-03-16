import { Alert, ScrollView, View } from 'react-native';
import { default as Text } from '../../components/ThemeText';
import { useNavigation, usePreventRemove } from '@react-navigation/native';
import css from '../../styles/css';
import ExampleCard from '../../components/ExampleCard';

export default function Demo() {
  const navigation = useNavigation();

  usePreventRemove(true, ({ data }) => {
    Alert.alert('确定离开?', '不多坐一会?', [
      { text: '不走了', style: 'cancel', onPress: () => {} },
      {
        text: '必须走',
        style: 'destructive',
        onPress: () => navigation.dispatch(data.action),
      },
    ]);
  });

  return (
    <ScrollView
      style={[css.flex_1]}
      contentContainerStyle={[css.p_16]}
    >
      <ExampleCard
        title="阻止导航返回 Prevent Remove"
        content={
          <View>
            <Text>
              试试点击返回按钮，或使用手势返回，将触发 usePreventRemove 回调
            </Text>
            <Text>iOS 手势右滑返回动画为原生级别，拦截时会出现界面回弹，解决方案是在特定场景下禁用手势返回操作，只能点击按钮返回，达到较好的体验</Text>
          </View>
        }
        code={`import {
    useNavigation,
    usePreventRemove,
} from '@react-navigation/native';
import { Alert } from 'react-native';

export default function Demo() {
    const navigation = useNavigation();

    usePreventRemove(true, ({ data }) => {
        Alert.alert('确定离开?', '不多坐一会?', [
            { text: '不走了', style: 'cancel', onPress: () => {} },
            {
                text: '必须走',
                style: 'destructive',
                onPress: () => navigation.dispatch(data.action),
            },
        ]);
    });
    
    return < />
}`}
      />
    </ScrollView>
  );
}
