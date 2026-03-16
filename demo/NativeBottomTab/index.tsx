import { ScrollView, View } from 'react-native';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { default as Text } from '../../components/ThemeText';
import css from '../../styles/css';
import ExampleCard from '../../components/ExampleCard';

type NativeTabNavigatiorParamList = {
  Note: undefined;
  Album: undefined;
  Music: undefined;
  Video: undefined;
  Search: undefined;
};

const Tab = createNativeBottomTabNavigator<NativeTabNavigatiorParamList>();
type TabScreenProps = BottomTabScreenProps<
  NativeTabNavigatiorParamList,
  keyof NativeTabNavigatiorParamList
>;

const config = {
  Note: {
    color: '#444444',
  },
  Album: {
    color: 'darkslategrey',
  },
  Music: {
    color: 'darkslateblue',
  },
  Video: {
    color: '#495867',
  },
  Search: {
    color: 'maroon',
  },
};

const ContentComponent = ({ route }: TabScreenProps) => {
  const [count, setCount] = useState(1);
  const navigation = useNavigation();
  const name = route.name;
  useEffect(() => {
    // @ts-ignore - tabPress is a valid event for bottom tab navigator
    const unsubscribe = navigation.addListener('tabPress', () => {
      setCount(c => c + 1);
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <ScrollView
      style={[css.flex_1]}
      contentContainerStyle={[
        css.flex_1,
        css.justify_center,
        css.items_center,
        css.p_16,
        css.pb_24,
        css.gap_24,
        { backgroundColor: config[name].color },
      ]}
    >
      <ExampleCard
        title={name}
        content={
          <View style={[css.gap_16]}>
            <Text>页面激活次数：{count}</Text>
            <Text>route: {JSON.stringify(route, null, 2)}</Text>
          </View>
        }
      />
    </ScrollView>
  );
};

export default function Demo() {
  return (
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen
        name="Note"
        component={ContentComponent}
        options={{
          title: '笔记',
          tabBarIcon: {
            type: 'sfSymbol',
            name: 'note.text',
          },
          tabBarBadge: 99,
          tabBarActiveTintColor: '#00f5d4',
        }}
      />
      <Tab.Screen
        name="Album"
        component={ContentComponent}
        options={{
          title: '相册',
          tabBarIcon: {
            type: 'sfSymbol',
            name: 'photo',
          },
          tabBarActiveTintColor: '#f15bb5',
        }}
      />
      <Tab.Screen
        name="Music"
        component={ContentComponent}
        options={{
          title: '音乐',
          tabBarIcon: {
            type: 'sfSymbol',
            name: 'music.note',
          },
          tabBarActiveTintColor: '#fee440',
        }}
      />
      <Tab.Screen
        name="Video"
        component={ContentComponent}
        options={{
          title: '视频',
          tabBarIcon: {
            type: 'sfSymbol',
            name: 'video',
          },
          tabBarActiveTintColor: '#00bbf9',
        }}
      />
      {/* <Tab.Screen
        name="Search"
        component={SearchComponent}
        options={{
          title: '搜索',
          tabBarSystemItem: 'search',
          headerSearchBarOptions: {
            placeholder: '搜索关键词',
          },
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
        }}
      /> */}
    </Tab.Navigator>
  );
}
