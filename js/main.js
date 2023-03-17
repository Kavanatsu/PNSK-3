let eventBus = new Vue()

Vue.component('cols', {
    template:`
        <div class="cols">
            <div class="cols-wrapper">
                <div class="col">
                    <newcard></newcard>
                    <h2 class="col-title">Запланированные задачи</h2>
                    <ul>
                        <li class="cards" v-for="card in col1">
                            <div class="card-header">
                                <p class="card-title">{{ card.title }}</p>
                                <button class="change" title="Изменить" @click="changeCard"></button>
                                <button class="delete" title="Удалить" @click="deleteCard"></button>
                            </div>
                            <ul>
                                <li class="tasks" v-if="card.title != null">
                                    <p class="description">{{ card.description }}</p>
                                    <p class="deadline">Выполнить до: {{ card.deadline }}</p>
                                    <p></p>
                                </li>
                            </ul>
                            <button class="next" title="В следующий столбец" @click="newStatus1"></button>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <h2 class="col-title">Задачи в работе</h2>
                    <ul>
                        <li class="cards" v-for="card in col2">
                            <p class="card-title">{{ card.title }}</p>
                            <ul>
                                <li class="tasks">
                                    <input type="checkbox" class="checkbox">
                                    <p></p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <h2 class="col-title">Тестирование</h2>
                    <ul>
                        <li class="cards" v-for="card in col3">
                            <p class="card-title">{{ card.title }}</p>
                            <ul>
                                <li class="tasks">
                                    <input type="checkbox" class="checkbox">
                                    <p></p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <h2 class="col-title">Выполненные задачи</h2>
                    <ul>
                        <li class="cards" v-for="card in col4">
                            <p class="card-title">{{ card.title }}</p>
                            <ul>
                                <li class="tasks">
                                    <input type="checkbox" class="checkbox">
                                    <p></p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            col1: [],
            col2: [],
            col3: [],
            col4: [],
            errors: []
        }
    },
    mounted() {
        this.col1 = JSON.parse(localStorage.getItem("col1")) || [];
        this.col2 = JSON.parse(localStorage.getItem("col2")) || [];
        this.col3 = JSON.parse(localStorage.getItem("col3")) || [];
        this.col4 = JSON.parse(localStorage.getItem("col4")) || [];
        eventBus.$on('card-submitted', card => {
            this.col1.push(card)
            this.saveCard1()
        })
    },
    watch: {
        col1(newValue) {
            localStorage.setItem("col1", JSON.stringify(newValue));
        },
        col2(newValue) {
            localStorage.setItem("col2", JSON.stringify(newValue));
        },
        col3(newValue) {
            localStorage.setItem("col3", JSON.stringify(newValue));
        },
        col4(newValue) {
            localStorage.setItem("col4", JSON.stringify(newValue));
        }
    },
    props: {
        card: {
            title: {
                type: Text,
                required: true
            },
            description: {
                type: Text,
                required: true
            },
            deadline: {
                type: Date,
                required: true
            },
            date: {
                type: Date,
                required: false
            },
            errors: {
                type: Array,
                required: false
            }
        }
    },
    methods: {
        saveCard1() {
            localStorage.setItem("col1", JSON.stringify(this.col1));
        },
        saveCard2() {
            localStorage.setItem("col2", JSON.stringify(this.col2));
        },
        saveCard3() {
            localStorage.setItem("col3", JSON.stringify(this.col3));
        },
        saveCard4() {
            localStorage.setItem("col4", JSON.stringify(this.col4));
        },
    }, 

})

Vue.component('newcard', {
    template:`
        <section>
            <a href="#openModal" class="modal-link">+</a>
            <div id="openModal" class="modal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <a href="#close" title="Закрыть" class="close">x</a>
                        <div class="modal-header">
                            <h2 class="modal-title">Новая запись</h2>
                        </div>
                        <div class="modal-body">
                            <form class="addform" @submit.prevent="onSubmit">

                                <label for="title">Название:</label>
                                <input id="title" type="text" maxlength="50" v-model="title" required>

                                <label for="description">Описание задачи:</label>
                                <input id="description" type="text" maxlength="300" v-model="description" required>

                                <label for="deadline">Выполнить до:</label>
                                <input id="deadline" type="date" v-model="deadline" required>

                                <button type="submit">Создать</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            title:null,
            description: null,
            deadline: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            let card = {
                title: this.title,
                description: this.description,
                deadline: this.deadline,
                date: null,
            }
            eventBus.$emit('card-submitted', card)
            this.title = null
            this.description = null
            this.deadline = null
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        name: 'Kanban доска'
    }
})