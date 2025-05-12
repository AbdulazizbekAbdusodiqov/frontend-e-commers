import { btnTypes, btnSizes } from "./constants";
import "./Button.scss"


const Button = (props) => {
    const { type = btnTypes.primary, size = btnSizes.md, px = 12 } = props;
    return (
        <button
            style={{ padding: `0 ${px}px 0 ${px}px` }}
            className={`button btn-${type} btn-${size}`}
        >
            {props.children}
        </button>
    )
}

export default Button