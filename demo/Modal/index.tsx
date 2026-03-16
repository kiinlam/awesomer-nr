import { useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, View } from 'react-native';
import css from '../../styles/css';
import { default as Text } from '../../components/ThemeText';
import ExampleCard from '../../components/ExampleCard';

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [animationType, setAnimationType] = useState<'slide' | 'fade' | 'none'>(
    'slide',
  );
  const [transparent, setTransparent] = useState(true);
  const [statusBarTranslucent, setStatusbarTranslucent] = useState(true);
  const [presentationStyle, setPresentationStyle] = useState<
    'fullScreen' | 'overFullScreen' | 'pageSheet' | 'formSheet'
  >('overFullScreen');

  return (
    <ScrollView
      style={[css.flex_1]}
      contentContainerStyle={[
        css.flex_1,
        css.p_16,
        css.gap_24,
        css.justify_between,
        css.items_center,
      ]}
    >
      <Text style={[css.font_24]}>Header</Text>
      <View style={[css.w_full]}>
        <ExampleCard
          title="Modal 对话框"
          content={<Button title="显示 Modal" onPress={() => setOpen(true)} />}
          code={`<Modal
    visible={open}
    animationType={animationType}   // 动画类型，可选值有 'slide', 'fade', 'none'
    transparent={transparent}   // 背景是否透明，默认白色
    supportedOrientations={[
        'portrait',
        'portrait-upside-down',
        'landscape',
        'landscape-left',
        'landscape-right',
    ]}
    statusBarTranslucent={statusBarTranslucent}   // Android 状态栏是否透明，默认 false
    hardwareAccelerated={hardwareAccelerated}   // Android 是否使用硬件加速，默认 false
    presentationStyle={presentationStyle}   // iOS 显示样式，可选值有 'fullScreen', 'overFullScreen', 'pageSheet', 'formSheet', 大屏幕的设备生效
    onOrientationChange={orientation => console.log('Modal 方向改变', orientation);}
    onShow={() => console.log('Modal 已显示');}
    onDismiss={() => console.log('Modal 已关闭');}
    onRequestClose={() => setOpen(false)}   // 当用户尝试关闭 Modal 时调用
>
    <View>
        <Text>Modal 内容</Text>
    </View>
</Modal>`}
        />
      </View>
      <Text style={[css.font_24]}>Footer</Text>
      <Modal
        visible={open}
        animationType={animationType} // 动画类型，可选值有 'slide', 'fade', 'none'
        transparent={transparent} // 背景是否透明，默认白色
        supportedOrientations={[
          'portrait',
          'portrait-upside-down',
          'landscape',
          'landscape-left',
          'landscape-right',
        ]}
        statusBarTranslucent={statusBarTranslucent} // Android 状态栏是否透明，默认 false
        hardwareAccelerated={true} // Android 是否使用硬件加速，默认 false
        presentationStyle={presentationStyle} // iOS 显示样式，可选值有 'fullScreen', 'overFullScreen', 'pageSheet', 'formSheet', 大屏幕的设备生效
        onOrientationChange={orientation => {
          console.log('Modal 方向改变', orientation);
        }}
        onShow={() => {
          console.log('Modal 已显示');
        }}
        onDismiss={() => {
          console.log('Modal 已关闭');
        }}
        onRequestClose={() => setOpen(false)} // 当用户尝试关闭 Modal 时调用
      >
        <View style={styles.modal}>
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>Modal 配置</Text>
            <View style={styles.modalRow}>
              <Text style={styles.text}>visible: {`${open}`}</Text>
              <Button title="关闭" onPress={() => setOpen(false)} />
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.text}>animationType: {animationType}</Text>
              <Button
                title="切换"
                onPress={() => {
                  const list = ['slide', 'fade', 'none'] as const;
                  const next =
                    list[(list.indexOf(animationType) + 1) % list.length];
                  setAnimationType(next);
                }}
              />
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.text}>
                transparent: {transparent ? 'true' : 'false'}
              </Text>
              <Button
                title="切换"
                onPress={() => setTransparent(prev => !prev)}
              />
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.text}>
                [Android] statusBarTranslucent:{' '}
                {statusBarTranslucent ? 'true' : 'false'}
              </Text>
              <Button
                title="切换"
                onPress={() => setStatusbarTranslucent(prev => !prev)}
              />
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.text}>
                [大屏] presentationStyle: {presentationStyle}
              </Text>
              <Button
                title="切换"
                onPress={() => {
                  setPresentationStyle(prev => {
                    const list = [
                      'fullScreen',
                      'overFullScreen',
                      'pageSheet',
                      'formSheet',
                    ] as const;
                    const next = list[(list.indexOf(prev) + 1) % list.length];
                    return next;
                  });
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalBody: {
    width: '90%',
    gap: 24,
    borderColor: '#00bbf9',
    borderWidth: 2,
    backgroundColor: '#cccccc',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#00bbf9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 5, // Android 阴影
  },
  modalTitle: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});
