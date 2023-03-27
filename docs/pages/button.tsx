import { Input, Button, Icon, Checkbox } from "@p/index";
import { useEffect, useRef, useState } from "react";
import { AlternateEmailSharp, SendRound } from "@ricons/material";

export default function button(): JSX.Element {
    const [count, setCount] = useState<number>(0);
    const [text, setText] = useState<string>("");

    return (
        <>
            {/* <span onClick={() => setCount(1 + count)}>{count}</span> */}
            {text}
            <div style={{ width: 400 }}>
                <Input
                    label="中文标签"
                    prefix={
                        <Icon classname="my-auto mx-8">
                            <AlternateEmailSharp></AlternateEmailSharp>
                        </Icon>
                    }
                    suffix={
                        <Button>
                            <Icon>
                                <SendRound></SendRound>
                            </Icon>
                        </Button>
                    }
                ></Input>
            </div>
        </>
    );
}
