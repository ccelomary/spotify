import search_black from '../assets/search_black.svg';
import { connect } from 'react-redux';
import { setSearchService } from '../services/config.service';

import './searchBar.styles.css';
const SearchBarComponent = (props) => {
    const {config:{search}, setSearchService} = props;
    return (<div className='SearchBar'>
        <label className='SearchBar__container' onKeyUp={
            (e)=>{
                if (e.key === 'Enter') {
                    setSearchService(e.target.value);
                }
            }
        } htmlFor="searchBar_input">
            <div className="SearchBar__container__icon">
                <img src={search_black} alt='search icon' />
            </div>
            <div className='SearchBar__container__input'>
                <input value={search} id="searchBar_input" onChange={(e)=>{
                    setSearchService(e.target.value);
                }} type="text" placeholder='What do you want to listen to?' />
            </div>
        </label>
    </div>)
}


export const SearchBar = connect(state => {
    return {
        config: state.config
    }
}, {
    setSearchService
})(SearchBarComponent);
