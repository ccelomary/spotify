import { ItemCard } from './itemCard.component';
import { useEffect, useState } from 'react';
import { setSearchService } from '../services/config.service';
import {connect} from 'react-redux';
import { fetchSearch } from '../api/search.api';

import './search.styles.css';
const SearchComponent = (props)=> {
    const [searchPlaylist, setSearchPlaylist] = useState([]);
    const [searchAlbum, setSearchAlbum] = useState([]);
    const [searchTracks, setSearchTracks] = useState([]);
    const {user, setSearchService, token, config:{search}} = props;

    useEffect(()=>{
        return ()=>{
            setSearchService("");
        }
    },[])

    const setSearchResult = async () => {
        const res = await fetchSearch(token, search);
        setSearchPlaylist(res.playlists.items);
        setSearchAlbum(res.albums.items.filter((item)=>item.album_type === 'album'));
        setSearchTracks(res.tracks.items);
    }
    useEffect(()=>{
        if (search.length > 0) {
            setSearchResult();
        }
    }, [search]);
    return <div className='Search' style={{
        height:  user.currentTrack.id ? "calc(100vh - 60px - 55px)": "calc(100vh - 60px)",
    }}>
        <div className='Search__container'>
        {
            (searchPlaylist.length > 0 || searchAlbum.length > 0 || searchTracks.length > 0) ? <div className='Search__container__result'>
                {
                    searchPlaylist.length > 0 ?
                <div className='Search__container__result__content'>
                    <h2>Playlists</h2>
                    <div className='Search__container__result__content__row'>
                        {
                            searchPlaylist.map((item, index) => {
                                return <ItemCard key={item.id + index}
                                        image={item.images.length > 0 ? item.images[0].url:
                                        "https://source.unsplash.com/QzpgqElvSiA"}
                                        name={item.name}
                                        artist={item.owner.display_name}
                                        type='playlists'
                                        id={item.id}
                                        uri={item.uri}
                                        total={item.tracks.total} />
                            })
                        }
                    </div>
                </div>:
                null
                }
                {
                    searchAlbum.length > 0 ?
                <div className='Search__container__result__content'>
                        <h2>Albums</h2>
                        <div className='Search__container__result__content__row'>
                           {
                                 searchAlbum.map((item, index) => {
                                    return <ItemCard key={item.id + index}
                                            image={item.images.length > 0 ? item.images[0].url:
                                            "https://source.unsplash.com/QzpgqElvSiA"}
                                            name={item.name}
                                            artist={item.artists.map(artist => artist.name).join(', ')}
                                            type='albums'
                                            id={item.id}
                                            uri={item.uri}
                                            total={item.total_tracks} />
                                })
                            }
                        </div>
                </div>
                :
                null
                }
                {
                    searchTracks.length > 0 ?
                    <div className='Search__container__result__content'>
                    <h2>Tracks</h2>
                    <div className='Search__container__result__content__row'>
                        {
                            searchTracks.map((item, index) => {
                                return <ItemCard key={item.id + index}
                                        image={item.album.images.length ? item.album.images[0].url :
                                        "https://source.unsplash.com/QzpgqElvSiA"}
                                        name={item.name}
                                        artist={item.artists.map(artist => artist.name).join(', ')}
                                        type='tracks'
                                        id={item.id}
                                        uri={item.uri}
                                        total={item.total_tracks} />
                            })
                        }
                    </div>
                    </div>:
                    null
                }
            </div>
            :
            <div className='Search__container__noResult'>
                <h1>No Result Yet...</h1>
            </div>
        }
        </div>
    </div>
}

export const Search = connect((state)=>{
    return {
        user: state.user,
        config: state.config,
        token: state.token,
    }
}, {
    setSearchService
})(SearchComponent);