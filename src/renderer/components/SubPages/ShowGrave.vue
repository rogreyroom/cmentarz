<template>
    <div>
        <h5>Dane grobu:
            <strong class="left-spacing">{{ gID }}</strong>
            <span class="left-spacing">
                <router-link class="edit" :to="'editGrave/' + grave.nrGrobu">
                    <i class="far fa-edit addCursor"></i>
                </router-link>
            </span>
        </h5>
        <hr>
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
                    <p>
                        <strong>Rodzaj grobu:</strong> {{ grave.rodzaj }}</p>
                </div>
                <div class="row">
                    <p>
                        <strong>Status opłaty:</strong> {{ grave.status }}</p>
                </div>
                <div class="row">
                    <p>
                        <strong>Okres opłaty:</strong> {{ grave.okres }}</p>
                </div>
                <div class="row">
                    <p>
                        <strong>Data opłaty:</strong> {{ grave.dtOplaty ? convertDate(grave.dtOplaty) : '' }}</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="six columns">
                <div class="row">
                    <div class="twelve columns">
                        <p>
                            <strong>Obraz</strong>
                        </p>
                        <div class="img-box" id="imgPreview" v-if="imgIs">
                            <img :src="imageData">
                        </div>
                    </div>
                </div>
            </div>
            <div class="six columns">
                <div class="row">
                    <p>
                        <strong>Uwagi:</strong>
                    </p>
                    <p>{{ grave.uwagi }}</p>
                    
                </div>
            </div>

        </div>
        

        <hr>
        <div class="row">
            <h5>Dane opiekuna grobu
                <span class="left-spacing edit">
                    <router-link :to="'editGrave/' + grave.nrGrobu">
                        <i class="far fa-edit addCursor"></i>
                    </router-link>
                </span>
            </h5>
        </div>

        <div v-show="isTaker">

            <div class="row">

                <div class="six columns">
                    <div class="row">
                        <p>
                            <strong>Imię:</strong> {{ taker.imie }}</p>
                    </div>
                    <div class="row">
                        <p>
                            <strong>Nazwisko:</strong> {{ taker.nazwisko }}</p>
                    </div>
                    <div class="row">
                        <p>
                            <strong>Telefon:</strong> {{ taker.tel }}</p>
                    </div>
                    <div class="row">
                        <p>
                            <strong>Email:</strong> {{ taker.email }}</p>
                    </div>
                </div>

                <div class="six columns">
                    <div class="row">
                        <p>
                            <strong>Adres:</strong> {{ taker.adres }}</p>
                    </div>
                    <div class="row">
                        <p>
                            <strong>Uwagi dodatkowe:</strong> {{ taker.uwagi }}</p>
                    </div>
                </div>

            </div>

        </div>

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
                            <router-link class="edit" :to="'editUser/' + person._id">
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
                                    <strong>Nazwisko:</strong>{{ person.user.nazwisko }}</p>
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
                                    <strong>Data pochówku:</strong> {{person.user.dtPochowku ? convertDate(person.user.dtPochowku) : '' }}</p>
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
import path from "path";
import dateformat from "dateformat";
import { graves } from "../../server/CRUD/parcela";
import { users } from "../../server/CRUD/user";
import { takers } from "../../server/CRUD/opiekun";
import { graveyeards } from '../../server/CRUD/cm'

export default {
  data() {
    return {
      gID: this.$route.params.id,
      grave: {},
      users: [],
      taker: {},
      cmArr: [],
      theParcela: '',
      imgSrc: "",
      headerShow: false,
      isUser: false,
      isTaker: false,
      imgIs: false,
      imageData: ""
    };
  },
  created() {
    this.getCmData()
    this.fetchData(this.gID);
  },

  methods: {
    fetchData: function(id) {
      let self = this;

      this.getGraveData(id);

      this.getUserData(id);

      takers.viewTaker(id, function(res) {
        if (res) {
          self.taker = res.taker;
          if (res.taker !== null) {
            self.isTaker = true;
          }
        } else {
          console.log("false: " + res);
        }
      });
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
    getGraveData: function(id) {
      let self = this;
      graves.viewParcela(id, function(res, imgPath) {
        if (res) {
          self.grave = res.parcela;

            let parcela = res.parcela.parcela
            for (let i = 0; i < self.cmArr.length; i++) {

                if ( self.cmArr[i].thecm.cName === parcela ) {

                    self.theParcela = self.cmArr[i].thecm.cmFullName
                }
            }

          self.imgSrc = imgPath;
          if (res.parcela.ext !== undefined) {
            self.imgIs = true;

            let fileArr = self.grave.nrGrobu.split("|");
            let fileName = fileArr[0] + "-" + fileArr[1] + "-" + fileArr[2];
            let theFile = fileName + "." + self.grave.ext;
            self.imageData = path.resolve(path.join(self.imgSrc, theFile));
          }
        } else {
          console.log("false: " + res);
        }
      });
    },

    getUserData: function(id) {
      let self = this;
      users.viewAllUsers(id, function(res) {
        if (res) {
          self.users = res;
          if (res.length > 0) {
            self.isUser = true;
          }
        } else {
          console.log("false: " + res);
        }
      });
    },
    delUser: function(id) {
      users.removeUser(id);
    },
    convertDate: function(dt) {
      return dateformat(dt, "yyyy-mm-dd");
    }
  },
  watch: {
    grave: {
      handler: function(val, oldVal) {
        if (val !== oldVal) {
          return this.getGraveData(this.gID);
        }
      }
    },

    users: {
      handler: function(val, oldVal) {
        if (val !== oldVal) {
          this.getUserData(this.gID);
        }
      }
    }
  }
};
</script>


<style>
p {
    word-wrap: break-word;
}

.img-box img {
  box-sizing: border-box;
  max-height: 200px;
  height: 200px;
  margin-top: 2%;
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.no-marg {
  margin: 0 0 25px 0;
  width: 80%;
}

.left-spacing {
  margin-left: 10px;
}

.user-box {
  background-color: #f2f2f2;
  padding: 20px;
}

.link {
  color: #1eaedb;
  cursor: pointer;
}

.link:hover {
  color: #0fa0ce;
}
</style>
