import ".//SavingBox.css";

interface BoxProps {
  children: React.ReactNode;
}

function Box({ children }: BoxProps) {
  return <div className="boxing">{children}</div>;
}

export default Box;
