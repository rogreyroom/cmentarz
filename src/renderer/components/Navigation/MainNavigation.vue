<template>
    <header class="content">
        <div class="row u-full-width navBar">
            <ul class="menu u-pull-left">
                <li>
                    <router-link to="/">
                        Lista
                    </router-link>
                </li>
                <li>
                    <div class="open-drop">
                        <span>Dodaj</span>
                        <div class="drop-down-box">
                            <ul class="drop-menu">
                                <li>
                                    <router-link to="/konfigurator">
                                        Dodaj cmentarz
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/addGrave">
                                        Dodaj grób
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="open-drop">
                        <span>Raporty</span>
                        <div class="drop-down-box">
                            <ul class="drop-menu">
                                <li>
                                    <router-link to="/raporty/nieOplacone">
                                        Nie opłacone
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/raporty/osobyZmarle">
                                        Zmarli w roku
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/raporty/mapa">
                                        Mapa cmentarza
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </li>
            </ul>
            <div class="search-bar u-pull-right">
                <form>
                    <input class="inputSearch" v-model="searchName" placeholder="Nazwisko" name="search" type="text">
                    <button class="buttonSearch" @click.prevent="searchData()"><i class="fas fa-search"></i></button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>

export default {
    data() {
        return {
            searchName: ''
        }
    },
    methods: {
        searchData: function() {
            let self = this
            if (self.searchName.length > 0) {
                self.$router.push({ path: `/searchResult/${ self.searchName }` })
            } else {
                self.$router.push({ path: '/' })
            }

            document.forms[0].reset()
            self.searchName = ''
        },
    }
}

</script>

<style>

.navBar {
    background-color: rgb(51, 51, 51);
    height: 2.5em
}

.menu {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: 1em;
}

.menu li {
    display: inline-block;
    margin: 0;
    padding: 0.5em;
}

.menu, .menu a, .open-drop span {
    color: rgb(238, 238, 238);
}

.menu:hover, .menu a:hover, .open-drop:hover span {
    color: rgb(101, 196, 240);
}

.menu a {
    text-decoration: none;
}

.menu button {
    margin: 0;
}

.open-drop {
    position: relative;
    display: inline-block;
}

.open-drop:hover .drop-down-box {
    display: block;
}


.drop-down-box {
    display: none;
    position: absolute;
    padding: 12px 16px;
    background-color: rgb(51, 51, 51);
    width: 150px;
    z-index: 1;


}

.drop-menu {
    list-style: none;
    margin: 0;
    padding: 0;
}

.drop-menu li {
    padding: .5em
}

.search-bar {
    background: #464646;
    height: 38px;
}
.inputSearch, .buttonSearch {
    border: 0 !important;
    background: transparent !important;
    margin: 0;
    color: whitesmoke
}

.buttonSearch {
    padding: 0 20px;
}

.buttonSearch:hover {
    color: #333333;
}

</style>