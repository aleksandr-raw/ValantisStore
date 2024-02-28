import {ConfigProvider} from "antd";
import React, {ReactNode} from "react";
import {PaginationConfig} from "./AntdComponentsConfig/PaginationConfig";
import {CardConfig} from "./AntdComponentsConfig/CardConfig";
import {SpinConfig} from "./AntdComponentsConfig/SpinConfig";
import {SelectConfig} from "./AntdComponentsConfig/SelectConfig";
import {ButtonConfig} from "./AntdComponentsConfig/ButtonConfig";
import {InputConfig} from "./AntdComponentsConfig/InputConfig";


interface AntConfigProviderProps {
    children: ReactNode;
}

export const AntConfigProvider = ({children}: AntConfigProviderProps) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Pagination: PaginationConfig,
                    Card: CardConfig,
                    Spin: SpinConfig,
                    Select: SelectConfig,
                    Button: ButtonConfig,
                    Input: InputConfig
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}
