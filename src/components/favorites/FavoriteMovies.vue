<template>
    <h1>Meine Lieblingsfilme</h1>

    <div class="div" v-if="this.data.length > 0"> <v-table theme="" id="v-table">
            <thead>
                <tr>
                    <th>
                        Poster
                    </th>
                    <th>Title</th>
                    <th>Jahr</th>
                    <th>Laufzeit</th>
                    <th>Rating</th>
                    <th>Regisseur</th>
                    <th>Drehbuch</th>
                    <th>Schauspieler</th>
                    <th>Genre</th>
                    <th>Land</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="x in  data " :key="x">
                    <td><img :src="x.Poster" alt=""></td>
                    <td>{{ x.Title }}</td>
                    <td>{{ x.Year }}</td>
                    <td>{{ x.Runtime }}</td>
                    <td>{{ x.imdbRating }}</td>
                    <td>{{ x.Director }}</td>
                    <td>{{ x.Writer }}</td>
                    <td>{{ x.Actors }}</td>
                    <td>{{ x.Genre }}</td>
                    <td :id="x.imdbID">{{ translateToGerman(x.Country, x.imdbID) }}</td>
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


    <footer v-if="this.data.length > 0">
        <v-btn v-on:click="edit()"> <svg-icon type="mdi" :path="path2"></svg-icon>
        </v-btn>
    </footer>

</template>
<script>
import DataService from '@/DataService';
import axios from 'axios';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdilDelete } from '@mdi/light-js';
import { mdilPencil } from '@mdi/light-js';

import translate from "translate";
export default {
    name: "FavoriteMovies",

    data() {
        return {
            data: [],
            MovieList: [],
            isLoading: false,
            err: "",
            path: mdilDelete,
            path2: mdilPencil,



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

                const vtable = document.getElementById("v-table")
                const deleteBt = document.querySelectorAll("[id='deleteBt']")
                for (let i = 0; i < deleteBt.length; i++) {

                    deleteBt[i].style.visibility = "visible"
                }
                vtable.style.marginRight = "10px"
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

td {
    background-color: rgb(244, 207, 207);

}

.v-table {
    min-width: 70%;
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
}

.deleteBt {
    background-color: rgb(182, 111, 111);
    margin-top: 40px;
    margin-left: 10px;
    min-width: 0;
    visibility: hidden;
    width: 40px;
}

.deleteBt:hover {
    background-color: rgb(215, 84, 84);

}


div {
    display: flex;
    justify-content: center;
}
</style>