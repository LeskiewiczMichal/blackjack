import "./button.scss";

export enum ButtonColors {
  GREEN,
  RED,
}

export enum ButtonTypes {
  BUTTON = "button",
  SUBMIT = "submit",
}

export type ButtonProps = {
  text: string;
  onClick: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  color: ButtonColors;
  type: ButtonTypes;
};

export default function Button(props: ButtonProps) {
  const { text, onClick, color, type } = props;

  let colorClass = "";
  if (color === ButtonColors.GREEN) {
    colorClass = "button--green";
  } else if (color === ButtonColors.RED) {
    colorClass = "button--red";
  }

  if (type === ButtonTypes.SUBMIT) {
    return (
      <button className={colorClass} type="submit" onClick={onClick}>
        {text}
      </button>
    );
  }

  return (
    <button className={colorClass} type="button" onClick={onClick}>
      {text}
    </button>
  );
}
