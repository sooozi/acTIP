interface MainMOProps {
  children: React.ReactNode;
}

export default function MainMO({ children }: MainMOProps) {
  return <div className="mainMO">{children}</div>;
}
