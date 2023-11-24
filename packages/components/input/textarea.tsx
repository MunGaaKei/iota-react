import { InputContainer } from "./input";
import { PropsInput } from "./type";

const Textarea = (props: PropsInput, ref) => {
	return <InputContainer ref={ref} {...props} />;
};

export default Textarea;
