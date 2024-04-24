import Shell from "@/components/shell";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return <Shell title={id}>{id}</Shell>;
};

export default Page;
