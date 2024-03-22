<template>
    <h1>Meine Lieblingsfilme</h1>

    <div>
        <table>
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
                <th> </th>

            </tr>
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
                <td class="lasttd"> <v-btn v-on:click="removeFromFavorites(x.imdbID)" class="deleteBt"> <svg-icon
                            type="mdi" :path="path"></svg-icon>


                    </v-btn>
                </td>
            </tr>
        </table>
    </div>


</template>
<script>
import DataService from '@/DataService';
import axios from 'axios';
import { mdiDelete } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';

import translate from "translate";
export default {
    name: "FavoriteMovies",
    components: {
        SvgIcon
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
img {
    max-height: 150px;
}

td {
    border-left: 1px solid rgb(203, 199, 199);
    max-width: 100px;
}

td {
    border-bottom: 1px solid rgb(125, 123, 123);

}

table {
    min-width: 70%;
}

th {
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 10px;
    border-bottom: 1px solid rgb(203, 199, 199);


}

.deleteBt {
    background-color: rgb(195, 103, 103);
}

.lasttd {
    border-right: 1px solid rgb(203, 199, 199);

}

div {
    display: flex;
    justify-content: center;
}
</style>