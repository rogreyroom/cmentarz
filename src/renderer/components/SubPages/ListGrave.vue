<template>
    <div>

        <table class="u-full-width" v-show="headerShow">
            <thead>
                <tr>
                    <th>Pokaż</th>
                    <th>Edytuj</th>
                    <th>Usuń</th>
                    <th @click="sortingOrder('parcela.nrGrobu')">
                        Nr. parceli
                        <template v-if="theKey === 1">
                            <span>
                                <i class="fas fa-sort"></i>
                            </span>
                        </template>
                    </th>
                    <th @click="sortingOrder('parcela.rodzaj')">
                        Rodzaj
                        <template v-if="theKey === 2">
                            <span>
                                <i class="fas fa-sort"></i>
                            </span>
                        </template>
                    </th>
                    <th @click="sortingOrder('parcela.status')">
                        Status
                        <template v-if="theKey === 3">
                            <span>
                                <i class="fas fa-sort"></i>
                            </span>
                        </template>
                    </th>
                    <th @click="sortingOrder('parcela.dtZaplaty')">
                        Data zapłaty
                        <template v-if="theKey === 4">
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
                        <router-link :to="'showGrave/' + doc.parcela.nrGrobu">
                            <i class="fas fa-eye addCursor"></i>
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="'editGrave/' + doc.parcela.nrGrobu">
                            <i class="far fa-edit addCursor"></i>
                        </router-link>
                    </td>
                    <td>
                        <span class="link" @click.prevent="delGrave(doc.parcela.nrGrobu)">
                            <i class="far fa-trash-alt addCursor"></i>
                        </span>
                    </td>
                    <td>{{ doc.parcela.nrGrobu }}</td>
                    <td class="centerText">{{ doc.parcela.rodzaj ? doc.parcela.rodzaj : '-' }}</td>
                    <td class="centerText">{{ doc.parcela.status ? doc.parcela.status : '-' }}</td>
                    <td class="centerText">{{ doc.parcela.dtZaplaty ? convertDate(doc.parcela.dtZaplaty) : '-' }}</td>
                </tr>
            </tbody>
        </table>


    </div>
</template>

<script>

import dateformat from 'dateformat'
import { graves } from '../../server/CRUD/parcela'

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
        
    },
    methods: {
        sortingOrder: function(sKey) {
            this.sortingKey = sKey
            switch (sKey) {
                case 'parcela.nrGrobu':
                    this.theKey = 1;
                    break;
                case 'parcela.rodzaj':
                    this.theKey = 2;
                    break;
                case 'parcela.status':
                    this.theKey = 3;
                    break;
                case 'parcela.dtZaplaty':
                    this.theKey = 4;
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

        fetchGraves: function() {
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
            graves.viewAllParcela(function(res) {

                if (res) {
                    self.docs = res;
                    self.headerShow = true;
                } else {
                    console.log('false: ' + res);
                }
            });
        },

        convertDate: function(dt) {
            return dateformat(dt, "yyyy-mm-dd");
        },
        delGrave: function(nrGrobu) {
            graves.removeParcela(nrGrobu);
            this.updateDocs = true
        },
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
        docs: {
            handler: function(val, oldVal) {

                if (val !== oldVal) {
                    this.getData();
                }
            }
        }
    },

    mounted() {
        this.fetchGraves()
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

