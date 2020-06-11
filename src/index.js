import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/app";

ReactDOM.render(<App />, document.querySelector(".container"));

// Api key de themoviedb => 0c24217672c886d51c39a20d9fe69044
// exemple de requette API => https://api.themoviedb.org/3/movie/550?api_key=0c24217672c886d51c39a20d9fe69044
// Jeton d'accès en lecture à l'API (v4 auth) =>  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzI0MjE3NjcyYzg4NmQ1MWMzOWEyMGQ5ZmU2OTA0NCIsInN1YiI6IjVlOTc4MzkxZjY3ODdhMDAxNGVmOWU5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2F_bOAGibrYZtva0iCGuejLeXTtV_aq7Qy43nSAVjs4
// Pour voir les actions possibles sur l'API => developers.themoviedb.org/3/movies/get-movie-details
