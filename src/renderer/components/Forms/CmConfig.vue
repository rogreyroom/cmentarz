<template>
  <div>
        <h4>Konfigurator cmentarza</h4>
        <hr>
        <form>
            <div class="row">

                <div class="five columns in-field">
                    <label for="cmName">Nazwa cmentarza/parceli</label>
                    <input v-model="cmData.cmFullName" class="u-full-width" placeholder="Cmentarz Stary" name="cmName" type="text" required>
                </div>

            </div>
            <div class="row">
                <p><strong>Wybierz położenie kluczowych elementów cmentarza</strong></p>

                <div class="three columns box">
                    <div class="row secret-row t-al-r">
                        1-szy rząd <input type="radio" v-model="cmData.rzad" name="rzad" value="rzadTop">
                    </div>
                    <div class="row opis"></div>
                    <div class="row secret-row t-al-r">
                        1-szy rząd <input type="radio" v-model="cmData.rzad" name="rzad" value="rzadBottom">
                    </div>
                </div>

                <div class="five columns box rama">

                    <div class="row secret-row">

                        <div v-if="cmData.rzad=='rzadTop'">
                            <div class="six columns t-al-l">
                                1-szy grób <input type="radio" v-model="cmData.grob" name="grob" value="grobLeftTop">
                            </div>
                            <div class="six columns t-al-r">
                                1-szy grób <input type="radio" v-model="cmData.grob" name="grob" value="grobRightTop">
                            </div>
                        </div>

                    </div>
                    
                    <div class="row opis"><strong>CMENTARZ</strong></div>

                    <div class="row secret-row">

                        <div v-if="cmData.rzad=='rzadBottom'">
                            <div class="six columns t-al-l">
                                1-szy grób <input type="radio" v-model="cmData.grob" name="grob" value="grobLeftBottom">
                            </div>
                            <div class="six columns t-al-r">
                                1-szy grób <input type="radio" v-model="cmData.grob" name="grob" value="grobRightBottom">
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <div class="row box">

                <div class="three columns t-al-r">
                    Wejście:
                </div>

                <div class="five columns">
                    <div class="six columns t-al-l">
                        po lewej <input type="radio" v-model="cmData.wejscie" name="wejscie" value="wejscieLeft">
                    </div>
                    <div class="six columns t-al-r">
                        po prawej <input type="radio" v-model="cmData.wejscie" name="wejscie" value="wejscieRight">
                    </div>
                </div>

            </div>

            <hr>
            <div class="row">
                <div class="center">
                    <button class="button-primary" v-on:click.prevent="addGraveYeard()">Dodaj</button>
                </div>
            </div>

        </form>

  </div>
</template>

<script>

import { graveyeards } from '../../server/CRUD/cm'
    
export default {
    data() {
        return {
            cmData: {
                cName: '',
                cmFullName: '',
                wejscie:'',
                rzad:'',
                grob:''
            }
        }
    },

    methods: {
        addGraveYeard: function() {
            self = this
            graveyeards.countData(function(res) {
                if (res >= 0) {

                    let newNumber = res + 1
                    self.cmData.cName = 'cm' + newNumber
                    if (self.cmData.cName !== '' &&
                        self.cmData.cmFullName !== '' && 
                        self.cmData.wejscie !== '' && 
                        self.cmData.rzad !== '' && 
                        self.cmData.grob !== '' ) {

                        graveyeards.addData(self.cmData)
                        document.forms[0].reset()

                    } else {
                        alert('Nie zaznaczono wszystkich opcji!')
                    }
                }
            })
        }
    }

}

</script>



<style scoped>

input[type="radio"] {
    margin: 0;
}
.in-field {
    margin-bottom: 8%;
}

.t-al-r {
    text-align: right;
}

.t-al-l {
    text-align: left;
}
.opis {
    min-height: 150px;
    line-height: 150px;
    text-align: center;
    vertical-align: middle;
}

.secret-row {
    height: 32px;
    line-height: 32px;
}
.box {
    padding: 10px;
}

.rama {
    border: 2px solid #252525;
}

</style>
