import { createDrawerNavigator } from '@react-navigation/drawer';
import { type TodoDrawerNavigatorParamList } from '../../../types/navigation';
import { LazyComponent } from '../../../components/LazyComponent';
import { lazy } from 'react';
import css from '../../../styles/css';
import DrawerContent from '../../Todo/components/DrawerContent';

const Drawer = createDrawerNavigator<TodoDrawerNavigatorParamList>();
const Content = lazy(() => import('../../Todo/index'));

export default function Page() {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenLayout={LazyComponent}
      screenOptions={{
        drawerActiveTintColor: css.tomato.color,
        // drawerActiveBackgroundColor
        // drawerInactiveTintColor
        // drawerInactiveBackgroundColor
        drawerItemStyle: {},
        drawerLabelStyle: {
          ...css.font_16,
        },
        // ScrollView contentContainerStyle
        drawerContentContainerStyle: {},
        // ScrollViwe style
        drawerContentStyle: {},
        // drawer view style
        drawerStyle: {
          width: 280,
        },
        // drawerPosition: 'left',
        // drawerType: 'slide', // Defaults to slide on iOS and front on other platforms
        // drawerHideStatusBarOnOpen: false, // iOS
        // drawerStatusBarAnimation: 'slide', // iOS: slide | fade | none
        // overlayColor: 'transparent',
        sceneStyle: {},
        // swipeEnabled: true,
        // swipeEdgeWidth
        // swipeMinDistance
        // keyboardDismissMode: 'on-drag', // no-drag | none
        // popToTopOnBlur: false,
      }}
      // screenListeners={{
      //   drawerItemPress: e => {},
      // }}
    >
      <Drawer.Screen
        name="All"
        component={Content}
        options={{
          title: '🐵 全部待办',
        }}
      />
      <Drawer.Screen
        name="Pending"
        component={Content}
        options={{
          title: '🙈 未完成',
        }}
      />
      <Drawer.Screen
        name="Completed"
        component={Content}
        options={{
          title: '🙉 已完成',
        }}
      />
      <Drawer.Screen
        name="Trash"
        component={Content}
        options={{
          title: '🙊 回收站',
        }}
      />
    </Drawer.Navigator>
  );
}
