import Image from "next/image";

const Header = () => {
  return (
    <div className="bg-wwr_yellow_orange w-screen max-w-full">
      <div className="w-4/5 m-auto flex justify-between items-end py-3">
        <Image
          className="w-80 pt-4 pb-1"
          src="/wwr-logo.svg"
          alt="logo"
          width={200}
          height={200}
        ></Image>
        <ul className="uppercase flex gap-4 min-w-max tracking-widest">
          <li className="hover:text-wwr_white cursor-pointer">Media Content</li>
          <li className="hover:text-wwr_white cursor-pointer">Education</li>
          <li className="hover:text-wwr_white cursor-pointer">Take Part</li>
          <li className="hover:text-wwr_white cursor-pointer">About</li>

          <li>
            <a
              href={`/en/stories`}
              className="hover:text-wwr_white cursor-pointer"
            >
              EN
            </a>
            /
            <a
              href={`/de/stories`}
              className="hover:text-wwr_white cursor-pointer"
            >
              DE
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
