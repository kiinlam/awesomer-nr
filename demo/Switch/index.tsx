import { useState } from 'react';
import { ScrollView, Switch, View } from 'react-native';
import css from '../../styles/css';
import { default as Text } from '../../components/ThemeText';
import ExampleCard from '../../components/ExampleCard';
import { Button } from '@react-navigation/elements';

export default function Demo() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ScrollView style={[css.flex_1]} contentContainerStyle={[css.p_16, css.gap_24]}>
      <ExampleCard
        title="开关 Switch"
        content={
          <View style={[css.gap_16, css.items_start]}>
            <Text>系统默认开关</Text>
            <Switch
              disabled={isDisabled}
              value={isOpen}
              onValueChange={setIsOpen}
            />
            <View style={[css.bg_minor, css.rounded_8]}>
              <Button
                variant="plain"
                onPress={() => setIsDisabled(!isDisabled)}
              >
                {isDisabled ? '启用' : '禁用'}
              </Button>
            </View>
          </View>
        }
        code={`const [isDisabled, setIsDisabled] = useState(false);
const [isOpen, setIsOpen] = useState(false);

<Switch
    disabled={isDisabled}
    value={isOpen}
    onValueChange={setIsOpen}
/>`}
      />

      <ExampleCard
        title="自定义开关配色"
        content={
          <View style={[css.gap_16, css.items_start]}>
            <Text>- <Text style={[css.font_bold]}>ios_backgroundColor</Text>: 底色，在开关值为false时或被禁用可以透出</Text>
            <Text>- <Text style={[css.font_bold]}>thumbColor</Text>: 圆形按钮的背景颜色</Text>
            <Text>- <Text style={[css.font_bold]}>trackColor</Text>: 关闭状态时的边框颜色(iOS)或背景颜色(Android)</Text>
            <Switch
              ios_backgroundColor="gold"
              thumbColor={isOpen ? 'yellow' : 'darkgreen'}
              trackColor={{ false: 'lightgray', true: 'tomato' }}
              disabled={isDisabled}
              value={isOpen}
              onValueChange={setIsOpen}
            />
          </View>
        }
        code={`const [isDisabled, setIsDisabled] = useState(false);
const [isOpen, setIsOpen] = useState(false);

<Switch
    ios_backgroundColor="gold"
    thumbColor={isOpen ? 'yellow' : 'darkgreen'}
    trackColor={{ false: 'lightgray', true: 'tomato' }}
    disabled={isDisabled}
    value={isOpen}
    onValueChange={setIsOpen}
/>`}
      />
    </ScrollView>
  );
}
