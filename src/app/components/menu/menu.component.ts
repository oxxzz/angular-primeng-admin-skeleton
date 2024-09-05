import { Component, Input } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RippleModule } from 'primeng/ripple';
import { NavItem } from '../../types/type';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [PanelMenuModule, RippleModule, DividerModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less',
})
export class MenuComponent {
  @Input() collasped: Boolean = false;
  @Input() items?: NavItem[] = [];
}
