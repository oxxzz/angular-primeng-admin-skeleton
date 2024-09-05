import { Component, inject, OnInit, Signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { select, Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';
import { MenuComponent } from '../../components/menu/menu.component';
import { AppState, AppStateActions } from '../../states/app.state';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    AvatarModule,
    MenuModule,
    TagModule,
    MenuComponent,
    MenuComponent,
    BadgeModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.less',
})
export class MainComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);
  collapse: Signal<boolean> = select(AppState.collapse);
  navs = select(AppState.navs);
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        separator: true,
      },
      {
        label: 'Documents',
        items: [
          {
            label: 'New',
            icon: 'pi pi-plus',
            shortcut: '⌘+N',
          },
          {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S',
          },
        ],
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            shortcut: '⌘+O',
          },
          {
            label: 'Messages',
            icon: 'pi pi-inbox',
            badge: '2',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            shortcut: '⌘+Q',
          },
        ],
      },
      {
        separator: true,
      },
    ];
  }

  setCollapsed() {
    this.store.dispatch(new AppStateActions.SetCollapsed(!this.collapse()));
  }
  onClickLogo() {
    this.router.navigateByUrl('/');
  }

  onMouseOverSidebar(e: MouseEvent, el: HTMLDivElement) {
    e.stopPropagation();
    this.collapse() &&
      this.store.dispatch(new AppStateActions.SetCollapsed(false));
  }

  onMouseLeaveSidebar(e: MouseEvent, el: HTMLDivElement) {
    e.stopPropagation();
    if (!this.collapse()) {
      return;
    }
    this.store.dispatch(new AppStateActions.SetCollapsed(true));
  }
}
