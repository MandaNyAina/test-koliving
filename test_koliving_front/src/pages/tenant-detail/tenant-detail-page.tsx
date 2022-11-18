import React from 'react';
import TenantDetailComponent from '../../components/tenant-component/tenant-detail-component/tenant-detail-component';

const TenantDetailPage = (): React.ReactElement => {
    return (
        <div className='wrapper'>
            <h1>View / Edit tenant</h1>
            <TenantDetailComponent></TenantDetailComponent>
        </div>
    );
};

export default TenantDetailPage;