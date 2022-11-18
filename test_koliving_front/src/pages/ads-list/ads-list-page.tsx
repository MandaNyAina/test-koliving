import React from 'react';
import AdsListComponent from '../../components/ads-component/ads-list-component/ads-list-component';

const AdsListPage = (): React.ReactElement => {
    return (
        <div className='wrapper'>
            <h1>Ads list</h1>
            <AdsListComponent></AdsListComponent>
        </div>
    );
};

export default AdsListPage;