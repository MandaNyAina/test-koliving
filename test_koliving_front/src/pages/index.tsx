import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdsDetailPage from './ads-detail/ads-detail-page';
import AdsListPage from './ads-list/ads-list-page';
import TenantDetailPage from './tenant-detail/tenant-detail-page';
import TenantListPage from './tenant-list/tenant-list-page';
import { ApolloProvider } from '@apollo/client';
import { clientGraphql } from '../environments/environment';
import HeaderComponent from '../components/header/header-component';

const IndexApp = (): React.ReactElement => {
    return (
        <ApolloProvider client={clientGraphql}>
            <Router>
                <HeaderComponent></HeaderComponent>
                <Routes>
                    <Route path="/" element={<Navigate to="/ads-list" />}></Route>
                    <Route path="/ads-list" element={<AdsListPage />}></Route>
                    <Route path="/ads-detail/:id" element={<AdsDetailPage />}></Route>
                    <Route path="/tenant-list" element={<TenantListPage />}></Route>
                    <Route path="/tenant-detail/:id" element={<TenantDetailPage />}></Route>
                </Routes>
            </Router>
        </ApolloProvider>
    );
};

export default IndexApp;
