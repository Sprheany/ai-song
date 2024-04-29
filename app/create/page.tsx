import Shell from "@/components/shell";
import Creations from "./creations";
import Studio from "./studio";

const Page = () => {
  return (
    <Shell title="Create Music">
      <div className="my-4 grid grid-cols-3 2xl:grid-cols-2 gap-8">
        <Studio />
        <div className="col-span-2 2xl:col-span-1">
          <Creations />
        </div>
      </div>
    </Shell>
  );
};

export default Page;
