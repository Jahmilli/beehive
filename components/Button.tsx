type ButtonAction = "info" | "warning";

type ButtonProps = {
  text: string;
  onClick: () => void;
  action: ButtonAction;
  className?: string;
};

const buttonStyles: Record<ButtonAction, string> = {
  info: "text-white bg-info",
  warning: "text-white bg-warning",
};

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  action,
  className = "",
}) => {
  const buttonStyle = buttonStyles[action];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-2 px-4 rounded-lg ${buttonStyle} ${className}`}
    >
      {text}
    </button>
  );
};
