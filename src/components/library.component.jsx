import { ItemCard } from './itemCard.component'
import { useEffect, useState } from 'react';
import { setSelectedCategoryService } from '../services/config.service';
import { getUserSavedAlbums } from '../api/library.api';
import { connect } from 'react-redux';

import './library.styles.css'
const LibraryComponent = (props)=> {
    const {user, config: {selectedCategory}, setSelectedCategoryService, token} = props;
    const [library, setLibrary] = useState([]);

    const userSavedAlbums = async () => {
        const savedAlbums = await getUserSavedAlbums({token});
        setLibrary(savedAlbums.map((item) => {
            return {
                id: item.album.id,
                image: item.album.images.length > 0 ? item.album.images[0].url : null,
                name: item.album.name,
                owner: item.album.artists.map((artist) => artist.name).join(', '),
                external_url: item.album.external_urls.spotify,
                type: 'album',
                uri: item.album.uri,
                total: item.album.total_tracks,
            }
        }));
    }
    // reset selected category when the component library destroyed
    useEffect(()=>{
        return ()=>{
            setSelectedCategoryService('playlists');
        }
    }, []);

    useEffect(()=>{
        if (selectedCategory === 'playlists') {
            setLibrary(user.playlists);
        }
        else if (selectedCategory === 'albums') {
            userSavedAlbums();
        }
        else
            setLibrary([]);
    }, [selectedCategory]);
    return (<div className="library" style={{
         height:  user.currentTrack.id ? "calc(100vh - 60px - 55px)": "calc(100vh - 60px)",
    }}>
        <div className="library__container">
            <div className="library__container__content">
                <div className="library__container__content__playlists">
                    <h3 className='library__title'>{selectedCategory}</h3>
                    <div className="library__container__content__playlists__row">
                        <div className="library__container__content__playlists__row__item">
                            {
                                library.map((item)=>{
                                    return <ItemCard key={item.id} {...{
                                        image: item.image,
                                        name: item.name,
                                        id: item.id,
                                        artist: item.owner,
                                        type: selectedCategory.toLowerCase(),
                                        uri: item.uri,
                                        total: item.total,
                                    }} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}


export const Library = connect(state => {
    return {
        user: state.user,
        config: state.config,
        token: state.token,
    }
}, {
    setSelectedCategoryService
})(LibraryComponent);