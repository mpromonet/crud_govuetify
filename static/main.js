new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => {
        return {
            headers: [
                { text: 'First Name', value: 'firstname' },
                { text: 'Last Name', value: 'lastname' },
                { text: 'City', value: 'city' },
                { text: 'Actions', value: "controls", sortable: false }
            ],
            peoples: []
        }
    },
    mounted() {
        this.getItems()
    },
    methods: {
        getItems: function () {
            fetch('/people')
                .then(response => response.json())
                .then(data => this.peoples = data)
                .catch(err => console.log(err))
        },
        onButtonClick: function (item) {
            console.log('click on ' + item.id)
            fetch(`/people/${item.id}`, { method: 'DELETE' })
                .then(() => this.getItems())
        },
        onNewItem: function (item) {
            console.log('new item')
            fetch(`/people`, { method: 'POST' })
                .then(() => this.getItems())
        },
        onUpdateItem: function(item) {
            console.log('update item', JSON.stringify(item))
            fetch(`/people/${item.id}`, { method: 'PUT', body: JSON.stringify(item)})
                .then(() => this.getItems())
        },
    }
})