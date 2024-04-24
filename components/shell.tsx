import { cn } from "@/lib/utils";

type Props = {
  title: string;
  className?: string;
  children?: React.ReactNode;
};
const Shell = ({ title, className, children }: Props) => {
  return (
    <main
      className={cn(
        "w-full flex flex-col container mx-auto p-4 lg:p-8 overflow-x-hidden overflow-y-auto",
        className
      )}
    >
      <h1 className="text-3xl font-semibold">{title}</h1>
      <div className="mt-8">{children}</div>
    </main>
  );
};

export default Shell;
