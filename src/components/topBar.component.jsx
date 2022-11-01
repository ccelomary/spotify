import arrow from '../assets/arrow.svg';
import { Categories } from './categories.component';
import { SearchBar } from './searchBar.component';
import {connect} from 'react-redux';
import './topBar.styles.css';
import { useNavigate } from 'react-router-dom';
const TopBarComponent = (props) => {
    const {user: {name, image}, config: {active}} = props;
    const navigate = useNavigate();
    return <div className="topBar">
        <div className="topBar__container">
            <div className="topBar__arrows">
                <div className='leftArrow' onClick={()=>{
                    navigate(-1);
                }}>
                    <img src={arrow} alt="left arrow" />
                </div>
                <div className='rightArrow' onClick={()=>{
                    navigate(1);
                }}>
                    <img src={arrow} alt="right arrow" />
                </div>
            </div>
            <div className='topBar__container__middle'>
                {
                    active === 'search' ? <SearchBar /> : active==='library' ? <Categories />: null
                }
            </div>
            <div className="topBar__user">
                <div className="topBar__user__avatar">
                    <img src={image || 'https://source.unsplash.com/YQ6yIvN5eHY'} alt='avatar' />
                </div>
                <div className="topBar__user__name">
                    <p>{name}</p>
                </div>
            </div>
        </div>
    </div>
}

export const TopBar = connect((state)=>{
    return {
        user: state.user,
        config: state.config
    }
}, null)(TopBarComponent);