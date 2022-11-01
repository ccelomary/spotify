import { setSelectedCategoryService } from '../services/config.service';
import {connect} from 'react-redux';

import './categories.styles.css';
export const CategoriesComponent = (props) => {
    const {config: {selectedCategory}, setSelectedCategoryService} = props;
    return (
        <div className="Categories">
            <div className="Categories__container">
                <div className={"Categories__container__item"
                + (selectedCategory==='playlists' ? ' Categories__container__item--select': "")} 
                onClick={()=>{
                    setSelectedCategoryService('playlists')
                }}>
                    <p>Playlists</p>
                </div>
                <div className={"Categories__container__item"
                + (selectedCategory==='albums' ? ' Categories__container__item--select': "")} 
                onClick={
                    ()=>{
                        setSelectedCategoryService('albums')
                    }
                }>
                    <p>Albums</p>
                </div>
            </div>
        </div>
    )
}


export const Categories = connect(state=> {
    return {
        config: state.config
    }
},  {
    setSelectedCategoryService
})(CategoriesComponent);
