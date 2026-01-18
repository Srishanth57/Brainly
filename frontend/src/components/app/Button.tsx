interface ButtonProps {
  text?: string;
  onClick: () => void;
  variant: "primary" | "secondary";
}

const variantStyles = {
  primary: "bg-blue-500 text-white ",
  secondary: "text-black border-blue-300",
};

const defaultStyles = "px-6 py-2 rounded-[0.5rem] border-2 ";
const Button = (props: ButtonProps) => {
  const handleClick = () => {
   props.onClick(); 
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${variantStyles[props.variant]} ${defaultStyles} `}
    >
      {props.text}
    </button>
  );
};

export default Button;
