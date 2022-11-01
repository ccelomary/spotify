import play_icon from '../assets/play_icon.svg';
import pause_icon from '../assets/pause_icon.svg';
import reduceStringLength from '../utils/reduceStringLength';
import { useNavigate } from 'react-router-dom';
import { setActiveService } from '../services/config.service';
import { connect } from 'react-redux';
import { setUserCurrentTrackService } from '../services/user.service';
import { setTrackService } from '../services/player.service';

import './itemCard.styles.css';
const ItemCardComponent = ({image, name, artist, type, id, uri, total,
    player,  setActiveService, setUserCurrentTrackService, setTrackService}) => {
    let isClicked = false;
    const navigate = useNavigate();
    return <div className='ItemCard' onClick={()=>{
        if (!isClicked && id) {
            if (type === 'playlists') {
                setActiveService(id);
                navigate('/playlist/' + id);
            }
            else if (type === 'albums') {
                setActiveService(id);
                navigate('/album/' + id);
            }
        }
        isClicked = false;
    }}>
        <div className="ItemCard__container">
            <div className="ItemCard__container__image">
                <img src={image ? image : 'https://source.unsplash.com/BVRCpQ7Vnz0'} alt='card item' />
                <button className={
                    'ItemCard__container__image__playButton' + 
                    (player.track && player.track.id === id && player.track.isPlaying ? ' ItemCard__container__image__playButton--selected': '')} onClick={
                    (e)=>{
                        e.preventDefault();
                        if (player.track && player.track.id === id) 
                        {
                            setUserCurrentTrackService({});
                            setTrackService(null);
                        }
                        else if (type !== 'playlists' || (total && total > 0))
                        {
                         setUserCurrentTrackService({
                            uri,
                            id,
                         });   
                        }
                        isClicked = true;
                    }
                }>
                    <img src={player.track && player.track.id === id && player.track.isPlaying ? pause_icon : play_icon} alt='play/pause' 
                        style= {
                            (player.track && player.track.id === id && player.track.isPlaying ? {transform: 'translate(0px, 0px)'}: {})
                        }
                    />
                </button>
            </div>
            <div className="ItemCard__container__info">
               <h4 className='ItemCard__container__title'>{reduceStringLength(name, 16)}</h4>
               <p className='ItemCard__container__description'>{reduceStringLength(artist, 16)}</p>
            </div>
        </div>
    </div>
}


export const ItemCard = connect((state)=> {
    return {
        token: state.token,
        user: state.user,
        player: state.player
    }
}, {
    setActiveService,
    setUserCurrentTrackService,
    setTrackService
})(ItemCardComponent);