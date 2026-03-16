import { create } from 'zustand';
// import { derive } from 'derive-zustand';
import { combine, persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createMMKV } from 'react-native-mmkv';

export type TodoFilterType = 'All' | 'Pending' | 'Completed' | 'Trash';
export type TodoDataType = 0 | 1 | 2 | 3;

export type TodoData = {
  id: number;
  title: string;
  done: boolean;
  deleted: boolean;
  type: TodoDataType;
};

interface TodoState {
  type: TodoFilterType;
  list: TodoData[];
  current: TodoData | null;
  activeTabIndex: TodoDataType;
}

interface TodoAction {
  setCurrent: (current: TodoData | null) => void;
  setFilterType: (type: TodoFilterType) => void;
  setTabIndex: (index: TodoDataType) => void;
  add: (item: TodoData) => void;
  edit: (item: TodoData) => void;
  toggleComplete: (id: number) => void;
  del: (id: number) => void;
  restore: (id: number) => void;
  clearAll: () => void;
  clearDeleted: () => void;
  export: () => void;
  addTestData: () => void;
}

const storageId = 'todo-storage';
const storage = createMMKV({
  id: storageId,
});

export const useTodo = create(
  persist(
    immer(
      combine<TodoState, TodoAction>(
        {
          type: 'All',
          list: [],
          current: null,
          activeTabIndex: 0,
        },
        set => {
          return {
            // 设置当前选择的 Todo
            setCurrent: current => {
              set({ current });
            },
            // 设置过滤类型
            setFilterType: type => {
              set(state => {
                state.type = type;
                return state;
              });
            },

            // 设置当前过滤类型下激活的 tab
            setTabIndex: index => {
              set(state => {
                state.activeTabIndex = index;
                return state;
              });
            },

            // 添加 todo
            add: item => {
              set(state => ({ list: [item, ...state.list] }));
            },

            // 编辑
            edit: data => {
              set(state => {
                const index = state.list.findIndex(item => item.id === data.id);
                if (index > -1) {
                  state.list[index] = data;
                }
                return state;
              });
            },

            // 切换完成
            toggleComplete: id => {
              set(state => {
                const item = state.list.find(todo => todo.id === id);
                if (item) item.done = !item.done;
                return state;
              });
            },

            // 删除单个 todo
            del: id => {
              set(state => {
                const index = state.list.findIndex(todo => todo.id === id);
                if (index > -1) {
                  const item = state.list[index];
                  if (!item.deleted) {
                    // 标记删除
                    state.list[index].deleted = true;
                  } else {
                    // 从列表里移除
                    state.list.splice(index, 1);
                  }
                }
                return state;
              });
            },

            // 导出
            export: () => {
              console.log('export');
              console.log(storage.getString('todo-storage'));
            },

            // 还原 todo
            restore: id => {
              set(state => {
                const item = state.list.find(todo => todo.id === id);
                if (item) item.deleted = false;
                return state;
              });
            },

            // 清空列表
            clearAll: () => {
              set({ list: [] });
            },

            // 清空回收站
            clearDeleted: () => {
              set(state => ({
                list: state.list.filter(item => !item.deleted),
              }));
            },

            // 添加测试数据
            addTestData: () => {
              set({
                list: [
                  {
                    id: 1,
                    title: 'Learn React',
                    done: true,
                    deleted: false,
                    type: 0,
                  },
                  {
                    id: 2,
                    title: 'Learn Vue',
                    done: true,
                    deleted: false,
                    type: 1,
                  },
                  {
                    id: 3,
                    title: 'Learn React Native',
                    done: false,
                    deleted: false,
                    type: 0,
                  },
                  {
                    id: 4,
                    title: 'Learn Next.js',
                    done: false,
                    deleted: false,
                    type: 1,
                  },
                  {
                    id: 5,
                    title: 'Learn Nuxt.js',
                    done: false,
                    deleted: false,
                    type: 2,
                  },
                  {
                    id: 6,
                    title: 'Learn Flutter',
                    done: false,
                    deleted: false,
                    type: 3,
                  },
                  {
                    id: 7,
                    title: 'Learn javascript',
                    done: true,
                    deleted: true,
                    type: 0,
                  },
                  {
                    id: 8,
                    title: 'Learn typescript',
                    done: true,
                    deleted: false,
                    type: 1,
                  },
                  {
                    id: 9,
                    title: 'Learn css',
                    done: true,
                    deleted: false,
                    type: 2,
                  },
                  {
                    id: 10,
                    title: 'Learn html',
                    done: true,
                    deleted: false,
                    type: 3,
                  },
                  {
                    id: 11,
                    title: 'Nodejs',
                    done: true,
                    deleted: true,
                    type: 1,
                  },
                  {
                    id: 12,
                    title: 'Learn C#',
                    done: false,
                    deleted: true,
                    type: 3,
                  },
                  {
                    id: 13,
                    title: 'Learn Electron',
                    done: false,
                    deleted: true,
                    type: 2,
                  },
                  {
                    id: 14,
                    title: 'Play Games',
                    done: false,
                    deleted: true,
                    type: 3,
                  },
                ],
              });
            },
          };
        },
      ),
    ),
    {
      name: 'todo-storage',
      version: 0,
      partialize: state => ({ list: state.list }),
      storage: createJSONStorage(() => ({
        setItem: (name, value) => {
          return storage.set(name, value);
        },
        getItem: name => {
          const value = storage.getString(name);
          return value ?? null;
        },
        removeItem: name => {
          return storage.remove(name);
        },
      })),
      onRehydrateStorage: () => {
        console.log('hydration starts');

        // optional
        return (_result, error) => {
          if (error) {
            console.log('an error happened during hydration', error);
          } else {
            console.log('hydration finished');
            // 使用手动订阅方式时，需要额外在 hydration 完成后更新计算属性
            setTimeout(() => {
              useFilteredTodo.getState().update();
            }, 200);
          }
        };
      },
    },
  ),
);

