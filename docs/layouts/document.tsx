import { lazy, memo, Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuFilled } from "@ricons/material";
import { Container, Icon, Button } from "@p/index";

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

const Header = ({
    onToggleSider,
}: {
    onToggleSider: Function;
}): JSX.Element => {
    return (
        <div className="py-8 px-12 flex">
            <Button size="small" flat onClick={() => onToggleSider()}>
                <Icon size="2em">
                    <MenuFilled></MenuFilled>
                </Icon>
            </Button>
        </div>
    );
};

const Sider = (): JSX.Element => {
    return <></>;
};

const Footer = (): JSX.Element => {
    return <></>;
};

export default function Document(): JSX.Element {
    const { name } = useParams<{ [key: string]: string }>();
    const [collapsed, toggleCollapsed] = useState<boolean>(false);

    return (
        <Container
            layout="menu"
            collapsed={collapsed}
            header={
                <Header
                    onToggleSider={toggleCollapsed.bind(null, !collapsed)}
                ></Header>
            }
            // sider={<Sider></Sider>}
            footer={<Footer></Footer>}
        >
            <div className="pd-12">
                <DynamicPage name={name}></DynamicPage>
            </div>
        </Container>
    );
}
