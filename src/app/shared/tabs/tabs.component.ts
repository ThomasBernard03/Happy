import { Component, Input, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>

  ngAfterContentInit() {
    let activeTabs = this.tabs.filter((tab)=>tab.active)

    // S'il n'y a pas d'onglet actif, en rendre un actif.
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first)
    }
  }

  selectTab(tab: TabComponent) {
    // Désactiver tous les onglets
    this.tabs.toArray().forEach(tab => tab.active = false)

    // Activer l'onglet sélectionné
    tab.active = true
  }

}
