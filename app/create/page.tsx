import Shell from "@/components/shell";
import Studio from "./studio";

const Page = () => {
  return (
    <Shell title="Create Music">
      <div className="my-4 grid grid-cols-2">
        <Studio />
      </div>
    </Shell>
  );
};

export default Page;
