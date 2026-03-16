import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { DefaultTabPageScreenProps } from '../../../types/navigation';
import { Button } from '@react-navigation/elements';
import css from '../../../styles/css';
import ThemeText from '../../../components/ThemeText';
import { demoItems } from '../../../demo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ExampleCard from '../../../components/ExampleCard';

export default function Content({ navigation }: DefaultTabPageScreenProps) {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[
        css.flex_1,
        {
          marginTop: safeAreaInsets.top,
          marginLeft: safeAreaInsets.left,
          marginRight: safeAreaInsets.right,
        },
      ]}
      contentContainerStyle={[css.gap_24, css.p_24]}
    >
      <View style={[css.mb_24, css.items_center]}>
        <Image
          source={require('../../../assets/logo_512.png')}
          width={512}
          height={512}
          style={[css.mb_16, css.w_128, css.h_128]}
        />
        <ThemeText
          style={[css.font_24, css.mb_16, css.primary, styles.shadow]}
        >
          Awesome React Native
        </ThemeText>
        <ThemeText
          onPress={() => {
            navigation.navigate('CodeModal');
          }}
        >
          演示 React Native 的各种组件与功能
        </ThemeText>
      </View>
      {demoItems.map(item => (
        <ExampleCard
          key={item.code}
          title={`${item.name} ${item.code}`}
          content={
            <View style={[css.gap_16]}>
              <ThemeText>{item.desc}</ThemeText>
              <View style={[css.flex, css.flex_row]}>
                <Button
                  onPress={() => {
                    navigation.navigate('Demo', { name: item.code });
                  }}
                >
                  {item.code}
                </Button>
              </View>
            </View>
          }
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#06d6a0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5, // Android 阴影
  },
});
