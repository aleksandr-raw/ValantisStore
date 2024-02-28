import React, {CSSProperties} from "react";
import {Header} from "antd/es/layout/layout";
import {ValantisIcon} from "../../icons/ValantisIcon";

const headerStyle: CSSProperties = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#A52838',
};


export const HeaderLayout = () => {

    return (
        <Header style={headerStyle}>
            <ValantisIcon/>
            <h1 className={'text-3xl text-white ml-2'}>Valantis</h1>
        </Header>
    );
}
