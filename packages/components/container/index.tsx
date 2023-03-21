import { ReactNode, useEffect, useRef, forwardRef } from "react";
import "./container.scss";

export type TypeProps = {
    layout?: "default" | "menu";
    breakpoint?: number;
    sider?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
} & TypeSider;

type TypeSider = {
    children?: ReactNode;
    collapsed?: boolean;
    reverse?: boolean;
};

const toggleSider = () => {};

const SiderLayout = forwardRef<HTMLDivElement, TypeSider>((props, ref) => {
    const { children, collapsed = false, reverse = false } = props;

    return (
        <div
            className="i-sider"
            style={{ transform: collapsed ? `translate(-100%, 0)` : "" }}
            ref={ref}
        >
            {children}
        </div>
    );
});

const Container = ({
    layout = "default",
    collapsed = false,
    breakpoint,
    header: Header,
    sider: Sider,
    footer: Footer,
    children,
}: TypeProps): JSX.Element => {
    const isDefaultLayout = layout === "default";
    const siderEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!Sider) return;

        console.log("collapsed change", siderEl.current);
    }, [collapsed, breakpoint]);

    return (
        <div className={`i-container ${isDefaultLayout ? "" : "flex"}`}>
            {isDefaultLayout ? (
                <>
                    {Header && (
                        <header className="i-header sticky bg-blur">
                            {Header}
                        </header>
                    )}
                    <div className="flex">
                        {Sider && (
                            <SiderLayout ref={siderEl}>{Sider}</SiderLayout>
                        )}
                        <div className="i-content">{children}</div>
                    </div>
                    {Footer && <footer className="i-footer">{Footer}</footer>}
                </>
            ) : (
                <>
                    {Sider && <SiderLayout ref={siderEl}>{Sider}</SiderLayout>}
                    <div className="i-content">
                        {Header && (
                            <header className="i-header sticky bg-blur">
                                {Header}
                            </header>
                        )}
                        {children}
                        {Footer && (
                            <footer className="i-footer">{Footer}</footer>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Container;
