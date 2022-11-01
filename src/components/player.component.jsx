import { connect } from 'react-redux';
import { setUserRecentTracksService } from '../services/user.service';
import SpotifyPlayer from "react-spotify-web-playback";
import { setTrackService } from '../services/player.service';

const PlayerComponent = ({user, token, setTrackService, setUserRecentTracksService}) => {

    return <div style={{
        position: 'fixed',
        bottom: "0px",
        left: 0,
        zIndex: 1000,
        width: '100%',
        height:'55px',
        backgroundColor: '#191919',
    }}>
        <SpotifyPlayer
            token={token}
            uris={[user.currentTrack.uri]}
            styles={{
                bgColor: '#181818',
                slideTrackColor: '#676560',
                sliderColor: '#fff',
                sliderHandleColor: "#FFF",
                color: '#fff',
                trackNameColor: "#CACACA",
                artistNameColor: "#B3B3B3",
            }}
            callback= {
                (state) => {
                  setTrackService({...state.track, isPlaying: state.isPlaying});
                  if (state.type === "track_update")
                  {
                    setUserRecentTracksService(token);
                  }
                }
            }
            />
    </div>
}


export const Player = connect((state)=>{
    return {
        user: state.user,
        token: state.token,
    }
}, {
    setTrackService,
    setUserRecentTracksService,
})(PlayerComponent);