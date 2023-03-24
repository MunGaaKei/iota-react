import { Input } from "@p/index";
import { useEffect, useRef, useState } from "react";

export default function button(): JSX.Element {
    const [count, setCount] = useState<number>(0);
    const [text, setText] = useState<string>("value");

    return (
        <>
            {/* <span onClick={() => setCount(1 + count)}>{count}</span> */}

            <div style={{ width: 200 }}>
                <Input
                    label="中文标签"
                    name="sdf"
                    placeholder="placeholder"
                    value={text}
                    onChange={(value: string) => setText(value)}
                ></Input>
            </div>
        </>
    );
}
