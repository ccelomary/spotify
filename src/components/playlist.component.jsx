import { useEffect, useState } from 'react';
import { getPlaylistById } from '../api/playlist.api';
import { getLikedSongs } from '../api/library.api';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserCurrentTrackService } from '../services/user.service';
import { setTrackService } from '../services/player.service';
import reduceStringLength from '../utils/reduceStringLength';

import './playlist.styles.css';
const PlaylistComponent = (props)=>{
    const {id} = useParams();
    const {user, player} = props;
    const [currentPlaylist, setCurrentPlaylist] = useState(null);

    const setPlaylist = async ()=>{
        if (id === 'liked_songs') {
            const likedSongs = await getLikedSongs({
                owner: {
                    display_name: props.user.name,
                },
                token: props.token
            });
            setCurrentPlaylist(likedSongs);
        }
        else {
            const playlist = await getPlaylistById({id, token: props.token});
            setCurrentPlaylist(playlist);
        }
    }
    const formatDatePlaylist = (date)=>{
        const dateObj = new Date(date);
        return  dateObj.getDay() + '/' + dateObj.getMonth() + '/' + dateObj.getFullYear();
    }

    const convertDuration = (duration)=>{
        duration = duration / 1000;
        const minutes = Math.floor(duration/60);
        const seconds = duration - minutes*60;
        return Math.round(minutes) + ':' + Math.round(seconds);
    }
    useEffect(()=>{
        setPlaylist();
    }, [id]);

    if (!currentPlaylist)
        return <>LOADING...</>
    return (
        <div className="Playlist" style={{
            height:  user.currentTrack.id ? "calc(100vh - 60px - 55px)": "calc(100vh - 60px)",
        }}>
            <div className="Playlist__header">
                <div className="Playlist__header__image">
                    <img src={currentPlaylist.images.length ? currentPlaylist.images[0].url : "https://source.unsplash.com/ifreZpMoukk"} alt='playlist' />
                </div>
                <div className='Playlist__header__info'>
                    <h3>{currentPlaylist.type.toUpperCase()}</h3>
                    <h1>{currentPlaylist.name.toUpperCase()}</h1>
                    <p style={{fontSize: '12px', marginBottom: '10px'}}>{currentPlaylist.description}</p>
                    <p>{currentPlaylist.owner.display_name} {currentPlaylist.tracks.total ? ', ' + currentPlaylist.tracks.total  + ' songs':''} </p>
                </div>
            </div>
            <div className="Playlists__body">
            {
               (currentPlaylist.tracks.total===0) ? <h2 className='Empty__Playlist'>Songs will appear here!</h2>: null
            }
            {
             currentPlaylist.tracks.total >  0  ?
             <div className='Playlist__body__songs'>
                    <div className='Playlist__body__songs__header'>
                        <div className='Playlist__body__songs__header__number'>
                            #
                        </div>
                        <div className='Playlist__body__songs__header__title'>
                            Title
                        </div>
                        <div className='Playlist__body__songs__header__album'>
                            Album
                        </div>
                        <div className='Playlist__body__songs__header__releaseDate'>
                            Date Added
                        </div>
                        <div className='Playlist__body__songs__header__duration'>
                            <img src="https://img.icons8.com/ios/3x/ffffff/clock--v3.png" alt="duration" />
                        </div>
                    </div>
                    <div className='Playlist__body__songs__header__line'>
                    </div>
                    <div className='Playlist__body__songs__body'>
                        {
                           currentPlaylist.tracks.items.map((song, index)=>{
                               
                                const {track} = song;
                                return <div key={track.id + index} className='Playlist__body__songs__body__song'>
                            <div className='Playlist__body__songs__body__song__number'>
                                <h1 className='Playlist__body__song__number' style={{
                                    opacity: player.track && player.track.name === track.name && player.track.isPlaying ? 0 : 1
                                }}>{index + 1}</h1>
                                <div className='Playlist__body__icons'>
                                    <img className='Playlist__playPause__btn' src={`https://img.icons8.com/ios/2x/ffffff/${player.track && player.track.name === track.name && player.track.isPlaying ? 'pause' : 'play'}--v1.png`} alt="like"
                                    onClick={
                                        ()=> {
                                            if (player.track && player.track.name === track.name && player.track.isPlaying) {
                                               props.setUserCurrentTrackService({});
                                               props.setTrackService(null);
                                                }
                                            else {
                                                props.setUserCurrentTrackService({
                                                    uri: track.uri,
                                                    id: track.id,
                                                });
                                            }
                                        }
                                    } />
                                    <img className='Playlist_waves' src="https://i.gifer.com/YdBO.gif" alt="like" style={{
                                        opacity: player.track && player.track.name === track.name && player.track.isPlaying ? 1 : 0
                                    }} />
                                </div>
                            </div>
                            <div className='Playlist__body__songs__body__song__title'>
                                    {reduceStringLength(track.name, 17)}
                            </div>
                            <div className='Playlist__body__songs__body__song__album'>
                                {reduceStringLength(track.album.name, 17)}
                            </div>
                            <div className='Playlist__body__songs__body__song__releaseDate'>
                                {formatDatePlaylist(song.added_at)}
                            </div>
                            <div className='Playlist__body__songs__body__song__duration'>
                                {convertDuration(track.duration_ms)}
                            </div>
                        </div>
                            })
                        }
                    </div>
                </div> : null
            }
            </div>
        </div>
    )
}

export const Playlist = connect((state)=>{
    return {
        token: state.token,
        user: state.user,
        player: state.player,
    }
}, {
    setTrackService,
    setUserCurrentTrackService
})(PlaylistComponent);