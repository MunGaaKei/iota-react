import { Link } from "react-router-dom";
import { Input } from "@p/index";
import { useState } from "react";

export default function button(): JSX.Element {
    const [count, setCount] = useState<number>(0);

    return (
        <>
            <span onClick={() => setCount(1 + count)}>{count}</span>

            <Input
                label="中文标签"
                type="password"
                name="abcd"
                readOnly
                value="values"
            ></Input>
        </>
    );
}
