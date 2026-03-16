import { ScrollView, View } from 'react-native';
import { Heading } from '../../components/Heading';
import css from '../../styles/css';
import { useTheme } from '@react-navigation/native';
import ExampleCard from '../../components/ExampleCard';

export default function Demo() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[css.flex_1]}
      contentContainerStyle={[css.p_16, css.gap_24]}
    >
      <ExampleCard
        title="自定义标题组件"
        content={
          <View
            style={[
              css.flex_1,
              css.gap_32,
              css.justify_center,
              css.items_center,
            ]}
          >
            <Heading level={1} style={{ color: colors.text }}>
              一级标题
            </Heading>
            <Heading level={2} style={{ color: colors.text }}>
              二级标题
            </Heading>
            <Heading level={3} style={{ color: colors.text }}>
              三级标题
            </Heading>
            <Heading level={4} style={{ color: colors.text }}>
              四级标题
            </Heading>
            <Heading level={5} style={{ color: colors.text }}>
              五级标题
            </Heading>
            <Heading level={6} style={{ color: colors.text }}>
              六级标题
            </Heading>
          </View>
        }
        code={`<Heading level={1}>
    一级标题
</Heading>
<Heading level={2}>
    二级标题
</Heading>
<Heading level={3}>
    三级标题
</Heading>
<Heading level={4}>
    四级标题
</Heading>
<Heading level={5}>
    五级标题
</Heading>
<Heading level={6}>
    六级标题
</Heading>`}
      />
    </ScrollView>
  );
}
