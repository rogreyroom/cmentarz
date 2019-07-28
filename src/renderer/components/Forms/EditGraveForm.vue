<template>
    <div>
        <h4>Edytuj grób:
            <strong class="left-spacing">{{ grave.nrGrobu }}</strong> ( {{ theParcela }} )
        </h4>
        <hr>
        <form>
            <div class="row">
                <div class="six columns">
                    <div class="row">
                        <p>
                            <strong>Parcela:</strong> {{ theParcela }}</p>
                    </div>
                    <div class="row">
                        <p>
                            <strong>Rząd:</strong> {{ grave.rzad }}</p>
                    </div>
                    <div class="row">
                        <p>
                            <strong>Numer grobu:</strong> {{ grave.grob }}</p>
                    </div>
                </div>

                <div class="six columns">
                    <div class="row">
                        <label for="rodzaj">Rodzaj grobu</label>
                        <select v-model="graveData.rodzaj" class="u-full-width" name="status">
                            <option disabled value="">Wybierz</option>
                            <option value="Zwykły">Zwykły</option>
                            <option value="Murowany">Murowany</option>
                            <option value="Rodzinny">Rodzinny</option>
                            <option value="Katakumba">Katakumba</option>
                        </select>
                    </div>
                    <div class="row">
                        <label for="uwagiG">Uwagi</label>
                        <textarea v-model="graveData.uwagi" class="u-full-width" placeholder="..." name="uwagiG"></textarea>
                    </div>
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
                        <label for="image">Zdjęcie</label>
                        <button v-on:click.prevent="photoLoader()" class="button">{{ (grave.grob !== '') ? 'Zmień zdjęcie' : 'Dodaj zdjęcie' }}</button>
                        <input id="zdjecie" @change="previewImage" accept="image/*" type="file" style="display:none;" />
                </div>
                <div class="six columns" v-if="imageData.length > 0">
                    <label for="image" style="visibility: hidden;">Obraz</label>
                    <div class="img-box" id="imgPreview">
                        <img :src="imageData">
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

            <div class="row">
                <div class="center">
                    <button class="button-primary" v-on:click.prevent="updateGraveData()">Zmień</button>
                </div>
            </div>
        </form>
        <hr>

        <div class="row">
            <h5>Dane osoby zmarłej
                <span class="left-spacing add">
                    <router-link :to="'addUser/' + grave.nrGrobu">
                        <i class="far fa-plus-square addCursor"></i>
                    </router-link>
                </span>
            </h5>
        </div>

        <div v-show="isUser">
            <div v-for="person in users" :key="person._id">

                <div class="user-box">

                    <div class="row">
                        <h5 class="left-spacing">
                            <router-link class="edit" :to="'/editUser/' + person._id">
                                <i class="far fa-edit addCursor"></i>
                            </router-link>
                            <span class="left-spacing link del" @click="delUser(person._id)">
                                <i class="far fa-trash-alt addCursor"></i>
                            </span>
                        </h5>
                    </div>

                    <div class="row">
                        <div class="six columns">
                            <div class="row">
                                <p>
                                    <strong>Imię:</strong> {{ person.user.imie }}</p>
                            </div>
                            <div class="row">
                                <p>
                                    <strong>Nazwisko:</strong> {{ person.user.nazwisko }}</p>
                            </div>
                            <div class="row">
                                <p>
                                    <strong>Wiek:</strong> {{ person.user.wiek }}</p>
                            </div>
                            <div class="row">
                                <p>
                                    <strong>Stan cywilny:</strong> {{ person.user.stanCywilny }}</p>
                            </div>
                            <hr class="no-marg">
                            <div class="row">
                                <p>
                                    <strong>Ojciec:</strong> {{ person.user.imieOjca }} {{ person.user.nazwiskoOjca }}</p>
                            </div>
                            <div class="row">
                                <p>
                                    <strong>Nazwisko ojca:</strong>
                                </p>
                            </div>
                            <div class="row">
                                <p>
                                    <strong>Matka:</strong> {{ person.user.imieMatki }} {{ person.user.nazwiskoMatki }}</p>
                            </div>
                        </div>

                        <div class="six columns">
                            <div class="row">
                                <p>
                                    <strong>Data urodzenia:</strong> {{ person.user.dtUrodzenia ? convertDate(person.user.dtUrodzenia) : '' }}</p>
                            </div>
                            <div class="row">
                                <p>
                                    <strong>Miejsce urodzenia:</strong> {{ person.user.miejsceUrodzenia }}</p>
                            </div>
                            <hr class="no-marg">
                            <div class="row">
                                <p>
                                    <strong>Data zgonu:</strong> {{ person.user.dtZgonu ? convertDate(person.user.dtZgonu) : '' }}</p>
                            </div>
                            <div class="row">
                                <p>
                                    <strong>Miejsce zgonu:</strong> {{ person.user.miejsceZgonu }}</p>
                            </div>
                            <hr class="no-marg">
                            <div class="row">
                                <p>
                                    <strong>Data pochówku:</strong> {{ person.user.dtPochowku ? convertDate(person.user.dtPochowku) : '' }}</p>
                            </div>
                            <div class="row">
                                <p>
                                    <strong>Miejsce pochówku:</strong> {{ person.user.miejscePochowku }}</p>
                            </div>
                        </div>

                    </div>

                </div>
                <hr>

            </div>
        </div>

    </div>
