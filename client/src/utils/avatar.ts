import { StaticImageData } from "next/image";
export interface Avatar {
  id: number;
  name: string;
  img: StaticImageData;
}
import avatar1 from "@/utils/assets/avatars/avatar1.png";
import avatar2 from "@/utils/assets/avatars/avatar2.png";
import avatar3 from "@/utils/assets/avatars/avatar3.png";
import avatar4 from "@/utils/assets/avatars/avatar4.png";
import avatar5 from "@/utils/assets/avatars/avatar5.png";
import avatar6 from "@/utils/assets/avatars/avatar6.png";
import avatar7 from "@/utils/assets/avatars/avatar7.png";
import avatar8 from "@/utils/assets/avatars/avatar8.png";
import avatar9 from "@/utils/assets/avatars/avatar9.png";
import avatar10 from "@/utils/assets/avatars/avatar10.png";
import avatar11 from "@/utils/assets/avatars/avatar11.png";
import avatar12 from "@/utils/assets/avatars/avatar12.png";
import avatar13 from "@/utils/assets/avatars/avatar13.png";
import avatar14 from "@/utils/assets/avatars/avatar14.png";

export const avatars = [
  {
    id: 1,
    name: "Alex",
    img: avatar1,
  },
  {
    id: 2,
    name: "Cyber",
    img: avatar2,
  },
  {
    id: 3,
    name: "Shadow",
    img: avatar3,
  },
  {
    id: 4,
    name: "Sophia",
    img: avatar4,
  },
  {
    id: 5,
    name: "Ryan",
    img: avatar5,
  },
  {
    id: 6,
    name: "Professor",
    img: avatar6,
  },
  {
    id: 7,
    name: "Smarty",
    img: avatar7,
  },
  {
    id: 8,
    name: "Angry",
    img: avatar8,
  },
  {
    id: 9,
    name: "Emma",
    img: avatar9,
  },
  {
    id: 10,
    name: "Noah",
    img: avatar10,
  },
  {
    id: 11,
    name: "Hunter",
    img: avatar11,
  },
  {
    id: 12,
    name: "David",
    img: avatar12,
  },
  {
    id: 13,
    name: "Aisha",
    img: avatar13,
  },
  {
    id: 14,
    name: "Warrior",
    img: avatar14,
  },
];

export const getAvatarById = (id: number) => {
  return avatars.find((avatar) => avatar.id === id) ?? avatars[0];
};
