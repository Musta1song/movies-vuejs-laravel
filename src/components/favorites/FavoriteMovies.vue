<template>
    <h1>Meine Lieblingsfilme</h1>
    <div class="flex">
        <div class="div" v-if="this.data.length > 0"> <v-table theme="" id="v-table">

                <tbody>
                    <tr v-for="x in data " :key="x">
                        <td><img :src="x.Poster" alt=""></td>
                        <td>{{ x.Title }}</td>
                        <td>{{ x.Year }}</td>
                        <v-btn v-on:click="removeFromFavorites(x.imdbID)" class="deleteBt" id="deleteBt">
                            <svg-icon type="mdi" :path="path"></svg-icon>
                        </v-btn>
                    </tr>
                </tbody>
            </v-table>
        </div>
        <div class="v-else" v-else>
            <h3>Noch keine Lieblingsfilme😔 </h3>
        </div>


        <div v-if="this.data.length > 0">
            <v-btn class="editbt" v-on:click="edit()"> <svg-icon type="mdi" :path="path2"></svg-icon>
            </v-btn>
        </div>
    </div>

</template>
<script>
import DataService from '@/DataService';
import axios from 'axios';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose } from '@mdi/js';
import { mdiPencil } from '@mdi/js';

import translate from "translate";
export default {
    name: "FavoriteMovies",

    data() {
        return {
            data: [],
            MovieList: [],
            isLoading: false,
            err: "",
            path: mdiClose,
            path2: mdiPencil,



        };
    },
    components: {
        SvgIcon
    },

    methods: {
        async translateToGerman(toTranslate, imdbID) {

            translate.engine = "google";


            let text = await translate(toTranslate, "de")
            console.log(text)
            document.getElementById(imdbID).innerHTML = text

        },
        getFavoriteMovies() {
            DataService.getAll()
                .then(response => {
                    this.MovieList = response.data
                    console.log(this.MovieList)
                    this.MovieList = JSON.parse(JSON.stringify(this.MovieList))
                    console.log(this.MovieList)
                    this.fetchData()


                })
                .catch(e => {
                    console.log(e);
                });


        },
        edit() {
            for (let i = 0; i < this.data.length; i++) {

                const deleteBt = document.querySelectorAll("[id='deleteBt']")
                for (let i = 0; i < deleteBt.length; i++) {

                    deleteBt[i].style.visibility = "visible"
                }
            }


        },
        removeFromFavorites(imdbID) {
            for (let i = 0; i < this.MovieList.length; i++) {
                if (this.MovieList[i].imdbID == imdbID) {
                    let id = this.MovieList[i].id
                    DataService.remove(id)
                        .then(response => {
                            console.log(response)
                            alert("Film aus Favoriten entfernt!")
                            window.location.reload()

                        })
                        .catch(e => {
                            console.log(e);
                        });


                }
            }

        },
        fetchData() {
            console.log("fetchData-init")

            for (let i = 0; i < this.MovieList.length; i++) {
                const url = `https://www.omdbapi.com/?apikey=385748cd&i=${this.MovieList[i].imdbID}`;


                console.log("fetchData-loop")



                axios.get(url).then(
                    response => {
                        this.data.push(response.data)
                    }
                )



            }
            console.log(this.data)

        }
    },
    mounted() {
        console.log("halo")
        this.getFavoriteMovies();
    }


}

</script>
<style scoped>
.v-else {
    display: flex;
    margin-top: 200px;

}
.v-table{
    margin-top: 20px;
}

h1 {
    margin-top: 20px;
    color: rgb(152, 144, 144);

}

img {
    max-height: 130px;
}

td {
    max-width: 100px;
}

h3 {
    margin-top: 10px;
    margin-right: 10px;
}

#deleteIcon {
    color: rgb(220, 107, 107);

}

thead {
    background-color: rgb(255, 247, 247)
}

th {
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 10px;
    background-color: rgb(244, 207, 207);

}

.deleteBt {
    background-color: rgb(246, 107, 107);
    margin-top: 50px;
    margin-left: 10px;
    min-width: 0;
    visibility: hidden;
    width: 50px;
    zoom: 0.8;
}

div {
    display: flex;
    justify-content: center;
}

.editbt {
    background-color: rgb(224, 236, 242);
    width: 55px;
    min-width: 0;
    
}
</style>