</template>

<script>

import path from 'path'
import V_Pikaday from '../../directives/pikaday'
import dateformat from 'dateformat'
import { graves } from '../../server/CRUD/parcela'
import { takers } from '../../server/CRUD/opiekun'
import { users } from '../../server/CRUD/user'
import { graveyeards } from '../../server/CRUD/cm'

export default {
    name: 'grave-form-edit',
    data: function() {
        return {
            gID: this.$route.params.id,
            grave: {},
            users: [],
            taker: {},
            cmArr: [],
            theParcela: '',
            imageData: '',
            imagePath: '',
            imgIs: false,
            isUser: false,
            graveData: {
                rodzaj: '',
                status: '',
                okres: '',
                dtOplaty: '',
                ext: '',
                uwagi: ''
            },
            takerData: {
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
        this.getCmData()
        this.fetchData(this.gID);
    },
    methods: {
        convertDate: function(dt) {
            return dateformat(dt, "yyyy-mm-dd");
        },
        fetchData: function(id) {

            let self = this;
            graves.viewParcela(id, function(res, imgPath) {
                if (res) {
                    let parcela = res.parcela.parcela
                    for (let i = 0; i < self.cmArr.length; i++) {

                        if ( self.cmArr[i].thecm.cName === parcela ) {

                            self.theParcela = self.cmArr[i].thecm.cmFullName
                        }
                    }

                    self.grave = res.parcela;
                    self.imgSrc = imgPath;
                    if (res.parcela.ext !== undefined) {
                        self.imgIs = true
                        let fileArr = self.grave.nrGrobu.split('|')
                        let fileName = fileArr[0] + '-' + fileArr[1] + '-' + fileArr[2]
                        let theFile = fileName + '.' + self.grave.ext
                        self.imageData = path.join(__dirname, '../../server/db/images/', theFile)
                    }

                    self.graveData.rodzaj = self.grave.rodzaj
                    self.graveData.status = self.grave.status
                    self.graveData.okres = self.grave.okres
                    self.graveData.uwagi = self.grave.uwagi
                    self.graveData.dtOplaty = self.grave.dtOplaty ? self.convertDate(self.grave.dtOplaty) : ''

                } else {
                    console.log('false: ' + res);
                }
            });

            this.getUserData(id)
            takers.viewTaker(id, function(res) {
                if (res) {
                    self.taker = res.taker;
                    if (res.taker !== null) {
                        self.isTaker = true
                    }

                    self.takerData.imie = self.taker.imie
                    self.takerData.nazwisko = self.taker.nazwisko
                    self.takerData.adres = self.taker.adres
                    self.takerData.tel = self.taker.tel
                    self.takerData.email = self.taker.email
                    self.takerData.uwagi = self.taker.uwagi

                } else {
                    console.log('false: ' + res);
                }
            })
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
        getUserData: function(id) {
            let self = this;
            users.viewAllUsers(id, function(res) {
                if (res) {
                    self.users = res;
                    if (res.length > 0) {
                        self.isUser = true
                    }

                } else {
                    console.log('false: ' + res);
                }
            });

        },
        delUser: function(id) {
            users.removeUser(id);
        },
        updateGraveData: function() {
            graves.editParcela(this.graveData, this.gID, this.imagePath);
            takers.editTaker(this.takerData, this.gID)
            document.forms[0].reset()
            //this.$router.push({ path: `showGrave/${this.gID}` })
        },
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
    },

    watch: {
        users: {
            handler: function(val, oldVal) {
                if (val !== oldVal) {
                    this.getUserData(this.gID);
                }
            }
        }
    },
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

.left-spacing {
    margin-left: 10px;
}
</style>
