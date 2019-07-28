<template>
    <div>
        <h4>Dodaj osobę zmarłą: <i class="fas fa-arrow-right"></i> grób:
            <strong class="left-spacing">{{ gID }}</strong> ( {{ theParcela }} )
        </h4>
        <hr>
        <h5>Dane osoby zmarłej</h5>
        <form>
            <div class="row">
                <div class="six columns">
                    <label for="imie">Imię</label>
                    <input v-model="userData.imie" class="u-full-width" placeholder="Jan" name="imie" type="text">
                </div>
                <div class="six columns">
                    <label for="nazwisko">Nazwisko</label>
                    <input v-model="userData.nazwisko" class="u-full-width" placeholder="Kowalski" name="nazwisko" type="text">
                </div>
            </div>
            <div class="row">
                <div class="six columns">
                    <label for="dtUrodzenia">Data urodzenia</label>
                    <input v-model="userData.dtUrodzenia" v-pikaday class="u-full-width" name="dtUrodzenia" type="text">
                </div>
                <div class="six columns">
                    <label for="miejsceUrodzenia">Miejsce urodzenia</label>
                    <input v-model="userData.miejsceUrodzenia" class="u-full-width" name="miejsceUrodzenia" type="text">
                </div>
            </div>
            <div class="row">
                <div class="six columns">
                    <label for="nazwiskoRodowe">Nazwisko rodowe</label>
                    <input v-model="userData.nazwiskoRodowe" class="u-full-width" placeholder="Kowalski" name="nazwiskoRodowe" type="text">
                </div>
                <div class="six columns">
                    <label for="stanCywilny">Stan cywilny</label>
                    <select v-model="userData.stanCywilny" class="u-full-width" name="stanCywilny">
                        <option disabled value="">Wybierz</option>
                        <option value="Panna">Panna</option>
                        <option value="Kawaler">Kawaler</option>
                        <option value="Mężatka">Mężatka</option>
                        <option value="Żonaty">Żonaty</option>
                        <option value="Wdowa">Wdowa</option>
                        <option value="Wdowiec">Wdowiec</option>
                    </select>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="three columns">
                    <label for="dtZgonu">Data zgonu</label>
                    <input v-model="userData.dtZgonu" v-pikaday class="u-full-width" name="dtZgonu" type="text">
                </div>
                <div class="three columns">
                    <label for="miejsceZgonu">Miejsce zgonu</label>
                    <input v-model="userData.miejsceZgonu" class="u-full-width" name="miejsceZgonu" type="text">
                </div>
                <div class="three columns">
                    <label for="dtPochowku">Data pochówku</label>
                    <input v-model="userData.dtPochowku" v-pikaday class="u-full-width" name="dtPochowku" type="text">
                </div>
                <div class="three columns">
                    <label for="miejscePochowku">Miejsce pochówku</label>
                    <input v-model="userData.miejscePochowku" class="u-full-width" name="miejscePochowku" type="text">
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="three columns">
                    <label for="imieMatki">Imię matki</label>
                    <input v-model="userData.imieMatki" class="u-full-width" placeholder="Maria" name="imieMatki" type="text">
                </div>
                <div class="three columns">
                    <label for="nazwiskoMatki">Nazwisko matki</label>
                    <input v-model="userData.nazwiskoMatki" class="u-full-width" placeholder="Kowalski" name="nazwiskoMatki" type="text">
                </div>
                <div class="three columns">
                    <label for="imieOjca">Imię ojca</label>
                    <input v-model="userData.imieOjca" class="u-full-width" placeholder="Paweł" name="imieOjca" type="text">
                </div>
                <div class="three columns">
                    <label for="nazwiskoOjca">Nazwisko ojca</label>
                    <input v-model="userData.nazwiskoOjca" class="u-full-width" placeholder="Kowalski" name="nazwiskoOjca" type="text">
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="center">
                    <button class="button-primary" v-on:click.prevent="addUserData()">Dodaj</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

import V_Pikaday from '../../directives/pikaday'
import dateformat from 'dateformat'
import { users } from '../../server/CRUD/user'
import { graveyeards } from '../../server/CRUD/cm'

export default {
    name: 'grave-form-edit',
    data: function() {
        return {
            gID: this.$route.params.id,
            cmArr: [],
            theParcela: '',
            userData: {
                nrGrobu: '',
                imie: '',
                nazwisko: '',
                nazwiskoRodowe: '',
                wiek: '',
                stanCywilny: '',
                imieMatki: '',
                nazwiskoMatki: '',
                imieOjca: '',
                nazwiskoOjca: '',
                dtUrodzenia: '',
                miejsceUrodzenia: '',
                dtZgonu: '',
                miejsceZgonu: '',
                dtPochowku: '',
                miejscePochowku: ''
            },
        }
    },
    directives: {
        'pikaday': V_Pikaday
    },
    created() {
        this.getCmData()
    },
    methods: {
        yearDate: function(dt) {
            return dateformat(dt, "yyyy");
        },
        addUserData: function() {
            if (this.userData.dtUrodzenia !== '' && this.userData.dtZgonu !== '') {
                this.userData.wiek = this.yearDate(this.userData.dtZgonu) - this.yearDate(this.userData.dtUrodzenia)
            }
            this.userData.nrGrobu = this.gID
            users.addUser(this.userData)
            document.forms[0].reset()
            
        },
        getCmData: function() {
            let self = this;
            graveyeards.viewAll(function(res) {
                if (res) {
                    self.cmArr=res
                    self.getCmName()

                } else {
                    console.log('false: ' + res);
                }
            })
        },
        getCmName: function() {
            let self = this
            let fileArr = self.gID.split("|")
            let parcela = fileArr[0].substring(1)
            for (let i = 0; i < self.cmArr.length; i++) {
                if ( self.cmArr[i].thecm.cName === parcela ) {
                    self.theParcela = self.cmArr[i].thecm.cmFullName
                }
            }
        }
    }
}

</script>

<style>
.img-box img {
    box-sizing: border-box;
    max-height: 200px;
    height: 200px;
    margin-top: 2%;
    background-color: white;
    border: 1px solid #DDD;
    padding: 5px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>
