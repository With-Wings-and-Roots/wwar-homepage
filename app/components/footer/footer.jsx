import Link from "next/link";
import React from "react";
import NewsLetter from "./newsLetter";

const Footer = async () => {
  const menuId = await getMenuId();

  const menuItems = await getMenuItems(menuId);

  // Media, Content, Education, Take part, About
  const topLevelMenuItems = menuItems.filter((item) => {
    return item.menu_item_parent === "0";
  });

  const getSubMenuItems = (parentId) => {
    const subMenuItems = menuItems.filter((item) => {
      return item.menu_item_parent.localeCompare(parentId) === 0;
    });

    return subMenuItems;
  };

  return (
    <div className="bg-wwr_rich_black w-full text-wwr_white p-10">
      <div className="w-10/12 m-auto">
        <div className="grid grid-cols-4 gap-4">
          {topLevelMenuItems.map((item, index) => {
            return (
              <div key={index}>
                <div className="pb-4 text-xl font-medium uppercase">
                  {item.title}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {getSubMenuItems(item.ID).map((subItem, index) => {
                    return (
                      <div key={index} className="font-thin text-lg">
                        <Link href={subItem.url}>
                          {subItem.title.localeCompare("FROM HERE FILM") === 0
                            ? "FROM HERE film >"
                            : subItem.title}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <NewsLetter />
      </div>
    </div>
  );
};

export default Footer;

const getMenuId = async (_) => {
  const res = await fetch(
    "https://wwar2022.backslashseven.com/wp-json/wwarrest/v1/menu"
  );

  const data = await res.json();

  return data.primary;
};

const getMenuItems = async (id) => {
  const res = await fetch(
    "https://wwar2022.backslashseven.com/wp-json/wwarrest/v1/menu/" + id
  );
  const data = await res.json();

  return data;
};
