import { Link } from "react-router-dom";
import { IButton } from "@p/index";
import { useState } from "react";

export default function button(): JSX.Element {
    const [loading, setLoading] = useState<number>(0);

    return (
        <>
            <span onClick={() => setLoading(1 + loading)}>{loading}</span>
            <div style={{ height: 2000 }}>Content</div>
        </>
    );
}
