import spotifyLogo from '../assets/spotify_logo.svg';
import search from '../assets/search.svg';
import liked from '../assets/liked.svg';
import home from '../assets/home.svg';
import library from '../assets/library.svg';
import search_fill from '../assets/search_fill.svg';
import home_fill from '../assets/home_fill.svg';
import library_fill from '../assets/library_fill.svg';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setActiveService } from '../services/config.service';

import './sideBar.styles.css';
const SideBarComponent = (props) => {
    const {user: {playlists}, config:{active}, setActiveService} = props;
    const navigate = useNavigate();

    return (<div className="sideBar">
        <div className="sideBar__container">
            <div className="sideBar__logo">
                <img src={spotifyLogo} alt="spotify logo" onClick={()=>{
                    navigate('/');
                    setActiveService('home');
                }} />
            </div>
            <div className='icons'>
                <div className={"icon" + (active === 'home' ? ' icon--active': '')} 
                onClick={
                    ()=> {
                        setActiveService('home');
                        navigate('/');
                    }
                }>
                    <img src={active === 'home' ?  home_fill :  home} alt="home" />
                    <p>Home</p>
                </div>
                <div className={"icon" + (active === 'search' ? ' icon--active': '')} 
                onClick={
                    ()=>{
                        setActiveService('search');
                        navigate('/search');
                    }
                }>
                    <img src={active === 'search' ? search_fill :search} alt='search' />
                    <p>Search</p>
                </div>
                <div className={"icon" + (active === 'library' ? ' icon--active': '')} 
                onClick={
                    ()=>{
                        setActiveService('library');
                        navigate('/library');
                    }
                }>
                    <img src={active==='library' ? library_fill :  library} alt='search' />
                    <p>Your Library</p>
                </div>
            </div>
            <div className={'liked___songs__container' + (active==='liked' ? ' icon--active': '')} onClick={
                ()=>{
                    setActiveService('liked');
                    navigate('/playlist/liked_songs');
                }
            }>
                <img src={liked} alt='liked songs' />
                <p>Liked Songs</p>
            </div>
            <div className='playlists__header_line'></div>
            <div className='playlists'>
                <div className='playlists__container'>
                {
                    playlists.map((playlist)=>{
                        return  <div key={playlist.id} className={'playlist' + (active===playlist.id ? ' icon--active' : '')} onClick={()=>{
                        setActiveService(playlist.id);
                        navigate(`/playlist/${playlist.id}`);
                    }}>
                        <p>{playlist.name}</p>
                    </div>
                    })
                }
                </div>
            </div>
        </div>
    </div>)
}

export const SideBar = connect((state)=>{
    return {
        user: state.user,
        config: state.config
    }
}, {
    setActiveService
})(SideBarComponent);