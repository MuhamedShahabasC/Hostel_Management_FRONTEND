import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ICurrentUser } from "../../interfaces/auth";

function HeaderLinks({ currentUser }: Props) {
  const [currentLinks, setCurrentLinks] = useState<CurrentLinks>([]);

  useEffect(() => {
    let headerLinks: { name: string; link: string }[] = [];
    switch (currentUser?.role) {
      case "student": {
        headerLinks = [
          {
            name: "Chat",
            link: "/students/chat",
          },
          {
            name: "Dashboard",
            link: "/students/dashboard",
          },
          {
            name: "Complaints",
            link: "/students/complaints",
          },
          {
            name: "Meals",
            link: "/students/meals",
          },
        ];
        break;
      }
      case "staff": {
        if (currentUser?.currentUser?.department === "chef") {
          headerLinks = [
            {
              name: "Chat",
              link: `/staffs/chat`,
            },
            {
              name: `Dashboard`,
              link: `/staffs/dashboard`,
            },
            {
              name: `Complaints`,
              link: `/staffs/complaints`,
            },
            {
              name: `Meals`,
              link: `/staffs/meals`,
            },
          ];
        } else if (currentUser?.currentUser?.department === "maintenance") {
          headerLinks = [
            {
              name: "Chat",
              link: `/staffs/chat`,
            },
            {
              name: `Dashboard`,
              link: `/staffs/dashboard`,
            },
            {
              name: `Complaints`,
              link: `/staffs/complaints`,
            },
            {
              name: `Maintenance`,
              link: `/staffs/maintenance`,
            },
          ];
        } else if (currentUser?.currentUser?.department === "warden") {
          headerLinks = [
            {
              name: "Chat",
              link: `/staffs/chat`,
            },
            {
              name: `Dashboard`,
              link: `/staffs/dashboard`,
            },
            {
              name: `Complaints`,
              link: `/staffs/complaints`,
            },
            {
              name: `Warden`,
              link: `/staffs/warden`,
            },
          ];
        }
        break;
      }
      case "chiefWarden":
        headerLinks = [
          {
            name: "Chat",
            link: `/chief-wardens/chat`,
          },
          {
            name: `Dashboard`,
            link: `/chief-wardens/dashboard`,
          },
          {
            name: `Students`,
            link: `/chief-wardens/students`,
          },
          {
            name: `Meal Plans`,
            link: `/chief-wardens/mealPlans`,
          },
          {
            name: `Complaints`,
            link: `/chief-wardens/complaints`,
          },
          {
            name: `Notices`,
            link: `/chief-wardens/notices`,
          },
          {
            name: `Blocks`,
            link: `/chief-wardens/blocks`,
          },
        ];
        break;
    }
    setCurrentLinks(headerLinks);
    // eslint-disable-next-line
  }, []);

  const displayLinks =
    currentLinks &&
    currentLinks.map((el: { name: string; link: string }) => (
      <NavLink
        className="text-sm text-primary font-black"
        style={({ isActive }) => ({
          textDecoration: isActive ? "underline" : "",
          textUnderlineOffset: isActive ? "0.4rem" : "",
          color: isActive ? "#05419e" : "#00255F",
        })}
        to={el?.link}
        key={el?.name}
      >
        {el?.name}
      </NavLink>
    ));

  return <>{displayLinks}</>;
}

type CurrentLinks = { name: string; link: string }[] | [];

interface Props {
  currentUser: ICurrentUser;
}

export default HeaderLinks;
