import React from "react";
import style from "./Schema.module.scss"
import Title from "./Title";

type SchemaHeaderProps = {
    title: string;
    description: string;
    auth_required: number;
    auth_scopes: Array<string>;
}

type AuthRequiredProps = {
    auth_scopes: Array<string>;
}

const SchemaHeader:React.FC<SchemaHeaderProps> = ({ title, description, auth_required, auth_scopes }) => {

    const AuthRequired:React.FC<AuthRequiredProps> = ({ auth_scopes: scopes }) => {
        return (
            <div>
                <span className={`${style["schema-sub-text"]}`}>Auth Required: </span>
                <span>
                    {scopes.map(scope => <span className={`${style["schema-role"]} ${style["schema-sub-text"]}`} key={scope}>{scope}</span>)}
                </span>
            </div>)
    }

    return (
        <div className={`${style["schema-header"]}`}>
            <Title className={`${style["schema-title"]}`} headerSize={"h3"}>{title}</Title>
            <div className={`${style["schema-description"]}`}>
                <div className={auth_required ? `${style["schema-auth-required"]}` : ""}>
                    <div className={`${style["schema-sub-text"]} `}>{description}</div>
                </div>
                {auth_required ? (<AuthRequired auth_scopes={auth_scopes}/>) : null}
            </div>
        </div>
    )
}

export default SchemaHeader;
