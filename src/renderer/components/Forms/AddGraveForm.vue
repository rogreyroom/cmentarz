<template>
    <div>
        <h5>Dane grobu</h5>
        <form>
            <div class="row">
                <div class="three columns">
                    <label for="parcela">Parcela</label>
                    <select v-model="graveData.parcela" class="u-full-width" name="parcela">
                        <option disabled value="">Wybierz</option>
                        <option v-for="cm in this.cmArr"  v-bind:value="cm.thecm.cName" :key="cm._id">{{ cm.thecm.cmFullName }}</option>
                    </select>

                </div>
                <div class="three columns">
                    <label for="rzad">Rząd</label>
                    <input v-model="graveData.rzad" class="u-full-width" placeholder="2" name="rzad" type="text" required>
                </div>
                <div class="three columns">
                    <label for="grob">Numer grobu</label>
                    <input v-model="graveData.grob" class="u-full-width" placeholder="12" name="grob" type="text" required>
                </div>
                <div class="three columns">
                    <label for="rodzaj">Rodzaj grobu</label>
                    <select v-model="graveData.rodzaj" class="u-full-width" name="rodzaj">
                        <option disabled value="">Wybierz</option>
                        <option value="Zwykły">Zwykły</option>
                        <option value="Murowany">Murowany</option>
                        <option value="Rodzinny">Rodzinny</option>
                        <option value="Katakumba">Katakumba</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="four columns">
                    <label for="status">Status opłaty</label>
                    <select v-model="graveData.status" class="u-full-width" name="status">
                        <option disabled value="">Wybierz</option>
                        <option value="Nie opłacony">Nie opłacony</option>
                        <option value="Opłacony">Opłacony</option>
                        <option value="Puste">Puste</option>
                    </select>
                </div>
                <div class="four columns">
                    <label for="okres">Okres opłaty</label>
                    <input v-model="graveData.okres" class="u-full-width" placeholder="5" name="okres" type="text">
                </div>
                <div class="four columns">
                    <label for="dtOplaty">Data opłaty</label>
                    <input v-model="graveData.dtOplaty" v-pikaday class="u-full-width" name="dtOplaty" type="text">
                </div>
            </div>
            <div class="row">
                <div class="six columns">
                    <div class="row">
                        <label for="image">Zdjęcie</label>
                        <button v-on:click.prevent="photoLoader()" class="button">Dodaj zdjęcie</button>
                        <input id="zdjecie" @change="previewImage" accept="image/*" type="file" style="display:none;" />
                    </div>
                    <div class="row" v-if="imageData.length > 0">
                        <label for="image" style="visibility: hidden;">Obraz</label>
                        <div class="img-box" id="imgPreview">
                            <img :src="imageData">
                        </div>
                    </div>
                </div>
                <div class="six columns">
                    <div class="row">
                        <label for="uwagiG">Uwagi</label>
                        <textarea v-model="graveData.uwagi" class="u-full-width" placeholder="..." name="uwagiG"></textarea>
                    </div>
                </div>    
            </div>

            <hr>
            <h5>Dane opiekuna grobu</h5>
            <div class="row">
                <div class="four columns">
                    <label for="imie">Imię</label>
                    <input v-model="takerData.imie" class="u-full-width" placeholder="Jan" name="imie" type="text">
                </div>
                <div class="four columns">
                    <label for="nazwisko">Nazwisko</label>
                    <input v-model="takerData.nazwisko" class="u-full-width" placeholder="Kowalski" name="nazwisko" type="text">
                </div>
                <div class="four columns">
                    <label for="adres">Adres</label>
                    <textarea v-model="takerData.adres" class="u-full-width" placeholder="ul. Kościelna 1/1, Owsiszcze" name="adres"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="four columns">
                    <label for="tel">Telefon</label>
                    <input v-model="takerData.tel" class="u-full-width" placeholder="600 700 800" name="tel" type="text">
                </div>
                <div class="four columns">
                    <label for="email">Email</label>
                    <input v-model="takerData.email" class="u-full-width" placeholder="jan@kowalski.pl" name="email" type="email">
                </div>
                <div class="four columns">
                    <label for="uwagi">Uwagi dodatkowe</label>
                    <textarea v-model="takerData.uwagi" class="u-full-width" placeholder="..." name="uwagi"></textarea>
                </div>
            </div>

            <hr>
            <h5>Dane osoby zmarłej</h5>
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
                    <button class="button-primary" v-on:click.prevent="addGraveData()">Dodaj</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

import V_Pikaday from '../../directives/pikaday'
import dateformat from 'dateformat'
import { graves } from '../../server/CRUD/parcela'
import { users } from '../../server/CRUD/user'
import { takers } from '../../server/CRUD/opiekun'
import { graveyeards } from '../../server/CRUD/cm'

export default {
    name: 'add-grave-form',
    data() {
        return {
            imageData: '',
            imagePath: '',
            cmArr: [],
            graveData: {
                nrGrobu: '',
                parcela: '',
                rzad: '',
                grob: '',
                rodzaj: '',
                status: 'Puste',
                okres: '',
                dtOplaty: '',
                dtZaplaty: '',
                ext: '',
                uwagi: ''
            },
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
            takerData: {
                nrGrobu: '',
                imie: '',
                nazwisko: '',
                adres: '',
                tel: '',
                email: '',
                uwagi: ''
            }
        }
    },
    directives: {
        'pikaday': V_Pikaday
    },
    created() {
        this.getCmData();
    },
    methods: {
        photoLoader: function(event) {
            let zdjecie = document.getElementById('zdjecie').click();
        },
        previewImage: function(event) {
            // Reference to the DOM input element
            let input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                let reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.imageData = e.target.result;
                    this.imagePath = input.files[0].path;
                    let fullName = this.imagePath.replace(/^.*[\\\/]/, '');
                    this.graveData.ext = fullName.split('.')[1];

                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
        },
        makeNumber: function() {
            return 'P' + this.graveData.parcela + '|R' + this.graveData.rzad + '|G' + this.graveData.grob;
        },
        yearDate: function(dt) {
            return dateformat(dt, "yyyy");
        },
        getDate: function (data, okres) {
            if ( data !== undefined && okres !== undefined ) {
                let rok = Number(dateformat(data, "yyyy")) + Number(okres)
                this.graveData.dtZaplaty = dateformat(new Date(rok, dateformat(data, "mm"), dateformat(data, "dd")), "yyyy-mm-dd")
            }
        },
        getCmData: function() {
            let self = this;
            graveyeards.viewAll(function(res) {
                if (res) {
                    self.cmArr=res

                } else {
                    console.log('false: ' + res);
                }
            })
        },
        addGraveData: function() {
            this.graveData.nrGrobu = this.makeNumber();
            this.userData.nrGrobu = this.graveData.nrGrobu;
            if (this.userData.dtUrodzenia !== '' && this.userData.dtZgonu !== '') {
                this.userData.wiek = this.yearDate(this.userData.dtZgonu) - this.yearDate(this.userData.dtUrodzenia)
            }
            this.getDate(this.graveData.dtOplaty, this.graveData.okres)
            this.takerData.nrGrobu = this.graveData.nrGrobu;

            graves.addParcela(this.graveData, this.graveData.nrGrobu, this.imagePath);
            users.addUser(this.userData)
            takers.addTaker(this.takerData)
            document.forms[0].reset()
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