function filterList(list: TodoData[], type: TodoFilterType, tabIndex: number) {
  return list.filter(item => {
    if (item.type === tabIndex) {
      if (type === 'All') {
        return true;
      }
      if (type === 'Pending') {
        return !item.done && !item.deleted;
      }
      if (type === 'Completed') {
        return item.done && !item.deleted;
      }
      if (type === 'Trash') {
        return item.deleted;
      }
    }
    return false;
  });
}

/**
 * 手动订阅方式实现计算属性
 *
 * 也可以使用 middleware/subscribeWithSelector 中间件
 * 该中间件对原本的 subscribe 方法进行拦截、包装，增加了依赖变更的比较，默认为 Object.is 方法，等于是将依赖变更检查前置。
 * 包装后的调用方式为：
 * subscribe(selector, optListener, options)
 * options: null | { equalityFn: (currentSlice, nextSlice) => boolean, fireImmediately: boolean }
 * options.equalityFn 比较函数，接收两个 slice 参数，slice 为 selector 函数返回的值
 * option.fireImmediately：布尔值，是否立即执行监听器(optListener)，默认不执行
 *
 * 使用中间件方式需改写为：
 * useTodo.subscribe((state) => ({
 *        list: state.list,
 *        type: state.type,
 *        activeTabIndex: state.activeTabIndex
 *    }),
 *    (slice, prevSlice) => {},
 *    {
 *        equalityFn: (currentSlice, nextSlice) => {}
 *    }
 * )
 */
type FilteredTodoState = {
  filteredList: TodoData[];
  update: () => void;
};
export const useFilteredTodo = create<FilteredTodoState>(set => {
  return {
    filteredList: [],
    update: () => {
      const { list, type, activeTabIndex } = useTodo.getState();
      set({
        filteredList: filterList(list, type, activeTabIndex),
      });
    },
  };
});

useTodo.subscribe(({ list, type, activeTabIndex }, prevState) => {
  if (
    list !== prevState.list ||
    type !== prevState.type ||
    activeTabIndex !== prevState.activeTabIndex
  ) {
    useFilteredTodo.setState({
      filteredList: filterList(list, type, activeTabIndex),
    });
  }
});

/**
 * derive-zustand 方式实现计算属性
 */
// type FilteredTodoState = {
//   filteredList: TodoData[];
// };
// const filteredTodoStore = derive<FilteredTodoState>(get => {
//   const state = get(useTodo);
//   return {
//     filteredList: filterList(state.list, state.type, state.activeTabIndex),
//   };
// });

// export const useFilteredTodo = <T>(selector: (state: FilteredTodoState) => T) =>
//   useStore(filteredTodoStore, selector);
