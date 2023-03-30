import { ReactNode, useEffect, useRef, forwardRef, useState } from "react";
import "./container.scss";

export type TypeContainer = {
    layout?: "default" | "menu";
    breakpoint?: number;
    sider?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
} & TypeSider;

export type TypeSider = {
    children?: ReactNode;
    collapsed?: boolean;
};

const SiderLayout = forwardRef<HTMLDivElement, TypeSider>((props, ref) => {
    const { children, collapsed = false } = props;

    if (!children) return <></>;

    return (
        <div
            className="i-sider"
            style={{ transform: collapsed ? `translate3d(-100%, 0, 0)` : "" }}
            ref={ref}
        >
            {children}
        </div>
    );
});

const HeaderLayout = ({ children }: { children: ReactNode }) => {
    return children ? (
        <header className="i-header sticky bg-blur">{children}</header>
    ) : (
        <></>
    );
};

const FooterLayout = ({ children }: { children: ReactNode }) => {
    return children ? <footer className="i-footer">{children}</footer> : <></>;
};

const Container = ({
    layout = "default",
    collapsed = false,
    breakpoint,
    header: Header,
    sider: Sider,
    footer: Footer,
    children,
}: TypeContainer): JSX.Element => {
    const siderEl = useRef<HTMLDivElement>(null);
    const [contentStyle, setContentStyle] = useState<Record<string, string>>(
        {}
    );

    useEffect(() => {
        if (!Sider || !siderEl.current) return;

        const siderWidth = siderEl.current.offsetWidth;
        setContentStyle(
            collapsed
                ? {
                      ["marginLeft"]: `-${siderWidth}px`,
                  }
                : {}
        );
    }, [collapsed, breakpoint]);

    switch (layout) {
        case "menu":
            return (
                <div className="i-container flex">
                    <SiderLayout ref={siderEl} collapsed={collapsed}>
                        {Sider}
                    </SiderLayout>
                    <div className="i-content" style={contentStyle}>
                        <HeaderLayout>{Header}</HeaderLayout>
                        {children}
                        <FooterLayout>{Footer}</FooterLayout>
                    </div>
                </div>
            );
        default:
            return (
                <div className="i-container">
                    <HeaderLayout>{Header}</HeaderLayout>
                    <div className="flex">
                        <SiderLayout ref={siderEl} collapsed={collapsed}>
                            {Sider}
                        </SiderLayout>
                        <div className="i-content" style={contentStyle}>
                            {children}
                        </div>
                    </div>
                    <FooterLayout>{Footer}</FooterLayout>
                </div>
            );
    }
};

export default Container;
