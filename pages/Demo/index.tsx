import { StyleSheet, View } from 'react-native';
import { DemoScreenProps } from '../../types/navigation';
import ThemeText from '../../components/ThemeText';
import { DemoComponents } from '../../demo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 定义可用的组件名称类型
type ComponentName = keyof typeof DemoComponents;
// 类型守卫：确保name是有效的组件名称
const isValidComponent = (name: string): name is ComponentName => {
  return name in DemoComponents;
};

const DefaultComponent = () => <ThemeText>No component selected</ThemeText>;

export default function Content({ route }: DemoScreenProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const { name } = route.params;

  let Component: React.ComponentType = DefaultComponent;
  if (name && isValidComponent(name)) {
    Component = DemoComponents[name];
  }

  return (
    <View
      style={{
        ...styles.container,
        // paddingBottom: safeAreaInsets.bottom,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
      }}
    >
      <Component />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
