<template>
    <div class="text-field-container">
        <v-text-field label="Titel" variant="outlined" v-model="this.title"></v-text-field>
        <v-text-field label="Erscheinungsjahr" variant="outlined" v-model="this.year"></v-text-field>
    </div>
    <v-btn id="SearchBt" v-on:click="SearchMovies()">Suchen <svg-icon type="mdi" :path="path2"></svg-icon>
    </v-btn>
    <div class="table-div" id="table-div">
        <table>
            <tr>
                <th>
                    Poster
                </th>
                <th>Titel</th>
                <th>Erscheinungsjahr</th>
                <th>Zu Favoriten hinzufügen:</th>


            </tr>
            <tr v-for="x in data " :key="x">
                <td><img :src="x.Poster" alt=""></td>
                <td>{{ x.Title }}</td>
                <td>{{ x.Year }}</td>
                <td> <v-btn v-on:click="addToFavorites(x.imdbID)" :id="x.imdbID" class="FavoritesBt"><svg-icon
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
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHeart, mdiMagnify } from '@mdi/js';



export default {
    name: 'SearchMovies',

    components: {
        SvgIcon
    },
    data() {
        return {

            title: null,
            year: null,
            this: null,
            data: [],
            favoritemovie: null,
            isLoading: false,
            err: "",
            path: mdiHeart,
            path2: mdiMagnify,
            favoritemovies: []


        };
    },
    methods: {

        SearchMovies() {
            this.data.length = 0
            document.getElementById("table-div").style.visibility = "hidden"

            if (this.title == null && this.year == null) {
                alert("Geben Sie erst einen Titel oder ein Jahr ein.")
                return
            }
            else {

                let titleParam = ""
                let yearParam = ""
                let typeParam = "&type=movie"

                if (this.title != null) {
                    titleParam = `s=${this.title}`
                }
                if (this.year != null) {
                    yearParam = `&y=${this.year}`
                }
                let Searchthis = titleParam + yearParam + typeParam
                console.log(Searchthis)
                let url = `http://www.omdbapi.com/?apikey=385748cd&${Searchthis}&from=50&size=50`;
                console.log(url)

                this.fetchMovies(url)
            }
        },
        getFavoriteMovies() {
            DataService.getAll()
                .then(response => {
                    let fvmv = response.data
                    for (let i = 0; i < fvmv.length; i++) {
                        this.favoritemovies.push(fvmv[i])
                    }
                    console.log(this.favoritemovies)

                })
                .catch(e => {
                    console.log(e);
                });
        },



        fetchMovies(url) {
            axios.get(url).then(
                response => {
                    let dt = response.data.Search
                    if (dt != undefined) {
                        for (let i = 0; i < dt.length; i++) {
                            this.data.push(dt[i])
                        }
                    }
                    
                    if (this.data.length != 0) {
                        document.getElementById("table-div").style.visibility = "visible"
                        return
                    }
                    alert("Keine Ergebnisse!")

                }
            )
            console.log(this.data.length)
        },
        addToFavorites(ID) {
            console.log(ID)
            let MovieData = {
                imdbID: ID
            }
            for (let i = 0; i < this.favoritemovies.length; i++) {
                if (MovieData.imdbID == this.favoritemovies[i].imdbID) {
                    alert("Film ist bereits als Favorit markiert!")
                    return
                }
            }
            DataService.create(MovieData).then(response => {
                console.log(response.data);
                alert("Film wurde zu Favoriten hinzugefügt!")
                this.submitted = true;
            })
                .catch(e => {
                    console.log(e);
                });

        }


    },
    mounted() {
        this.getFavoriteMovies()
    }
}

</script>
<style scoped>
.table-div {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    visibility: hidden;
}

img {
    max-height: 150px;
}

table {
    width: 80%;
}


.FavoritesBt {
    background-color: rgb(224, 109, 109)
}

.FavoritesBt:hover {
    background-color: purple
}

.v-text-field {
    margin-inline: 3px;

}

#SearchBt {
    background-color: rgb(166, 11, 11);
    color: white;

}
#SearchBt:hover{
    background-color: darkred;
}

.text-field-container {
    display: flex;
    margin-right: 20px;
    margin-left: 20px;
    justify-content: center;
    margin-top: 25px;
}
</style>