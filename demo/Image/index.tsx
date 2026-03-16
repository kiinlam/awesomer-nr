import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import RemoteSvg from '../../components/RemoteSvg';
import css from '../../styles/css';
import { default as Text } from '../../components/ThemeText';
import ExampleCard from '../../components/ExampleCard';

const reactTinyLogoUrl = 'https://reactnative.dev/img/tiny_logo.png';
const reactSvgLogoUrl = 'https://reactnative.dev/img/header_logo.svg';
const reactOldLogoUrl = 'https://legacy.reactjs.org/logo-og.png';
const dataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

export default function Demo() {
  const localImage = require('../../assets/react-light.png');

  return (
    <ScrollView
      style={[css.flex_1]}
      contentContainerStyle={[css.p_16, css.gap_24]}
    >
      <ExampleCard
        title="加载本地图片"
        content={
          <View style={[css.gap_16]}>
            <Text>使用 source 属性加载本地图片</Text>
            <Text>require('../../assets/react-light.png')</Text>
            <Image source={localImage} style={styles.image} />
            <Text>图片须指定宽高，未指定时按原图尺寸显示</Text>
          </View>
        }
        code={`const localImage = require('../../assets/react-light.png');

<Image
  source={localImage}
  style={{
    width: 120,
    height: 120,
}} />`}
      />

      <ExampleCard
        title="加载网络图片"
        content={
          <View style={[css.gap_16]}>
            <Text>使用 src 属性加载网络图片</Text>
            <Text>{reactTinyLogoUrl}</Text>
            <Image src={reactTinyLogoUrl} style={styles.image} />
            <Text>图片必须指定宽高，否则不会显示</Text>
          </View>
        }
        code={`const url = "https://reactnative.dev/img/tiny_logo.png";
          
<Image
    src={url}
    style={{
        width: 120,
        height: 120,
}} />`}
      />

      <ExampleCard
        title="加载 SVG 图片"
        content={
          <View style={[css.gap_16]}>
            <Text>
              安装库 react-native-svg 后使用 {`<SvgUri />`} 组件加载 SVG 图片
            </Text>
            <Text>{reactSvgLogoUrl}</Text>
            <RemoteSvg
              uri={reactSvgLogoUrl}
              width={112}
              height={102}
              style={styles.image}
            />
            <Text>图片组件宽高指定时需参考 svg 尺寸</Text>
            <Text>另一个更快的 svg 库：react-native-vector-image</Text>
          </View>
        }
        code={`const uri = "https://reactnative.dev/img/header_logo.svg"；

<SvgUri
    uri={uri}
    width={112}
    height={102}
    style={{
        width: 120,
        height: 120,
    }}
/>`}
      />

      <ExampleCard
        title="加载 dataUrl"
        content={
          <View style={[css.gap_16]}>
            <Text>使用 src 属性加载 dataUrl：</Text>
            <Text>{dataUrl}</Text>
            <Image src={dataUrl} style={[css.bg_light, styles.image]} />
            <Text>图片必须指定宽高，否则不会显示</Text>
          </View>
        }
        code={`const dataUrl = "data:image/png;base64,...";

<Image src={dataUrl} 
    style={{
        width: 120,
        height: 120,
}} />`}
      />

      <ExampleCard
        title="背景图 ImageBackground"
        content={
          <View style={[css.gap_16]}>
            <Text>背景图实际上是在底层设置了绝对定位的 Image 组件</Text>
            <Text>{reactOldLogoUrl}</Text>
            <ImageBackground
              src={reactOldLogoUrl}
              style={styles.backgroundImage}
            >
              <Text style={styles.backgroundText}>背景图</Text>
            </ImageBackground>
          </View>
        }
        code={`const url = "https://legacy.reactjs.org/logo-og.png";

<ImageBackground
    src={url}
    style={{
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    }} // 视图样式
    imageStyle={{}} // 图片样式
    imageRef={imageRef} // 设置对内部Image组件的引用
>
    <Text>内容</Text>
</ImageBackground>`}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    margin: 10,
  },
  backgroundImage: {
    width: 150,
    height: 150,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backgroundText: {
    color: 'white',
    fontSize: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    lineHeight: 50,
    textAlign: 'center',
  },
});
