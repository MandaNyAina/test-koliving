import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { IAds } from '../../../models/IAds';
import { LOAD_ADS } from '../../../graphql/ads/ads.queries';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ATTACH_TENANT } from '../../../graphql/tenant/tenant-mutation';

const TenantAttachComponent = ({onHide}: {onHide:() => void}): React.ReactElement => {
    const [ad, setAd] = useState<IAds>();
    const [rent, setRent] = useState(0);
    const [adsList, setAdsList] = useState<IAds[]>([]);
    const { error, data} = useQuery(LOAD_ADS);
    const params = useParams();
    const [attachTenantToAd] = useMutation(ATTACH_TENANT);

    const onAttach = () => {
        console.log({
            ad_id: ad?._id,
            tenant_id: params.id,
            rent_price: rent
        });
        attachTenantToAd({
            variables: {
                ad_id: ad?._id,
                tenant_id: params.id,
                rent_price: rent
            }
        });
        onHide();
    };

    const onChangeId = (e: DropdownChangeParams) => {
        setAd(e.value);      
    };

    useEffect(() => {
        if (data !== undefined) {
            setAdsList(data.getAllAds);
        }
        if (error) {
            console.log(error);
        }
    }, [data]);

    return (
        <div className="card">
            <div className="field">
                <label htmlFor="adId">Id</label>
                <Dropdown value={ad} options={adsList} onChange={(e) => onChangeId(e)} 
                    optionLabel="properties.title" placeholder="Select an ad" className="w-full" />
            </div>
            <div className="field">
                <label htmlFor="rent_price">Rent price</label>
                <input id="rent_price" type="number" value={rent} onChange={(e) => setRent(parseFloat(e.currentTarget.value))}
                    className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
            </div>
            <div className="flex justify-content-between flex-wrap card-container purple-container">
                <Button disabled={ad === undefined} label="Save" onClick={onAttach} className="p-button-rounded p-button-success" />
            </div>
        </div>
    );
};

export default TenantAttachComponent;