import { connect } from 'react-redux';
import { useEffect } from 'react';
import { setUserService } from '../services/user.service';
import { SideBar, TopBar, Home, Player, Search, Library, Playlist, Album } from '../components';
import {Routes, Route } from 'react-router-dom';

import './Dashboard.css';
const Dashboard = (props)=> {
    const {token, user, setUserService} = props;
    useEffect(() => {
        setUserService(token);
    }, [setUserService]);

    if (!user)
        return <>LOADING...</>
    return (<div className='Dashboard'>
        
        <div className='Dashboard__container'>
            <div className='Dashboard__sideBar'>
                <SideBar />
            </div>
            <div className='Dashboard__main'>
                <TopBar />
                <div className='Dashboard__main__content'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/search' element={<Search />} />
                            <Route path='/library' element={<Library />} />
                            <Route path='playlist/:id' element={<Playlist />} />
                            <Route path='album/:id' element={<Album />} />
                            <Route path='*' element={<div>404</div>} />
                        </Routes>
                </div>
            </div>
            {
             user.currentTrack.id && <Player />
            }
        </div>
    </div>)
}

export default connect((state)=>{
    return {
        token: state.token,
        user: state.user,
    }   
}, {
    setUserService,
})(Dashboard);