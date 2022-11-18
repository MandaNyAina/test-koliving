import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useMutation, useQuery } from '@apollo/client';
import { Dialog } from 'primereact/dialog';
import { ITenant } from '../../../models/ITenant';
import { Button } from 'primereact/button';
import { LOAD_TENANT } from '../../../graphql/tenant/tenant.queries';
import { FilterMatchMode } from 'primereact/api';
import { useNavigate } from 'react-router-dom';
import { DELETE_TENANT } from '../../../graphql/tenant/tenant-mutation';
import { clientGraphql } from '../../../environments/environment';
import TenantFormComponent from '../tenant-form-component/tenant-form-component';

const TenantListComponent = (): React.ReactElement => {
    const [tenantList, setTenantList] = useState<ITenant[]>([]);
    const { error, loading, data} = useQuery(LOAD_TENANT);
    const [filters] = useState({
        'first_name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'last_name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'email': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const [displayModal, setDisplayModal] = useState(false);
    const [deleteTenant] = useMutation(DELETE_TENANT);
    const navigate = useNavigate();

    useEffect(() => {
        if (data !== undefined) {
            setTenantList(data.getAllTenant);
        }
        if (error) {
            console.log(error);
        }
    }, [data]);

    const addTenantComponent = () => {
        return (
            <Button onClick={() => setDisplayModal(true)} label="Add a new Tenant" icon='pi pi-plus' iconPos="left" className="p-button-sm" />
        );
    };

    const onHide = () => {
        setDisplayModal(false);
    };

    const onEditOrViewTenant = (id: string) => {
        navigate('/tenant-detail/' + id);
    };
    
    const onDeleteTenant = async (_id: string) => {
        deleteTenant({
            variables: {
                _id
            }
        });
        await clientGraphql.refetchQueries({
            include: [LOAD_TENANT]
        });
    };

    const actionBodyTemplate = (rowData: ITenant) => {
        return (
            <div className='flex'>
                <Button onClick={() => onEditOrViewTenant(rowData._id as string)} icon="pi pi-pencil" className="p-button-rounded p-button-help" aria-label="Create" />
                <Button onClick={() => onDeleteTenant(rowData._id as string)} icon="pi pi-times" className="p-button-rounded p-button-danger" aria-label="Cancel" />
            </div>
        );
    };
    
    return (
        <div>
            <div className="card">
                <Dialog header="Add a new Tenant" visible={displayModal} style={{ width: '50vw' }} onHide={() => onHide()}>
                    <TenantFormComponent onHide={onHide}></TenantFormComponent>
                </Dialog>
                <DataTable 
                    value={tenantList} responsiveLayout="scroll" loading={loading} dataKey="id" header={addTenantComponent}
                    filters={filters} filterDisplay="row" globalFilterFields={['title']}>
                    <Column field="first_name" filter filterPlaceholder="Search by first name" header="First name" />
                    <Column field="last_name" filter filterPlaceholder="Search by last name" header="Last name" />
                    <Column field="email" filter filterPlaceholder="Search by email" header="Email" />
                    <Column header="Actions" headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
    );
};

export default TenantListComponent;