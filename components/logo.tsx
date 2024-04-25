import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Image src="/logo.svg" alt="Logo" width={100} height={100} priority />
    </div>
  );
};

export default Logo;
