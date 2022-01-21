import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { renderPost } from '../templates/post.template';

export class FavoriteComponent extends Component {
    constructor(id, { loader }) {
        super(id);
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener('click', linkClickHandler.bind(this));
    }

    onshow() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (favorites.length == 0) {
            this.renderNull();
        } else {
            const html = renderList(favorites);
            this.$el.insertAdjacentHTML('afterbegin', html);
        }
    }
    onHide() {
        this.$el.innerHTML = '';
    }
}
function renderList(list) {
    return `
        <ul>
        ${list
            .map(
                (item) =>
                    `<li><a href='#' data-id="${item.id}">${item.title}</a></li>`
            )
            .join(' ')}
        </ul>
    `;
}

async function linkClickHandler(e) {
    e.preventDefault();
    let target = e.target.closest('a');
    if (target) {
        const id = target.dataset.id;
        this.$el.innerHTML = '';
        this.loader.show();

        const post = await apiService.fetchPostsById(id);
        this.loader.hide();
        this.$el.insertAdjacentHTML(
            'afterbegin',
            renderPost(post, { withButton: false })
        );
    }
}
