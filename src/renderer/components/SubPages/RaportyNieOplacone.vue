<template>
    <div>
        <div class="u-pull-left print-box">
            <span class="link" @click="print()" v-print="'#PrintMe'"><i class="fas fa-print"></i></span>
        </div>

        <table id="PrintMe" class="u-full-width">
            <thead>
                <tr>
                    <th v-show="notPrinting">Pokaż</th>
                    <th>Nr. grunu</th>
                    <th>Rodzaj</th>
                    <th class="min-col-width">Data zaplaty</th>
                    <th class="min-col-width">Data opłaty</th>
                    <th>Okres</th>
                    <th>Opiekun</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="doc in docs" :key="doc._id">
                    <td v-show="notPrinting" class="centerText">
                        <router-link :to="'/showGrave/' + doc.parcela.nrGrobu">
                            <i class="fas fa-eye addCursor"></i>
                        </router-link>
                    </td>
                    <td>{{ doc.parcela.nrGrobu }}</td>
                    <td class="centerText">{{ doc.parcela.rodzaj ? doc.parcela.rodzaj : '-' }}</td>
                    <td class="centerText">{{ convertDate(doc.parcela.dtZaplaty) }}</td>
                    <td class="centerText">{{ convertDate(doc.parcela.dtOplaty) }}</td>
                    <td class="centerText">{{ doc.parcela.okres }}</td>
                    <td class="centerText">{{ createTaker(doc.parcela.nrGrobu) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import dateformat from 'dateformat'
import { graves } from '../../server/CRUD/parcela'
import { takers } from '../../server/CRUD/opiekun'

export default {
    data() {
        return {
            resArr: [],
            docs: [],
            takersArr: [],
            notPrinting: true
        }
    },

    methods: {

        print: function() {
            this.notPrinting = ! this.notPrinting
            setTimeout(() => {
                this.notPrinting = ! this.notPrinting
            }, 150);
        },

        fetchGraves: async function() {
            this.getData()
        },

        getData: function() {
            let self = this;
            graves.viewAllParcela(function(res) {
                if (res) {
                    self.resArr = res;
                    self.resArr.forEach(function(grave) {
                        if ( grave.parcela.dtZaplaty !== null && grave.parcela.dtZaplaty <= Date() ) {
                            self.docs.push(grave);
                        }
                    })

                    self.fillTakers()
                } else {
                    console.log('false: ' + res);
                }
            });
        },

        fillTakers: function() {
            let self = this
            self.docs.forEach(function(grave) {
                takers.viewTaker(grave.parcela.nrGrobu, function(res) {
                    if (res) {
                        self.takersArr.push(res)
                    } else {
                        console.log('false: ' + res);
                    }
                })
            });
        },
     
        createTaker: function(nrGrobu) {
            let opis = ''    
            for (let i = 0; i < this.takersArr.length; i++) {
                const el = this.takersArr[i]
                if (el.taker.nrGrobu === nrGrobu ) {
                    if (el.taker.imie !== undefined && el.taker.nazwisko !== undefined ) {
                        let opis = el.taker.imie + ' ' + el.taker.nazwisko + ', tel: ' + el.taker.tel + ', email: ' + el.taker.email
                        return opis
                    }
                } 
            }
        },

        convertDate: function(dt) {
            return dateformat(dt, "yyyy-mm-dd");
        },

    },

    created: function() {
        this.fetchGraves()
        
    },

}

</script>

<style scoped>

.min-col-width {
    min-width: 110px;
}

th {
    text-align: center;
}

.centerText {
    text-align: center;
}
.tabHeader {
    background-color: #1EAEDB;
}

.spacing {
    padding: 15px 25px;
    margin-bottom: 10px;
}

.print-box {
    height: 38px;
    padding: 6px 10px;
}


</style>

