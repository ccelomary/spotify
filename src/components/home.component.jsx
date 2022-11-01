
import { ItemCard } from './itemCard.component';
import { connect } from 'react-redux';

import './home.styles.css';
const HomeComponent = (props) => {
    const {user: {recentTracks, currentTrack}} = props;
    return (
        <div className="Home" style={{
            height:  currentTrack.id ? "calc(100vh - 60px - 55px)": "calc(100vh - 60px)",
        }}>
            <div className="Home__container">
                <div className="Home__container__recentlyPlayed">
                    <h2>Recently Played</h2>
                    <div className="Home__container__recentlyPlayed__list">
                    {
                        recentTracks.map((item, index) => {
                            return <ItemCard key={item.track.id + index} {...{
                                image: item.track.album.images.length > 0 ? item.track.album.images[0].url : null,
                                name: item.track.name,
                                artist: item.track.artists.map((artist) => artist.name).join(', '),
                                type: item.track.type,
                                id: item.track.id,
                                uri: item.track.uri,
                            }} />
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Home = connect((state)=>{
    return {
        user: state.user
    }
}, null)(HomeComponent);
