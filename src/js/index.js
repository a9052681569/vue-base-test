import Vue from 'vue/dist/vue'

import '../css/index.css'

const main = new Vue({
    el: '.main',
    data: {
        mess: 'привет'
    }
})

let main2 = new Vue({
    el: '.main2',
    data: {
        mess: 'foo'
    }
})

const main3 = new Vue({
    el: '.main3',
    data: {
        mess: 3
    },
    methods: {
        doubleMess() {
            this.mess = this.mess * 2;
        },
        refreshMess() {
            this.mess = 3;
        }
    }
})
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li v-on:click="$emit(\'get-value\')"><p>{{todo.text}}</p><button v-on:click="$emit(\'remove\')">удалить</button></li>'
})
const main4 = new Vue({
    el: '.main4',
    data: {
        mess: 'ты пидор',
        groceryList: [
            { id: 1, text: 'Овощи' },
            { id: 2, text: 'Сыр' },
            { id: 3, text: 'Что там ещё люди едят?' }
          ],
        seen: true,
        search: '',
        findList: '',
        todoToAdd: ''
    },
    methods: {
        moreTodo() {
            this.groceryList.push({
                text: this.todoToAdd,
                id: Math.random()
            })
            this.todoToAdd = '';
        },
        switchTodo() {
            // this.$set(массив (или объект), индекс заменяемого элемента(или название ключа), новый элемент(или значение ключа))
            this.$set(this.groceryList, document.forms.setTodo.elements.num.value - 1, {
                id: Math.random(),
                text: document.forms.setTodo.elements.newTodo.value
            })
        },
        getValue() {
            console.log(event.target.textContent)
        }
    },
    watch: {
        search() {
            if(this.search.length > 0) {
                this.seen = false;
                this.findList = this.groceryList.filter((item) => {
                    return item.text.toLowerCase().match(this.search.toLowerCase())
                })
            } else {
                this.seen = true;
            }   
        }
    }
})
const main5 = new Vue({
    el: '.main5',
    data: {
        mess: 'ты пидор'
    },
    computed: {
        reversedMess() {
            return this.mess.split(' ').reverse().join(' ');
        }
    }
})

const main6 = new Vue({
    el: '.main6',
    data: {
        firstName: 'Андрей',
        lastName: 'Серебренников'
    },
    computed: {
        fullName: {
            get() {
                return `${this.firstName} ${this.lastName}`
            },
            set(newValue) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    }
})

var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
      question: '',
      answer: 'Пока вы не зададите вопрос, я не могу ответить!',
      src: ''
    },
    watch: {
      // эта функция запускается при любом изменении вопроса
      question: function (newQuestion, oldQuestion) {
            this.getAnswer()
      }
    },
    methods: {
        getAnswer: function () {
            if(this.question == '') {
                this.answer = 'Пока вы не зададите вопрос, я не могу ответить!'
                return
            } else if (!this.question.endsWith('?')) {
                this.answer = 'Вопросы обычно заканчиваются вопросительным знаком. ;-)';
                this.src = ''
                return
            }
            
            this.answer = 'Думаю...'
            const vm = this
            fetch('https://yesno.wtf/api')
                .then(res => res.json())
                .then((response) => {
                    vm.answer = response.answer;
                    vm.src = response.image;
                })
                .catch((error) => {
                    vm.answer = 'Ошибка! Не могу связаться с API. ' + error
                })
          
        }
    }
})

const main7 = new Vue({
    el: '.main7',
    data: {
        isYellow: true
    },
    methods: {
        switchColor() { 
            this.isYellow = !this.isYellow
        }
    },
    computed: {
        classObject() {
            return {
                yellow: this.isYellow
            }
        }
    }
})

const main8 = new Vue({
    el: '.main8',
    data: {
        awesomeEl: true,
        secretEl: true
    },
    methods: {
        changeEl() {
            this.awesomeEl = !this.awesomeEl;
            this.secretEl = false;
        },
        showSecret() {
            this.awesomeEl = false;
            this.secretEl = true
        }
    }
})

const main9 = new Vue({
    el:'.main9',
    data: {
        text: '',
        savedText: ''
    },
    methods: {
        save(text, event) {
            this.savedText = text
        }
    }
})

