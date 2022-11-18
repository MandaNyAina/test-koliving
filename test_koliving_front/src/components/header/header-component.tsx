import React from 'react';
import { Menubar } from 'primereact/menubar';
import Logo from '../../assets/images/logo.svg';
import { MenuItem } from 'primereact/menuitem';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = (): React.ReactElement => {
    const navigate = useNavigate();

    const items: MenuItem[] = [
        {
            label: 'Ads list',
            icon: 'pi pi-book',
            command: () => {
                navigate('/ads-list');
            }
        },
        {
            label: 'Tenant list',
            icon: 'pi pi-list',
            command: () => {
                navigate('/tenant-list');
            }
        }
    ];
    const start = <img alt="logo" src={Logo} height="40" className="mr-2"></img>;

    return (
        <div>
            <div className="card">
                <Menubar model={items} start={start} />
            </div>
        </div>
    );
};

export default HeaderComponent;