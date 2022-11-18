import { useMutation } from '@apollo/client';
import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { CREATE_TENANT } from '../../../graphql/tenant/tenant-mutation';
import { LOAD_TENANT } from '../../../graphql/tenant/tenant.queries';

const TenantFormComponent = ({onHide}: {onHide:() => void}): React.ReactElement => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [createTenant] = useMutation(CREATE_TENANT);

    const onSaveTenant = () => {
        createTenant({
            variables: {
                input: {
                    first_name: firstName,
                    last_name: lastName,
                    email
                }
            },
            refetchQueries: [{query: LOAD_TENANT}]
        });
        onHide();
    };

    return (
        <div className="card">
            <div className="field">
                <label htmlFor="first_name">First name</label>
                <input id="first_name" type="text" value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)}
                    className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
            </div>
            <div className="field">
                <label htmlFor="last_name">Last name</label>
                <input id="last_name" type="text" value={lastName} onChange={(e) => setLastName(e.currentTarget.value)}
                    className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
            </div>
            <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)}
                    className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
            </div>
            <div className="flex justify-content-between flex-wrap card-container purple-container">
                <Button label="Save" onClick={onSaveTenant} className="p-button-rounded p-button-success" />
            </div>
        </div>
    );
};

export default TenantFormComponent;