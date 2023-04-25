type SeperatorLineProps = {
  text: string;
};

export default function SeperatorLine(props: SeperatorLineProps) {
  const { text } = props;

  return (
    <div className="login-page-line-container">
      <span className="login-page-line" />
      <span className="login-page-line-text">{text}</span>
      <span className="login-page-line" />
    </div>
  );
}
