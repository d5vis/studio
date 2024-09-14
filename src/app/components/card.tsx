const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="animate-appear p-4 bg-surface rounded-3xl w-full h-full">
      {children}
    </div>
  );
};

export default Card;
