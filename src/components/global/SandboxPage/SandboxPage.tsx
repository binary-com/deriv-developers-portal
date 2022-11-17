import React from 'react';
import { SandboxIframe } from '../../utility/SandboxIframe/SandboxIframe';

interface SandboxPageProps {
    title: string;
    description: {
        before: React.ReactNode;
        after: React.ReactNode;
    };
    sandbox: string;
}

export default function SandboxPage({ title, description, sandbox }: SandboxPageProps) {
    return (
        <div>
            <h3>{title}</h3>
            <React.Fragment>{description?.before}</React.Fragment>
            <SandboxIframe sandbox={sandbox} />
            <React.Fragment>{description?.after}</React.Fragment>
        </div>
    );
}
