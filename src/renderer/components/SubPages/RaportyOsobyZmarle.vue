<template>
    <div>
        <div class="row searchBar">
            <div class="u-pull-left print-box">
                <span class="link" @click="print()" v-print="'#PrintMe'"><i class="fas fa-print"></i></span>
            </div>
            <div class="u-pull-right search-box">
                <form>
                    <input v-model="theYear" class="search-input" placeholder="rok" name="search" type="text" required>
                    <button @click.prevent="fetchUsers()"><i class="fas fa-search"></i></button>
                </form>
            </div>
        </div>
        <div class="alert-info" v-if="noData">
            {{ alert }}
        </div>
        <div v-else>
            <table id="PrintMe" class="u-full-width">
                <thead>
                    <tr>
                        <th v-show="notPrinting">Pokaż</th>
                        <th>Imię Nazwisko</th>
                        <th class="min-col-width">Data urodzenia</th>
                        <th>Wiek</th>
                        <th class="min-col-width">Data zgonu</th>
                        <th class="min-col-width">Data pochówku</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="doc in docs" :key="doc._id">
                        <td v-show="notPrinting" class="centerText">
                            <router-link :to="'/showGrave/' + doc.user.nrGrobu">
                                <i class="fas fa-eye addCursor"></i>
                            </router-link>
                        </td>
                        <td class="centerText">{{ fullName(doc.user.imie, doc.user.nazwisko) }}</td>
                        <td class="centerText">{{ convertDate(doc.user.dtUrodzenia) }}</td>
                        <td class="centerText">{{ doc.user.wiek }}</td>
                        <td class="centerText">{{ convertDate(doc.user.dtZgony) }}</td>
                        <td class="centerText">{{ convertDate(doc.user.dtPochowku) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import dateformat from 'dateformat'
import { users } from '../../server/CRUD/user'

export default {
    data() {
        return {
            theYear: '',
            resArr: [],
            docs: [],
            noData: true,
            notPrinting: true,
            alert: 'Brak danych dla wybranej opcji.'
        }
    },

    methods: {

        print: function() {
            this.notPrinting = ! this.notPrinting
            setTimeout(() => {
                this.notPrinting = ! this.notPrinting
            }, 150);
        },

        fetchUsers: async function() {
            let reg = new RegExp('^\\d+$')
            if (this.theYear.length === 4 && reg.test(this.theYear)) {
                this.docs = []
                this.getData()
            } else {
                alert('Wprowadź poprawny rok w formie czterocyfrowej')
                document.forms[0].reset()
            }
        },

        getData: function() {
            let self = this;
            users.viewUsers(function(res) {
                
                if (res) {
                    self.resArr = res;
                    self.resArr.forEach(function(val) {

                        if ( val.user.dtZgonu !== undefined && self.createYear(val.user.dtZgonu) === self.theYear ) {
                            self.docs.push(val);
                        }
                    })
                    if (self.docs.length > 0) {
                        self.noData = false
                    }
                    document.forms[0].reset()
                } else {
                    console.log('false: ' + res);
                }
            });
        },

        fullName: function(imie, nazwisko) {
            if ( imie !== undefined && nazwisko !== undefined ) {
                return imie + ' ' + nazwisko
            } else {
                return "-"
            }
        },

        createYear: function(dt) {
            return dateformat(dt, "yyyy");
        },

        convertDate: function(dt) {
            return dateformat(dt, "yyyy-mm-dd");
        },

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

.alert-info {
    color: crimson;
    height: 38px;
    padding: 6px 10px;
}

.print-box {
    height: 38px;
    padding: 6px 10px;
}
</style>