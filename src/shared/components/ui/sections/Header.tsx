interface HeaderProps {
  title: string;
  paragraph?: string;
}

export const Header = ({ title, paragraph }: HeaderProps) => {
  return (
    <header>
      <h1 className="text-3xl font-bold">{title}</h1>
      {paragraph && <p className="text-sm text-slate-600">{paragraph}</p>}
    </header>
  );
};
