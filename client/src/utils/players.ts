// import { StaticImageData } from "next/image";
import { Avatar } from "./avatar";
import { avatars } from "./avatar";
export interface Player {
  id: string;
  name: string;
  avatarId: number;
  score: number;
  connected: boolean;
  hasGuessed: boolean;
  isHost: boolean;
  status: string;
  joinedAt: number;
  socketId: string;
  reconnectToken: string;

  me?: boolean;
  host?: boolean;
  drawing?: boolean;
  guessed?: boolean;
}

// export const players: Player[] = [
//   {
//     id: 1,
//     name: "CookieCat",
//     avatar: avatars[2],
//     score: 2845,
//     drawing: false,
//     host: true,
//     me: false,
//     guessed: true,
//     connected: true,
//   },
//   {
//     id: 2,
//     name: "Risza",
//     avatar: avatars[7],
//     score: 2510,
//     drawing: true,
//     host: false,
//     me: false,
//     guessed: false,
//     connected: true,
//   },
//   {
//     id: 3,
//     name: "Acorn",
//     avatar: avatars[11],
//     score: 2280,
//     drawing: false,
//     host: false,
//     me: false,
//     guessed: true,
//     connected: true,
//   },
//   {
//     id: 4,
//     name: "Moscow",
//     avatar: avatars[4],
//     score: 1975,
//     drawing: false,
//     host: false,
//     me: false,
//     guessed: true,
//     connected: true,
//   },
//   {
//     id: 5,
//     name: "Emma",
//     avatar: avatars[8],
//     score: 1810,
//     drawing: false,
//     host: false,
//     me: false,
//     guessed: false,
//     connected: true,
//   },
//   {
//     id: 6,
//     name: "Hunter",
//     avatar: avatars[10],
//     score: 1695,
//     drawing: false,
//     host: false,
//     me: true,
//     guessed: true,
//     connected: true,
//   },
//   {
//     id: 7,
//     name: "Professor",
//     avatar: avatars[5],
//     score: 1510,
//     drawing: false,
//     host: false,
//     me: false,
//     guessed: false,
//     connected: true,
//   },
//   {
//     id: 8,
//     name: "Smarty",
//     avatar: avatars[6],
//     score: 1425,
//     drawing: false,
//     host: false,
//     me: false,
//     guessed: false,
//     connected: true,
//   },
//   {
//     id: 9,
//     name: "David",
//     avatar: avatars[3],
//     score: 1290,
//     drawing: false,
//     host: false,
//     me: false,
//     guessed: true,
//     connected: true,
//   },
//   {
//     id: 10,
//     name: "Shadow",
//     avatar: avatars[1],
//     score: 1140,
//     drawing: false,
//     host: false,
//     me: false,
//     guessed: false,
//     connected: true,
//   },
//   {
//     id: 11,
//     name: "Sophia",
//     avatar: avatars[13],
//     score: 980,
//     drawing: false,
//     host: false,
//     me: false,
//     guessed: false,
//     connected: true,
//   },
//   {
//     id: 12,
//     name: "Ryan",
//     avatar: avatars[0],
//     score: 820,
//     drawing: false,
//     host: false,
//     me: false,
//     guessed: true,
//     connected: true,
//   },
//   {
//     id: 13,
//     name: "Warrior",
//     avatar: avatars[9],
//     score: 650,
//     drawing: false,
//     host: false,
//     me: false,
//     guessed: false,
//     connected: false,
//   },
//   {
//     id: 14,
//     name: "Aisha",
//     avatar: avatars[12],
//     score: 420,
//     drawing: false,
//     host: false,
//     me: false,
//     guessed: false,
//     connected: true,
//   },
//   {
//     id: 15,
//     name: "Noah",
//     avatar: avatars[4],
//     score: 150,
//     drawing: false,
//     host: false,
//     me: false,
//     guessed: false,
//     connected: false,
//   },
// ];
