import { Input, Button, Icon, Checkbox } from "@p/index";
import type { TypeInputStatus } from "@p/index";
import { useCallback, useEffect, useRef, useState, ChangeEvent } from "react";
import { AlternateEmailSharp, SendRound } from "@ricons/material";

export default function button(): JSX.Element {
    const [status, setStatus] = useState<TypeInputStatus>("normal");
    const [text, setText] = useState<string>("");

    const handleChange = useCallback((val: string) => {
        setStatus(val ? "normal" : "error");
        setText(val);
    }, []);

    return (
        <>
            <div style={{ width: 400 }}>
                <Input
                    type="email"
                    message="错误信息"
                    status="warning"
                    prefix={
                        <Icon classname="my-auto mx-8">
                            <AlternateEmailSharp></AlternateEmailSharp>
                        </Icon>
                    }
                    suffix={<Button className="bg-blue">发送</Button>}
                ></Input>

                <Input
                    label="用户名"
                    className="mt-12"
                    message="错误信息"
                    status="error"
                ></Input>

                <Input
                    label="密码"
                    type="password"
                    className="mt-12"
                    status={status}
                    message={text}
                    onChange={handleChange}
                ></Input>
            </div>
        </>
    );
}
