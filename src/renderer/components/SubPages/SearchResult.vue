<template>
    <div>
        <table class="u-full-width" v-show="headerShow">
            <thead>
                <tr>
                    <th>Pokaż</th>
                    <th @click="sortingOrder('user.nrGrobu')">
                        Nr. parceli
                        <template v-if="theKey === 1">
                            <span v-if="isActive">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-else>
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </template>
                    </th>
                    <th @click="sortingOrder('user.imie')">
                        Imię
                        <template v-if="theKey === 2">
                            <span>
                                <i class="fas fa-sort"></i>
                            </span>
                        </template>
                    </th>
                    <th @click="sortingOrder('user.nazwisko')">
                        Nazwisko
                        <template v-if="theKey === 3">
                            <span>
                                <i class="fas fa-sort"></i>
                            </span>
                        </template>
                    </th>
                    <th @click="sortingOrder('user.dtUrodzenia')">
                        Data urodzenia
                        <template v-if="theKey === 4">
                            <span>
                                <i class="fas fa-sort"></i>
                            </span>
                        </template>
                    </th>
                    <th @click="sortingOrder('user.dtZgonu')">
                        Data zgonu
                        <template v-if="theKey === 5">
                            <span>
                                <i class="fas fa-sort"></i>
                            </span>
                        </template>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="doc in orderBy(docs, sortingKey, sortingDirection)" :key="doc._id">
                    <td class="centerText">
                        <router-link :to="'showGrave/' + doc.user.nrGrobu">
                            <i class="fas fa-eye addCursor"></i>
                        </router-link>
                    </td>
                    <td>{{ doc.user.nrGrobu }}</td>
                    <td class="centerText">{{ doc.user.imie ? doc.user.imie : '-' }}</td>
                    <td class="centerText">{{ doc.user.nazwisko ? doc.user.nazwisko : '-' }}</td>
                    <td class="centerText">{{ doc.user.dtUrodzenia ? convertDate(doc.user.dtUrodzenia) : '-' }}</td>
                    <td class="centerText">{{ doc.user.dtZgonu ? convertDate(doc.user.dtZgonu) : '-' }}</td>
                </tr>
            </tbody>
        </table>


    </div>
</template>

<script>

import dateformat from 'dateformat'
import { users } from '../../server/CRUD/user'

export default {
    data() {
        return {
            docs: [],
            headerShow: false,
            loading: false,
            updateDocs: false,
            sortingDirection: 1,
            sortingKey: null,
            isActive: false,
            theKey: null

        }
    },
    computed: {
        sData() {
            return this.$route.params.data
        }
    },
    watch: {
        theKey: {
            handler: function(val, oldVal) {

                if (val !== oldVal) {
                    this.sortingDirection = 1;
                    this.isActive = true;
                }
            }
        },

        sData: {
            handler: function(val, oldVal) {
                if (val !== oldVal) {
                    this.fetchUsers()
                }
            }
        }
    },
    methods: {
        sortingOrder: function(sKey) {
            this.sortingKey = sKey
            switch (sKey) {
                case 'user.nrGrobu':
                    this.theKey = 1;
                    break;
                case 'user.imie':
                    this.theKey = 2;
                    break;
                case 'user.nazwisko':
                    this.theKey = 3;
                    break;
                case 'parcela.dtUrodzenia':
                    this.theKey = 4;
                    break;
                case 'parcela.dtZgonu':
                    this.theKey = 5;
                    break;
                default:
                    break;
            }
            
             this.isActive = !this.isActive
            if (this.isActive) {
                this.sortingDirection = 1
            } else {
                this.sortingDirection = -1
                
            }

        },

        fetchUsers: function() {
            this.getData()
        },

        getDate(data, okres) {
            if ( data !== undefined && okres !== undefined ) {
                let rok = Number(dateformat(data, "yyyy")) + Number(okres)
                let dtZaplaty = dateformat(new Date(rok, dateformat(data, "mm"), dateformat(data, "dd")), "yyyy-mm-dd")
                return dtZaplaty
            } else {
                return '-'
            }
        },

        getData: function() {
            let self = this;
            users.findUsers(self.sData, function(res) {
                if (res) {
                    if ( res.length > 0 ) {
                        self.docs = res
                        self.headerShow = true
                    } else {
                        alert('Nie znaleziono wyników wyszukiwania!')
                        self.headerShow = false
                    }
                } else {
                    console.log('false: ' + res);
                }
            });
        },

        convertDate: function(dt) {
            return dateformat(dt, "yyyy-mm-dd");
        }
    },

    mounted: function() {
        this.fetchUsers()
    },


}

</script>

<style scoped>
div {
    text-align: center;
}

.active svg {
   color: rgb(84, 219, 30);
}
.tabHeader {
    background-color: #1EAEDB;
}

.spacing {
    padding: 15px 25px;
    margin-bottom: 10px;
}

.docItem {
    border-bottom: 1px solid lightgray;
}

.addCursor {
    cursor: pointer;
}

.link {
    color: #1EAEDB;
    cursor: pointer;
}

.link:hover {
    color: #0FA0CE;
}
</style>

