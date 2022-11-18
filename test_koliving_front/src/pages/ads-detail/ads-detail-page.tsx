import React from 'react';
import AdsDetailComponent from '../../components/ads-component/ads-detail-component/ads-detail-component';

const AdsDetailPage = (): React.ReactElement => {
    return (
        <div className='wrapper'>
            <h1>View Ads / Edit Ads</h1>
            <AdsDetailComponent></AdsDetailComponent>
        </div>
    );
};

export default AdsDetailPage;