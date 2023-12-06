import React from "react";
import Image from "next/image";
import { getMenuId, getMenuItems } from "@/app/utilities/stories";
import HeaderMenuItems from "./headerMenuItems";
import LanguageSelector from "./languageSelector";

const Header = async () => {
  const menuId = await getMenuId();

  const menuItems = await getMenuItems(menuId);

  // Media, Content, Education, Take part, About
  const topLevelMenuItems = menuItems.filter((item) => {
    return item.menu_item_parent === "0";
  });

  return (
    <div className="bg-wwr_yellow_orange w-screen max-w-full text-base">
      <div className="global_width m-auto flex justify-between items-stretch">
        <div className="py-3">
          <Image
            className="w-80 pt-4 pb-1"
            src="/wwr-logo.svg"
            alt="logo"
            width={200}
            height={200}
          ></Image>
        </div>

        <ul className="uppercase flex min-w-max tracking-widest min-h-full">
          <li className="z-30 w-10 bg-wwr_yellow_orange relative"></li>
          {topLevelMenuItems.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <HeaderMenuItems
                  item={item}
                  menuItems={menuItems}
                  index={index}
                />
              </React.Fragment>
            );
          })}

          <li className="py-3 pl-3 relative z-30 bg-wwr_yellow_orange h-full flex items-end">
            <LanguageSelector />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
