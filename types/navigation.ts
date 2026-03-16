import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// 定义应用中的路由参数类型

// ----- START ----- MainStack -----
export type MainStackNavigatorParamList = {
  Home: undefined;
  Demo: {
    name: string;
  };
  CodeModal: undefined;
  ReadMeModal: undefined;
  TodoEditModal: undefined;
};
type MainStackPageScreenProps<T extends keyof MainStackNavigatorParamList> =
  NativeStackScreenProps<MainStackNavigatorParamList, T>;

export type HomeScreenProps = MainStackPageScreenProps<'Home'>;
export type DemoScreenProps = MainStackPageScreenProps<'Demo'>;

// type NestedHomeScreenProps<T extends keyof MainStackNavigatorParamList> =
//   CompositeScreenProps<
//     NativeStackScreenProps<MainStackNavigatorParamList, T>,
//     DefaultTabPageScreenProps
//   >;
// export type HomeScreenProps = NestedHomeScreenProps<'Home'>;
// export type DemoScreenProps = NestedHomeScreenProps<'Demo'>;
// ----- END ----- MainStack -----

// ----- START ----- TabNavigator -----
export type TabNavigatiorParamList = {
  DefaultTab: undefined;
  TodoTab: NavigatorScreenParams<TodoDrawerNavigatorParamList>;
  AboutTab: undefined;
};
type NestedTabScreenProps<T extends keyof TabNavigatiorParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabNavigatiorParamList, T>,
    HomeScreenProps
  >;

export type DefaultTabPageScreenProps = NestedTabScreenProps<'DefaultTab'>;
export type TodoTabPageScreenProps = NestedTabScreenProps<'TodoTab'>;
export type AboutTabPageScreenProps = NestedTabScreenProps<'AboutTab'>;
// ----- END ----- TabNavigator -----

// ----- START ----- TodoTab -----
export type TodoDrawerNavigatorParamList = {
  // 所有
  All: undefined;
  // 未完成
  Pending: undefined;
  // 完成的
  Completed: undefined;
  // 回收站
  Trash: undefined;
};
type NestedTodoScreenProps<T extends keyof TodoDrawerNavigatorParamList> =
  CompositeScreenProps<
    DrawerScreenProps<TodoDrawerNavigatorParamList, T>,
    TodoTabPageScreenProps
  >;
export type TodoScreenProps = NestedTodoScreenProps<'All'>;
export type TodoPendingScreenProps = NestedTodoScreenProps<'Pending'>;
export type TodoCompletedScreenProps = NestedTodoScreenProps<'Completed'>;
export type TodoTrashScreenProps = NestedTodoScreenProps<'Trash'>;
// ----- END ----- TodoTab -----

// ----- START ----- RootNavigator -----
export type RootNavigatorParamList = MainStackNavigatorParamList;
// ----- END ----- RootNavigator -----

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigatorParamList {}
  }
}
