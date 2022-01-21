import { Component } from '../core/component';

export class NavigationComponent extends Component {
    constructor(id) {
        super(id);
        this.tabs = [];
    }

    init() {
        this.$el.addEventListener('click', tabClickHandler.bind(this));
    }
    registerTabs(tabs) {
        this.tabs = tabs;
    }
}

function tabClickHandler(e) {
    e.preventDefault();
    let target = e.target;
    if (target.classList.contains('tab')) {
        Array.from(this.$el.querySelectorAll('.tab')).forEach((tab) => {
            tab.classList.remove('active');
        });
        target.classList.add('active');

        const activeTab = this.tabs.find(
            (tab) => tab.name === target.dataset.name
        );
        this.tabs.forEach((tab) => tab.component.hide());
        activeTab.component.show();
    }
}
