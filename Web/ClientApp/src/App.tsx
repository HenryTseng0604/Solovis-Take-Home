import React from 'react';
import { Route } from 'react-router';
import Layout from './app/layout/Layout';
import Portfolio from './feature/Portfolio';
import Projection from './feature/Projection';

export default () => (
    <Layout>
        <Route exact path='/' component={Portfolio} />
        <Route path='/projection' component={Projection} />
    </Layout>
);
