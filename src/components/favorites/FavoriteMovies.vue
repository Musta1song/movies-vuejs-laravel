<template>
    <h1>Meine Lieblingsfilme</h1>

    <div class="div" v-if="this.data.length > 0"> <v-table theme="">
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
                    <v-btn v-on:click="removeFromFavorites(x.imdbID)" class="deleteBt">
                        <h3>X</h3>


                    </v-btn>
                </tr>
            </tbody>
        </v-table>
    </div>
    <div class="v-else" v-else>
        <h3>Noch keine Lieblingsfilme😔 </h3>
    </div>




</template>
<script>
import DataService from '@/DataService';
import axios from 'axios';
import { mdiDelete } from '@mdi/js';

import translate from "translate";
export default {
    name: "FavoriteMovies",
    components: {

    },


    data() {
        return {
            data: [],
            MovieList: [],
            isLoading: false,
            err: "",
            path: mdiDelete

        };
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

h1{
    margin-top: 20px;    color: rgb(152, 144, 144);

}
img {
    max-height: 130px;
}

td {
    border-left: 1px solid rgb(203, 199, 199);
    max-width: 100px;
}

h3 {
    margin-top: 10px;
    margin-right: 10px;
}

td {
    background-color: rgb(177, 212, 212);
    border-bottom: 1px solid rgb(203, 199, 199);

}

.v-table {
    min-width: 70%;
}

#deleteIcon {
    color: rgb(220, 107, 107);
}

tbody {}

thead {
    background-color: rgb(217, 223, 223)
}

th {
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 10px;
    border-bottom: 1px solid rgb(203, 199, 199);
}

.deleteBt {
    background-color: rgb(255, 255, 255);
    min-width: 0px;
    width: 50px;
    margin-left: 10px;
    height: 40px;
    margin-top: 50px;

}

.deleteBt:hover {
    background-color: rgb(215, 84, 84);

}

.lasttd {
    border-right: 1px solid rgb(203, 199, 199)
}

div {
    display: flex;
    justify-content: center;
}
</style>