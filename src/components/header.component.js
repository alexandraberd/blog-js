import { Component } from '../core/component';

export class HeaderComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        if (localStorage.getItem('visited')) {
            this.hide();
        }
        const button = this.$el.querySelector('.js-header-start');
        button.addEventListener('click', buttonHandler.bind(this));
    }
}

function buttonHandler() {
    localStorage.setItem('visited', JSON.stringify(true));
    this.hide();
}
