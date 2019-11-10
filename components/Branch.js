import React from 'react';
import { PageHeader } from 'antd';
import { withAuthSync } from '../utils/auth'

const Branch = props => {
    const {location} = props;
    console.log("prop =" + JSON.stringify(props))
    return (
        <PageHeader
            style={{
            border: '1px solid rgb(235, 237, 240)',
            }}
            title="Welcome to SunLight Cafe Outlet System "
            subTitle={location != 'NEW' && (<span>Location : {location} </span>)}
        />
      );
}

export default withAuthSync(Branch)

