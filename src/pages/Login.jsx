import spotifyIcon from '../assets/spotify.png';
import { SCOPES } from '../utils/constants';
import './Login.css';

const Login = () => {

    const handleClick = ()=> {
        window.location.href = `${import.meta.env.VITE_SPOTIFY_AUTHORIZATION_ENDPOINT + '/authorize'}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_SPOTIFY_REDIRECT_URI}&scope=${
            SCOPES.join(' ')
        }&response_type=token&show_dialog=true`
    }
    return (<div className="Login">
        <div className='Login__container'>
            <div className='Login__container_image'>
                <img src={spotifyIcon} alt='spotify icon' />
            </div>
            <div className='Login__container_btn'>
                <button onClick={
                    handleClick
                }>
                    Connect to spotify
                </button>
            </div>
        </div>
    </div>)
}


export default Login;