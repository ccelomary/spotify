import reduceStringLength from '../utils/reduceStringLength';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAlbum } from '../api/album.api';
import { useParams } from 'react-router-dom';
import { setTrackService } from '../services/player.service';
import { setUserCurrentTrack } from '../actions/user.action';

import './album.styles.css';
const AlbumComponent = ({token, user, player, setTrackService, setUserCurrentTrack}) => {
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const {id} = useParams();

    const convertDuration = (duration)=>{
        duration = duration / 1000;
        const minutes = Math.floor(duration/60);
        const seconds = duration - minutes*60;
        return Math.round(minutes) + ':' + Math.round(seconds);
    }


    useEffect(()=>{
        getAlbum(id, token).then((album)=>{
            setCurrentAlbum(album);
        });
    }, [id]);

    return (
        <div className="Album" style={{
            height:  user.currentTrack.id ? "calc(100vh - 60px - 55px)": "calc(100vh - 60px)",
        }} >
            <div className="Album__header">
                <div className="Album__header__image">
                    <img src={currentAlbum?.images.length ? currentAlbum?.images[0].url : "https://source.unsplash.com/iHqPY4LG21U"} alt='Album' />
                </div>
                <div className='Album__header__info'>
                    <h3>{currentAlbum?.album_type.toUpperCase()}</h3>
                    <h1>{currentAlbum?.name.toUpperCase()}</h1>
                    <p style={{fontSize: '12px', marginBottom: '10px'}}>{currentAlbum?.description}</p>
                    <p>{currentAlbum?.artists.map(artist => {
                        return artist.name
                    }).join(', ')} {currentAlbum?.tracks.total ? ', ' + currentAlbum?.tracks.total  + ' songs':''} </p>
                </div>
            </div>
            <div className="Albums__body">
            {
               (currentAlbum?.tracks.total===0) ? <h2 className='Empty__Album'>Songs will appear here!</h2>: null
            }
            {
             currentAlbum?.tracks.total >  0  ?
             <div className='Album__body__songs'>
                    <div className='Album__body__songs__header'>
                        <div className='Album__body__songs__header__row'>
                            <div className='Album__body__songs__header__number'>
                                #
                            </div>
                            <div className='Album__body__songs__header__title'>
                                Title
                            </div>
                        </div>
                        <div className='Album__body__songs__header__duration'>
                            <img src="https://img.icons8.com/ios/3x/ffffff/clock--v3.png" alt="duration" />
                        </div>
                    </div>
                    <div className='Album__body__songs__header__line'>
                    </div>
                    <div className='Album__body__songs__body'>
                        {
                           currentAlbum?.tracks.items.map((track, index)=>{
                                return <div key={track.id + index} className='Album__body__songs__body__song'>
                            <div className='Album__body__songs__body__song__row'>
                            <div className='Album__body__songs__body__song__number'>
                                <h1 className='Album__body__song__number' style={{
                                    opacity: player.track && player.track.name === track.name && player.track.isPlaying ? 0 : 1
                                }}>{index + 1}</h1>
                                <div className='Album__body__icons'>
                                    <img className='Album__playPause__btn' src={`https://img.icons8.com/ios/2x/ffffff/${
                                        player.track && player.track.name === track.name && player.track.isPlaying ? 'pause' : 'play'
                                    }--v1.png`} alt="like" onClick={
                                        ()=>{
                                            if(player.track && player.track.name === track.name && player.track.isPlaying){
                                                setTrackService(null);
                                                setUserCurrentTrack({});
                                            }else{
                                                setUserCurrentTrack({uri: track.uri, id: track.id});
                                            }
                                        }
                                    } />
                                    <img className='Album_waves' src="https://i.gifer.com/YdBO.gif" alt="like" style={{
                                        opacity: player.track && player.track.name === track.name && player.track.isPlaying ? 1 : 0
                                    }} />
                                </div>
                            </div>
                            <div className='Album__body__songs__body__song__title'>
                                    {reduceStringLength(track.name, 17)}
                            </div>
                            </div>
                            <div className='Album__body__songs__body__song__duration'>
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

export const Album = connect((state)=> {
    return {
        token: state.token,
        user: state.user,
        player: state.player
    }
}, {
    setTrackService,
    setUserCurrentTrack
})(AlbumComponent);
