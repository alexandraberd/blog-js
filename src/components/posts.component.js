import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { TransformService } from '../services/transform.service';
import { renderPost } from '../templates/post.template';

export class PostsComponent extends Component {
    constructor(id, { loader }) {
        super(id);
        this.loader = loader;
    }
    init() {
        this.$el.addEventListener('click', buttonHadler.bind(this));
    }
    async onshow() {
        this.loader.show();
        const data = await apiService.fetchPost();
        const posts = TransformService.fbObjectToArray(data);

        if (posts === null) {
            this.loader.hide();
            this.renderNull();
            localStorage.removeItem('favorites');
        } else {
            const html = posts.map((post) =>
                renderPost(post, { withButton: true })
            );
            this.loader.hide();
            this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
        }
    }
    onHide() {
        this.$el.innerHTML = '';
    }
}

function buttonHadler(e) {
    const id = e.target.dataset.id;
    const title = e.target.dataset.title;
    console.log(title);
    if (id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const candidate = favorites.find((p) => p.id === id);

        if (candidate) {
            e.target.textContent = 'Сохранить';

            e.target.classList.add('button-primary');
            e.target.classList.remove('button-danger');

            favorites = favorites.filter((p) => p.id !== id);
        } else {
            e.target.textContent = 'Удалить';

            e.target.classList.remove('button-primary');
            e.target.classList.add('button-danger');

            favorites.push({ id, title });
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}
