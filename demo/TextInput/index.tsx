import { useState } from 'react';
import {
  Button,
  type InputModeOptions,
  Modal,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { default as Text } from '../../components/ThemeText';
import ExampleCard from '../../components/ExampleCard';
import css from '../../styles/css';

export default function Demo() {
  const [eventList, setEventList] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [inputType, setInputType] = useState<InputModeOptions>('decimal');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS 用 padding, Android 用 height
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0} // iOS 关键：根据是否有导航栏调整
      style={[css.flex_1]}
    >
      <ScrollView
        style={[css.flex_1]}
        contentContainerStyle={[css.p_16, css.gap_24]}
      >
        <ExampleCard
          title="默认输入框"
          content={
            <TextInput
              style={styles.textinput}
              autoCapitalize="none" // 自动大小写 enum('none', 'sentences', 'words', 'characters')
              autoComplete="off"
              autoCorrect={false}
              autoFocus={false}
              caretHidden={false}
              clearButtonMode="while-editing"
              clearTextOnFocus={true} // 是否在获取焦点时清空文本
              contextMenuHidden={false}
              defaultValue="默认文本"
              editable={true}
              enablesReturnKeyAutomatically={true} // 自动禁用回车键
              enterKeyHint="done" // enum('enter', 'done', 'next', 'previous', 'search', 'send', 'go')
              placeholder="请输入"
              placeholderTextColor="#999"
              readOnly={false}
              returnKeyType="done" // enum('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo')
              selectionColor="red"
              selectionHandleColor="green"
              selectTextOnFocus={false}
              showSoftInputOnFocus={true}
              textAlign="left"
            />
          }
          code={`<TextInput
    autoCapitalize="none" // 自动大小写 enum('none', 'sentences', 'words', 'characters')
    autoComplete="off" // 自动填充，如用户名、地址、密码、短信验证码等
    autoCorrect={false} // 关闭自动修正
    autoFocus={false} // 是否自动获取焦点
    caretHidden={false} // 是否隐藏光标
    clearButtonMode="while-editing" // 显示“清除”按钮(iOS)
    clearTextOnFocus={true} // 是否在获取焦点时清空文本(iOS)
    contextMenuHidden={false} // 是否隐藏上下文菜单
    defaultValue="默认文本" // 初始值
    editable={true} // 是否可编辑
    enablesReturnKeyAutomatically={true} // 未输入时自动禁用回车键
    enterKeyHint="done" // 决定“回车”键上显示的文字, enum('enter', 'done', 'next', 'previous', 'search', 'send', 'go')
    placeholder="请输入"
    placeholderTextColor="#999" // 占位文本的颜色
    readOnly={false} // 只读模式
    returnKeyType="done" // 回车键类型 enum('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo')
    selectionColor="red" // 高亮色
    selectionHandleColor="green" // 选择句柄颜色(Android)
    selectTextOnFocus={false} // 自动选择文本内容
    showSoftInputOnFocus={true} // 是否在获得焦点时显示软键盘
    textAlign="left" // 文本对齐方式 enum('left', 'center', 'right')
/>`}
        />

        <ExampleCard
          title="自定义键盘类型"
          content={
            <View style={[css.flex_row, css.justify_between, css.items_center]}>
              <TextInput
                style={[css.flex_1, styles.textinput]}
                autoCapitalize="none" // enum('none', 'sentences', 'words', 'characters')
                autoComplete="off"
                autoCorrect={false}
                placeholder="点击右侧按钮选择键盘类型"
                placeholderTextColor="#999"
                inputMode={inputType} // enum('decimal', 'email', 'none', 'numeric', 'search', 'tel', 'text', 'url')
              />
              <Button title={inputType} onPress={() => setOpen(true)} />
              <Modal
                visible={open}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setOpen(false)}
              >
                <View
                  style={[
                    css.flex_1,
                    css.justify_center,
                    css.items_center,
                    styles.modal,
                  ]}
                >
                  <View style={[css.gap_16, styles.modalBody]}>
                    <Button
                      title="decimal"
                      onPress={() => {
                        setInputType('decimal');
                        setOpen(false);
                      }}
                    />
                    <Button
                      title="numeric"
                      onPress={() => {
                        setInputType('numeric');
                        setOpen(false);
                      }}
                    />
                    <Button
                      title="email"
                      onPress={() => {
                        setInputType('email');
                        setOpen(false);
                      }}
                    />
                    <Button
                      title="search"
                      onPress={() => {
                        setInputType('search');
                        setOpen(false);
                      }}
                    />
                    <Button
                      title="tel"
                      onPress={() => {
                        setInputType('tel');
                        setOpen(false);
                      }}
                    />
                    <Button
                      title="text"
                      onPress={() => {
                        setInputType('text');
                        setOpen(false);
                      }}
                    />
                    <Button
                      title="url"
                      onPress={() => {
                        setInputType('url');
                        setOpen(false);
                      }}
                    />
                    <Button
                      title="none"
                      onPress={() => {
                        setInputType('none');
                        setOpen(false);
                      }}
                    />
                    <Button
                      title="取消"
                      color="red"
                      onPress={() => {
                        setOpen(false);
                      }}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          }
          code={`<TextInput
    autoCapitalize="none" // enum('none', 'sentences', 'words', 'characters')
    autoComplete="off"
    autoCorrect={false}
    placeholder="点击右侧按钮选择键盘类型"
    inputMode={inputType} // enum('decimal', 'email', 'none', 'numeric', 'search', 'tel', 'text', 'url')
/>`}
        />

        <ExampleCard
          title="禁止编辑输入框"
          content={
            <TextInput
              style={styles.textinput}
              editable={false}
              readOnly={true}
              defaultValue="禁止编辑"
            />
          }
          code={`<TextInput
    editable={false}
    readOnly={true} // 与 editable = false 等效
    defaultValue="禁止编辑"
/>`}
        />

        <ExampleCard
          title="密码输入框"
          content={
            <TextInput
              style={styles.textinput}
              secureTextEntry={true}
              placeholder="请输入密码"
              placeholderTextColor="#999"
              selectTextOnFocus={true}
              textContentType="newPassword" // newPassword | oneTimeCode | username | password | none
            />
          }
          code={`<TextInput
    secureTextEntry={true} // 如果为 true，文本框会遮住之前输入的文字
    placeholder="请输入密码"
    selectTextOnFocus={true}
    textContentType="newPassword" // newPassword | oneTimeCode | username | password | none
/>`}
        />

        <ExampleCard
          title="水平居中对齐"
          content={
            <TextInput
              style={styles.textinput}
              defaultValue="文本水平居中"
              textAlign="center"
            />
          }
          code={`<TextInput
    defaultValue="文本水平居中"
    textAlign="center" // 文本对齐方式 enum('left', 'center', 'right')
/>`}
        />

        <ExampleCard
          title="多行文本输入框"
          content={
            <TextInput
              multiline
              numberOfLines={10}
              maxLength={200}
              placeholder="多行输入"
              placeholderTextColor="#999"
              style={[styles.textinput, css.h_128]}
            />
          }
          code={`<TextInput
    multiline
    numberOfLines={10}
    maxLength={200}
    placeholder="多行输入"
/>`}
        />

        <ExampleCard
          title="输入框事件"
          content={
            <View style={[css.gap_16]}>
              <TextInput
                style={styles.textinput}
                placeholder="请输入"
                placeholderTextColor="#999"
                onBlur={() => {
                  setEventList(list => ['onBlur', ...list].slice(0, 10));
                }}
                onFocus={() => {
                  setEventList(list => ['onFocus', ...list].slice(0, 10));
                }}
                // onChange={event => {
                //   console.log('onChange', event);
                //   setEventList(list => ['onChange', ...list].slice(0, 10));
                // }}
                onChangeText={text => {
                  setEventList(list =>
                    ['onChangeText: ' + text, ...list].slice(0, 10),
                  );
                }}
                onSubmitEditing={() =>
                  setEventList(list =>
                    ['onSubmitEditing', ...list].slice(0, 10),
                  )
                }
                onEndEditing={() =>
                  setEventList(list => ['onEndEditing', ...list].slice(0, 10))
                }
                // onPressIn={() =>
                //   setEventList(list => ['onPressIn', ...list].slice(0, 10))
                // }
                // onPressOut={() =>
                //   setEventList(list => ['onPressOut', ...list].slice(0, 10))
                // }
                // onPress={() =>
                //   setEventList(list => ['onPress', ...list].slice(0, 10))
                // }
                onKeyPress={({ nativeEvent }) =>
                  setEventList(list =>
                    ['onKeyPress: ' + nativeEvent.key, ...list].slice(0, 10),
                  )
                }
                // onSelectionChange={({ nativeEvent }) =>
                //   setEventList(list =>
                //     [
                //       'onSelectionChange: ' + JSON.stringify(nativeEvent.selection),
                //       ...list,
                //     ].slice(0, 10),
                //   )
                // }
              />
              <View>
                <Text>事件列表:</Text>
                {eventList.map((event, index) => (
                  <Text key={index}>{event}</Text>
                ))}
              </View>
            </View>
          }
          code={`<TextInput
    placeholder="请输入"
    onBlur={() => {}}
    onFocus={() => {}}
    onSubmitEditing={{ nativeEvent: {text, eventCount, target} } => {}} // 按下回车键时
    onEndEditing={() => {}} // 结束编辑时
    onKeyPress={({ nativeEvent: {key: keyValue} }) => { console.log(nativeEvent.key) }}
    onChangeText={text => { console.log(text) }}
/>`}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textinput: {
    padding: 8,
    fontSize: 18,
    backgroundColor: '#d3d3d3',
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBody: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 16,
  },
});
