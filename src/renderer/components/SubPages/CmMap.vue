<template>
    <div>
        <div class="sub-menu u-full-width">
            <ul>
                <li class="menu-item addCursor" v-for="el in subMenu" :key="el" @click="createMap(el.split('|')[0])">{{ el.split('|')[1] }}</li>
            </ul>
        </div>
        <div v-show="activeCm !== ''" class="info-panel">
            <div class="row">
                
            <div class="eight columns stat-box">
                <h5>
                    Cmentarz: {{ activeCm }}
                    <span class="left-spacing">
                        <router-link class="edit" :to="'/editCmConfig/' + cmID">
                            <i class="far fa-edit addCursor"></i>
                        </router-link>
                    </span>
                </h5>
                <p>
                    Ilość grobów na cmentarzu: <strong>{{ allGraves }}</strong> <br>
                    Ilość grobów opłaconych na cmantarzu: <strong>{{ allPaidGraves }}</strong> <br>
                    Ilość grobów nie opłaconych na cmantarzu: <strong>{{ allNotPaidGraves }}</strong> <br>
                    Ilość grobów pustych na cmantarzu: <strong>{{ allEmptyGraves }}</strong>
                </p>
            </div>
            <div class="four columns stat-box">
                <h5>Legenda:</h5>
                <div class="u-full-width stat-box">
                    <div class="row legenda">
                        <span class="l-box bgGreen"></span><span class="l-opis"> Opłacone</span>
                    </div>
                </div>
                <div class="u-full-width stat-box">
                    <div class="row legenda">
                        <span class="l-box bgRed"></span><span class="l-opis"> Nie opłacone</span>
                    </div>
                </div>
                <div class="u-full-width stat-box">
                    <div class="row legenda">
                        <span class="l-box bgYellow"></span><span class="l-opis"> Puste</span>
                    </div>
                </div>
            </div>
            </div>            
        </div>
        <div  v-show="activeCm !== ''" class="cm-box">
            <div class="cmentarz">
                <div class="rzad" v-for="r in cmRzedy" :key="r.rzad">
                    <div class="cm-row">Rząd: <span>{{ r.rzad }}</span> </div>
                    <div class="grob" v-for="g in cmData" v-if="g.rzad==r.rzad" :key="g.nrGrobu">
                        <router-link class="grave-link" :to="'/showGrave/' + g.nrGrobu">
                            <span v-bind:class="[g.status=='Opłacony' ? 'bgGreen' : g.status=='Puste' ? 'bgYellow' : 'bgRed']">{{ g.grob }}</span>
                        </router-link>
                    </div>
                </div>
                <div class="entrance" v-bind:class="addEntrance">
                     Wejście<span class="entrance-mark"></span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

import { graves } from '../../server/CRUD/parcela'
import { graveyeards } from '../../server/CRUD/cm'
import _ from 'lodash'

