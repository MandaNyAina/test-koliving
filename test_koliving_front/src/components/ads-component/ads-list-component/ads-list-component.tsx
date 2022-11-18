import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useMutation, useQuery } from '@apollo/client';
import { LOAD_ADS } from '../../../graphql/ads/ads.queries';
import { DELETE_ADS } from '../../../graphql/ads/ads.mutation';
import { FilterMatchMode } from 'primereact/api';
import { clientGraphql } from '../../../environments/environment';
import { IAds } from '../../../models/IAds';
import { Dialog } from 'primereact/dialog';
import AdsFormComponent from '../ads-form-component/ads-form-component';

const AdsListComponent = (): React.ReactElement => {
    const [adsList, setAdsList] = useState<IAds[]>([]);
    const { error, loading, data} = useQuery(LOAD_ADS);
    const [deleteAds] = useMutation(DELETE_ADS);
    const [filters] = useState({
        'properties.title': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'rents.tenants.email': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const [displayModal, setDisplayModal] = useState(false);

    const onAddAds = () => {
        setDisplayModal(true);
    };

    const onEditAds = (data?: IAds | undefined) => {
        window.open(`/ads-detail${data ? '/' + data._id : ''}`);
    };

    const onDeleteAds = async (data: IAds) => {
        deleteAds({
            variables: {
                id: data._id
            }
        });
        await clientGraphql.refetchQueries({
            include: [LOAD_ADS]
        });
    };

    const addAdsComponent = () => {
        return (
            <Button onClick={() => onAddAds()} label="Add a new Ad" icon='pi pi-plus' iconPos="left" className="p-button-sm" />
        );
    };

    const actionBodyTemplate = (rowData: IAds) => {
        return (
            <div className='flex'>
                <Button onClick={() => onEditAds(rowData)} icon="pi pi-pencil" className="p-button-rounded p-button-help" aria-label="Create" />
                <Button onClick={() => onDeleteAds(rowData)} icon="pi pi-times" className="p-button-rounded p-button-danger" aria-label="Cancel" />
            </div>
        );
    };

    const onHide = async () => {
        setDisplayModal(false);
    };

    useEffect(() => {
        setAdsList(data?.getAllAds);
        if (error) {
            console.log(error);
        }
    }, [data]);

    return (
        <div>
            <div className="card">
                <Dialog header="Add a new Ad" visible={displayModal} style={{ width: '50vw' }} onHide={() => onHide()}>
                    <AdsFormComponent onHide={onHide}></AdsFormComponent>
                </Dialog>
                <DataTable 
                    value={adsList} responsiveLayout="scroll" loading={loading} dataKey="id" header={addAdsComponent}
                    filters={filters} filterDisplay="row" globalFilterFields={['title']}>
                    <Column field="properties.title" filter filterPlaceholder="Search by title" header="Title" />
                    <Column field="properties.address" header="Address" />
                    <Column field="properties.surfaces" header="Surface" />
                    <Column field="createdAt" header="Date created" sortable/>
                    <Column field="rents.tenants.email" filter filterPlaceholder="Search by email" header="Email of the tenant renting" />
                    <Column field="rents.rent_price" header="Rent Price" sortable/>
                    <Column header="Actions" headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
    );
};

export default AdsListComponent;