import { lazy, memo, Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuFilled } from "@ricons/material";
import { IContainer, IIcon, IButton } from "@p/index";

type DpProps = {
    name?: string;
};

const DynamicPage = memo(
    ({ name }: DpProps) => {
        const Page = lazy(() => import(`../pages/${name}`));

        return (
            <Suspense fallback={<>loading</>}>
                <Page></Page>
            </Suspense>
        );
    },
    (pp: DpProps, np: DpProps) => pp.name === np.name
);

const Header = (): JSX.Element => {
    return (
        <div className="py-8 px-12 flex">
            <IButton size="small" flat>
                <IIcon size="2em">
                    <MenuFilled></MenuFilled>
                </IIcon>
            </IButton>
        </div>
    );
};

const Sider = (): JSX.Element => {
    return <>sider</>;
};

const Footer = (): JSX.Element => {
    return <>footer</>;
};

export default function Document(): JSX.Element {
    const { name } = useParams<{ [key: string]: string }>();

    return (
        <IContainer
            layout="menu"
            header={<Header></Header>}
            sider={<Sider></Sider>}
            footer={<Footer></Footer>}
        >
            <DynamicPage name={name}></DynamicPage>
        </IContainer>
    );
}
