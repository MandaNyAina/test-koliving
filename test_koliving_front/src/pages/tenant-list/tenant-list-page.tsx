import React from 'react';
import TenantListComponent from '../../components/tenant-component/tenant-list-component/tenant-list-component';

const TenantListPage = (): React.ReactElement => {
    return (
        <div className='wrapper'>
            <h1>Tenant list page</h1>
            <TenantListComponent></TenantListComponent>
        </div>
    );
};

export default TenantListPage;