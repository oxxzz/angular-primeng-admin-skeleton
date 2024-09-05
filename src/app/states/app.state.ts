import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NavItem } from '../types/type';

interface AppStateType {
  loggedIn?: boolean;
  collapsed?: boolean;
  sidebarNavs?: NavItem[];
}

export namespace AppStateActions {
  export class SetCollapsed {
    static readonly type = '[App] Set Collapsed';
    constructor(public collapse: boolean) {}
  }

  export class PatchState {
    static readonly type = '[App] Patch State';
    constructor(public state: Partial<AppStateType>) {}
  }
}

// demo navs
const defaultNavs: NavItem[] = [
  {
    group: '',
    items: [
      {
        label: '首页',
        icon: 'pi pi-home',
        url: '/',
        tags: 'A B',
        items: [],
      },
      {
        label: '概览',
        icon: 'pi pi-chart-pie',
        url: '/',
        tags: 'A B',
        items: [],
      },
    ],
  },
  {
    group: '数据',
    items: [
      {
        label: '订单统计',
        icon: 'pi pi-clipboard',
        url: '/',
        tags: 'A B',
        items: [
          {
            label: '订单统计',
            icon: 'pi pi-clipboard',
            url: '/',
            tags: 'A B',
            items: [],
          },
        ],
      },
      {
        label: '用户统计',
        icon: 'pi pi-address-book',
        url: '/',
        tags: 'A B',
        items: [],
      },
    ],
  },
  {
    group: '订单',
    items: [
      {
        label: '预约订单',
        icon: 'pi pi-clipboard',
        url: '/',
        tags: 'A B',
        items: [],
      },
      {
        label: '会员订单',
        icon: 'pi pi-clipboard',
        url: '/',
        tags: 'A B',
        items: [],
      },
      {
        label: '商城订单',
        icon: 'pi pi-clipboard',
        url: '/',
        tags: 'A B',
        items: [],
      },
    ],
  },
  {
    group: '推广',
    items: [
      {
        label: 'AI 素材',
        icon: 'pi pi-palette',
        url: '/',
        tags: 'A B',
        items: [],
      },
      {
        label: '线索通',
        icon: 'pi pi-lightbulb',
        url: '/',
        tags: 'A B',
        items: [],
      },
      {
        label: '跟进记录',
        icon: 'pi pi-address-book',
        url: '/',
        tags: 'A B',
        items: [],
      },
    ],
  },
  {
    group: '审查',
    items: [
      {
        label: '操作记录',
        icon: 'pi pi-clipboard',
        url: '/',
        tags: 'A B',
        items: [],
      },
    ],
  },
  {
    group: '帮助',
    items: [
      {
        label: '使用手册',
        icon: 'pi pi-file-pdf',
        url: '/',
        tags: 'A B',
        items: [],
      },
    ],
  },
];

@Injectable()
@State<AppStateType>({
  name: 'app',
  defaults: {
    loggedIn: true,
    sidebarNavs: defaultNavs,
  },
})
export class AppState {
  @Selector()
  static loggedIn(state: AppStateType): boolean {
    return !!state.loggedIn;
  }

  @Selector()
  static collapse(state: AppStateType): boolean {
    return !!state.collapsed;
  }

  @Selector() static navs(state: AppStateType): any[] {
    return state.sidebarNavs || [];
  }

  @Action(AppStateActions.SetCollapsed)
  toggleCollapse(
    { patchState }: StateContext<AppStateType>,
    action: AppStateActions.SetCollapsed
  ) {
    patchState({ collapsed: action.collapse });
    // sync to cache.
    // Cache.put('collapse', action.collapse);
  }

  @Action(AppStateActions.PatchState)
  patchState(
    { patchState }: StateContext<AppStateType>,
    action: AppStateActions.PatchState
  ) {
    patchState(action.state);
  }
}