export default {
    data() {
        return {
            docs: [],
            subMenu: [],
            cmData: [],
            cmRzedy: [],
            cmArr: [],
            cmID: '',
            activeCm: '',
            allGraves: 0,
            allEmptyGraves: 0,
            allPaidGraves: 0,
            allNotPaidGraves: 0,
            addEntrance: '',

        }
    },
    created() {
        this.getCmData()
        this.fetchGraves()

        console.log('path: ' +  this.$route.path)
    },
    methods: {
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
        fetchGraves: function() {
            this.getData()
        },

        getData: function() {
            let self = this;
            graves.theParcela(function(res) {
                if (res) {
                    self.docs = res;
                    //Sub menu---------------------------------------------------
                    let t = []
                    res.forEach(item => {

                        let parcela = item.parcela.parcela
                        for (let i = 0; i < self.cmArr.length; i++) {
                            if ( self.cmArr[i].thecm.cName === parcela ) {
                                t.push(parcela + '|' + self.cmArr[i].thecm.cmFullName)
                            }
                        }
                    });
                    self.subMenu = _.orderBy(_.uniqBy(t, t.parcela), t.parcela)
                    //-----------------------------------------------------------

                } else {
                    console.log('false: ' + res);
                }
            });
        },
        markEntrance: function(cm) {
            let self = this
            let ent = ''
            for (let i = 0; i < self.cmArr.length; i++) {
                if ( self.cmArr[i].thecm.cName === cm ) {
                    ent = self.cmArr[i].thecm.wejscie
                }
            }
            if ( ent === 'wejscieLeft') {
                self.addEntrance = 'entrance-left'
            } else if ( ent === 'wejscieRight' ) {
                self.addEntrance = 'entrance-right'
            }
        },
        createMap: function(cm) {
            let self = this
            let theCm = null
            for (let i = 0; i < self.cmArr.length; i++) {
                if ( self.cmArr[i].thecm.cName === cm ) {
                    theCm = self.cmArr[i].thecm
                    self.cmID = self.cmArr[i]._id
                }
            }

            //Wejście---------------------------------------------
            self.markEntrance(cm)

            //Wybrany cmentarz------------------------------------
            let cmD = []
            let cmEmpty = []
            let cmPaid = []
            let cmNotPaid = []
            self.docs.forEach(item => {
                if (item.parcela.parcela == cm ) {
                    cmD.push(item.parcela)
                    if (item.parcela.status === 'Opłacony') {
                        cmPaid.push(item.parcela.nrGrobu)
                    }
                    if (item.parcela.status === 'Nie opłacony') {
                        cmNotPaid.push(item.parcela.nrGrobu)
                    }
                    if (item.parcela.status === 'Puste') {
                        cmEmpty.push(item.parcela.nrGrobu)
                    }
                }
            })
            self.cmData = _.orderBy(cmD, 'grob')   
            //console.log('cmData: ' + JSON.stringify(self.cmData))
            if ( theCm.grob === 'grobRightBottom' || theCm.grob === 'grobRightTop' ) {
                self.cmData.reverse()
            }
            //----------------------------------------------------

            //Unikalne rzedy + ich ilosc--------------------------
            self.cmRzedy = _.orderBy(_.uniqBy(self.cmData, 'rzad'), 'rzad')
            //console.log('cmRzedy: ' + JSON.stringify(self.cmRzedy))
            if ( theCm.rzad === 'rzadBottom' ) {
                self.cmRzedy.reverse()
            }
            //----------------------------------------------------

            //Statystyki------------------------------------------
            self.activeCm = theCm.cmFullName
            self.allGraves = _.size(self.cmData)
            //console.log('allGraves: ' + self.allGraves)
            self.allEmptyGraves = _.size(cmEmpty)
            //console.log('allEmptyGraves: ' + self.allEmptyGraves)
            self.allPaidGraves = _.size(cmPaid)
            self.allNotPaidGraves = _.size(cmNotPaid)
            
        },

    },
    
}

</script>

<style scoped>



div {
    text-align: center;
}

.entrance {
    margin: 15px;
    margin-left: 80px;
    text-align: left;
}
.entrance-mark{
    display: block;
    border-radius: 50%;
    background: red;
    width: 10px;
    height: 10px;
}

.entrance-left {
    float: left;
}

.entrance-right {
    float: right;
}

.cm-row {
    text-align: left;
    margin: 6px;
    float: left;
}
.cm-row span{
    border-right: 1px solid #c2c0c0;
    font-style: bold;
    padding: 5px;
}

.bgGreen {
    background: #4CAF50;
}

.bgYellow {
    background: #FFEE58;
}

.bgRed {
    background: #c53421;
}

.stat-box {
    text-align: left;
}

.legenda {
    line-height: 25px;
    text-align: left;
}

.l-box {
   
    display: inline-block;
    width: 20px;
    height: 25px;
    line-height: 10px;
}

.l-opis {
    display: inline-block;
    height: 25px;
    line-height: 10px;
    margin-left: 3%;
    vertical-align: middle;
}


.grave-link {
    color: #0f0f0f;
}
.grave-link:hover {
    color: #85d7f0;
    font-weight: bold;
}

.cm-box {
    margin-top: 20px;
    
}

.cmentarz {
    padding: 5px;
    border: 1px solid #ECE9E6
    
}

.rzad {
    background: #f9f9f9;
    

    margin-bottom: 10px;
    text-align: left;
    padding-left: 10px;
    position: relative;

}

.grob {
    display: inline-block;

}
.grob span {
    position: relative;
    width: 20px;
    height: 25px;
    margin: 5px;
    display: inline-block;
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

.sub-menu {
    background: #ECE9E6;
    margin-bottom: 10px;
}
.sub-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.menu-item {
    display: inline-block;
    border-bottom: 2px solid #cccccc;
    padding: 0.5em 1.5em;
    margin: 0;
    margin-right: 2px;
}

.menu-item:hover {
    border-bottom: 2px solid #0FA0CE;
}

.menu-item:last-child {
    margin-right: 0;
}

.sub-menu, .sub-menu a {
    color: #212121;
}

.sub-menu ul li:hover, .sub-menu ul li a:hover {
    color: rgb(101, 196, 240);
}

.sub-menu ul li a {
    text-decoration: none;
}

.info-panel {
    background: #ECE9E6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    text-align: left;
    padding: 10px;
}

.info-panel h4 {
    margin: 0;
}


</style>

