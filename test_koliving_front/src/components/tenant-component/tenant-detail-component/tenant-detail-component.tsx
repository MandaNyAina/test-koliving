import { useMutation, useQuery } from '@apollo/client';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { clientGraphql } from '../../../environments/environment';
import { LOAD_ADS } from '../../../graphql/ads/ads.queries';
import { UPDATE_TENANT } from '../../../graphql/tenant/tenant-mutation';
import { LOAD_TENANT_BY_ID } from '../../../graphql/tenant/tenant.queries';
import TenantAttachComponent from '../tenant-attach-component/tenant-attach-component';

const TenantDetailComponent = (): React.ReactElement => {
    const params = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [rentPrice, setRentPrice] = useState<number | undefined>();
    const { error, loading, data} = useQuery(LOAD_TENANT_BY_ID, {variables: {
        _id: params.id,
    }});
    const [isEdit, setIsEdit] = useState(false);
    const [ad, setAd] = useState<string>();
    const [idOfAd, setIdOfAd] = useState<string>();
    const [updateTenant] = useMutation(UPDATE_TENANT);
    const [displayModal, setDisplayModal] = useState(false);

    useEffect(() => {
        if (data !== undefined) {
            setFirstName(data.getTenantById.first_name);
            setLastName(data.getTenantById.last_name);
            setEmail(data.getTenantById.email);
            if (data.getTenantById.rents !== null) {
                setRentPrice(data.getTenantById.rents.rent_price);
                clientGraphql.query({query: LOAD_ADS, variables: { id_rent: data.getTenantById.rents._id }})
                    .then(({ error, data }) => {
                        if (error) {
                            console.log(error);
                        }
                        if (data != undefined) {
                            setAd(data.getAllAds[0].properties.title);
                            setIdOfAd(data.getAllAds[0].properties._id);
                        }
                    });
            }
        }
        if (error) {
            console.log(error);
        }
    }, [data]);

    const onHide = () => {
        setDisplayModal(false);
        window.location.reload();
    };

    const onSaveTenant = () => {
        updateTenant({variables: {
            input: {
                _id: params.id,
                first_name: firstName,
                last_name: lastName,
                email
            }
        }});
        setIsEdit(false);
    };

    return (
        <div>
            {loading && <div className="field col-12 md:col-6">
                <Skeleton className="mb-2" borderRadius="16px"></Skeleton>
                <Skeleton width="10rem" className="mb-2" borderRadius="16px"></Skeleton>
                <Skeleton width="5rem" borderRadius="16px" className="mb-2"></Skeleton>
                <Skeleton height="2rem" className="mb-2" borderRadius="16px"></Skeleton>
                <Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>
            </div>}
            {!loading && <div>
                <div className="flex justify-content-between flex-wrap card-container purple-container">
                    <h2>Tenant informations </h2>
                    <Button onClick={() => setIsEdit(!isEdit)} label={isEdit ? 'View' : 'Edit'} />
                </div>
                <div className="card">
                    <div className="field">
                        <label htmlFor="first_name">First name</label>
                        <input disabled={!isEdit} id="first_name" type="text" value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)}
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                    </div>
                    <div className="field">
                        <label htmlFor="last_name">Last name</label>
                        <input disabled={!isEdit} id="last_name" type="text" value={lastName} onChange={(e) => setLastName(e.currentTarget.value)}
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input disabled={!isEdit} id="email" type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)}
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                    </div>
                    {isEdit && <div className="card">
                        <div className="flex justify-content-between flex-wrap card-container purple-container">
                            <Button label="Save" onClick={onSaveTenant} className="p-button-rounded p-button-success" />
                        </div>
                    </div>}
                </div>
                <div className="flex justify-content-between flex-wrap card-container purple-container">
                    <h2>Rent informations</h2>
                    <Button onClick={() => setDisplayModal(true)} label='Attach to a new Ad' />
                </div>
                <Dialog header="Attach tenant to an ad" visible={displayModal} style={{ width: '50vw' }} onHide={() => onHide()}>
                    <TenantAttachComponent onHide={onHide}></TenantAttachComponent>
                </Dialog>
                {rentPrice !== undefined && <div>
                    {ad !== undefined && idOfAd !== undefined && <div>
                        <div className="field">
                            <label htmlFor="rent_price">Id</label>
                            <input disabled id="rent_price" type="text" value={idOfAd}
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                        </div>
                        <div className="field">
                            <label htmlFor="rent_price">Title</label>
                            <input disabled id="rent_price" type="text" value={ad}
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                        </div>
                    </div>}
                    <div className="field">
                        <label htmlFor="rent_price">Rent price</label>
                        <input disabled id="rent_price" type="number" value={rentPrice} onChange={(e) => setRentPrice(parseFloat(e.currentTarget.value))}
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                    </div>
                </div>}
                {
                    ad === undefined && 'No rent informations'
                }
            </div>}
        </div>
    );
};

export default TenantDetailComponent;