const main10 = new Vue({
    el: '.main10',
    data: {
        checkedNames: [],
        peoples: [{name: 'Jack', id: 1}, {name: 'Vorobei', id: 2}],
        name: ''
    },
    methods: {
        addName() {
            this.peoples.push({
                name: this.name,
                id: Math.random()
            })
            this.name = ''
        }
    }
})

const main11 = new Vue({
    el: '.main11',
    data: {
        checked: 'пока',
        picked: '',
        raz: 'Uno',
        dva: 'Duos'
    }
})

Vue.component('custom-input', {
    props: ['value'],
    template: `
      <input
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    `
})

const main12 = new Vue({
    el: '.main12',
    data: {
        searchText: ''
    }
})

Vue.component('blog-post', {
    props: ['post'],
    template: `
      <div class="blog-post" :style='{ fontSize: post.fontsize + "em" }'>
        <h3>{{ post.title }}</h3>
        <button v-on:click="this.enlarge">
          Увеличить размер текста
        </button>
        <button v-on:click="this.tinify">
          Уменьшить размер текста
        </button>
        <div v-html="post.content"></div>
      </div>
    `,
    methods: {
        enlarge() {
            this.post.fontsize += .1
        },
        tinify() {
            this.post.fontsize -= .1
        }
    }
})
Vue.component('post-form', {
    props: ['data'],
    template: `
        <form v-on:submit.prevent="$emit('postit')">
            <input
            v-model='data.title'
            placeholder='введите заголовок'>
            <input
            v-model='data.content'
            placeholder='введите текст'>
            <button>
            запостить
            </button>
            <slot></slot>
        </form>
    `
})

const main13 = new Vue({
    el: '.main13',
    data: {
        posts: [{
            title: 'Первый пост',
            content: `<p>текст первого поста</p>`,
            fontsize: 1,
            id: Math.random()
        }],
        formData: {
            title: '',
            content: ''
        },
        currentPost: ''
        
    },
    methods: {
        postit() {
            this.posts.push({
                title: this.formData.title,
                content: this.formData.content,
                fontsize: 1,
                id: Math.random()
            })
            this.formData = {
                title: '',
                content: ''
            }
        },
        getCurrentPost(post) {
            this.currentPost = post
        }
    }
})
var tabs = [
    {
      name: 'Home', 
      component: { 
        template: `<div>Home component</div>` 
      }
    },
    {
      name: 'Posts',
      component: {
        template: '<div>Posts component</div>'
      }
    },
    {
      name: 'Archive',
      component: {
        template: '<div>Archive component</div>',
      }
    }
]
  
new Vue({
    el: '.main14',
    data: {
        tabs: tabs,
        currentTab: tabs[0]
    }
})

const main15 = new Vue({
    el: '.main15',
    data: {
        buttonState: 'first'
    },
    methods: {
        changeState() {
            switch (this.buttonState) {
                case 'first': return this.buttonState = 'second'
                case 'second': return this.buttonState = 'third'
                case 'third': return this.buttonState = 'first'
            }
        }
    },
    computed: {
        buttonMessage: function () {
            switch (this.buttonState) {
                case 'first': return 'я прикольно меняюсь по нажатию'
                case 'second': return 'правда круто?'
                case 'third': return 'нет, ну офигеть же'
            }
        }
    } 
})

new Vue({
    el: '#list-demo',
    data: {
        items: [1,2,3,4,5,6,7,8,9]
    },
    methods: {
        randomIndex: function () {
            return Math.floor(Math.random() * this.items.length)
        },
        add: function () {
            this.items.splice(this.randomIndex(), 0, this.findMax + 1)
        },
        remove: function () {
            this.items.splice(this.randomIndex(), 1)
        },
        shake() {
            let newArr = []
            do {
                newArr.push(this.items.splice(this.randomIndex(), 1).join())
            } while (this.items.length > 0)
            this.items = newArr
        },
        
    },
    computed: {
        findMax() {
            return this.items.reduce((prev, item) => prev < item ? prev = item : prev = prev)
        }
    }
})