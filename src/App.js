import { useEffect, useState } from 'react';
import './App.css';
import Login from './Login'
import { getTokenFromUrl } from './spotify';
import spotifyWebApi from 'spotify-web-api-js'
import Player from './Player'
import { StateProvider, useStateValue } from './StateProvider';
import reducer, { initialState } from './reducer';
const spotify =new spotifyWebApi();
function App() { 
  //const [token,setToken]=useState(null);
  const [{user,token,playlists},dispatch]=useStateValue()
  useEffect(()=>{
    const hash=getTokenFromUrl();
   
    const _token=hash.access_token;
    window.location.hash="";
  
   if(_token){
   // setToken(_token)
   spotify.setAccessToken(_token)
   dispatch({
    type:'SET_TOKEN',
    token:_token,
   })
   
    //this is giving the spotify api the access token so that we can communicate between spotify and react 
   
   
    spotify.getMe().then(user=>{
     // console.log("PERSON",user);

     //this will give us the user account and it returns a promise
     dispatch({
      type:'SET_USER',
      user:user,
     })
    }) 
    spotify.getUserPlaylists().then((playlists)=>{
      dispatch({
        type:'SET_PLAYLISTS',
        playlists:playlists
      })

    });
    spotify.getPlaylist('4PWQV9dQpT7As9OTZBqrR8').then((response)=>dispatch({
      type:'SET_DISCREPTION_WEEKLY',
      discover_weekly:response,
    }));
    spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });
    
    
   }
 
  
   
  },[]);
  //console.log("USERRRR",user)
  
  console.log('I have a  token>>>',token)
  console.log("playlists",playlists)
  return (
    <div className="app">
     
     {
      token?
        <Player spotify={spotify}/>
      :
        <Login/>
      
     }
      {/* spotify logo*/}
      {/*login with spotify button */}
      
    </div>
  );
}

export default App;