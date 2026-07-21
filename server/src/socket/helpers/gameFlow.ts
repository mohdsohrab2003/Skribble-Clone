import { gameManager } from "../../managers/GameManager.js";
import { timerManager } from "../../managers/TimerManager.js";
import { gameService } from "../../services/game.service.js";
import { roomService } from "../../services/room.service.js";
import { GameEmitter } from "../emitters/game.js";

export function finishTurn(roomCode: string, emitter: GameEmitter) {
  console.log("========== FINISH TURN ==========");

  const room = roomService.getRoom(roomCode);

  if (!room) {
    console.log("Room not found");
    return;
  }

  console.log("Room:", room.code);
  console.log("Current Round:", room.currentRound);
  console.log("Current Turn:", room.currentTurn);

  timerManager.clear(`${room.code}:drawing`);
  timerManager.clear(`${room.code}:choose-word`);
  timerManager.clear(`${room.code}:countdown`);
  timerManager.clear(`${room.code}:next-turn`);

  const endedRoom = gameService.endTurn(room.code);

  console.log("Round ended");

  emitter.roundEnded(endedRoom);

  timerManager.create(
    `${room.code}:next-turn`,
    () => {
      console.log("Starting next turn...");

      const currentRoom = roomService.getRoom(room.code);

      if (!currentRoom) {
        console.log("Current room missing");
        return;
      }

      const nextRoom = gameService.nextTurn(currentRoom.code);
      emitter.clearCanvas(nextRoom.code);

      console.log(
        "Next Turn:",
        nextRoom.currentTurn,
        "Round:",
        nextRoom.currentRound,
        "Drawer:",
        nextRoom.currentDrawer,
      );

      if (nextRoom.status === "finished") {
        console.log("Game finished");
        emitter.gameFinished(nextRoom);
        return;
      }

      console.log("Starting countdown...");
      startCountdown(nextRoom.code, emitter);
    },
    5000,
  );
}
export function startCountdown(roomCode: string, emitter: GameEmitter) {
  const room = roomService.getRoom(roomCode);

  if (!room) return;

  console.log("COUNTDOWN START");

  let countdown = 3;

  emitter.countdown(room, countdown);

  timerManager.createInterval(
    `${room.code}:countdown`,
    () => {
      countdown--;

      console.log("COUNTDOWN:", countdown);

      if (countdown > 0) {
        emitter.countdown(room, countdown);
        return;
      }

      console.log("COUNTDOWN FINISHED");

      timerManager.clear(`${room.code}:countdown`);

      startChooseWord(room.code, emitter);
    },
    1000,
  );
}

export function startChooseWord(roomCode: string, emitter: GameEmitter) {
  const room = roomService.getRoom(roomCode);

  if (!room) return;

  console.log("START CHOOSE WORD");
  console.log("Drawer:", room.currentDrawer);
  console.log("Choices:", room.wordChoices);

  emitter.sendWordChoices(room);

  console.log("WORD CHOICES EMITTED");

  let seconds = room.chooseWordTime;

  emitter.timer(room, seconds);

  timerManager.createInterval(
    `${room.code}:choose-word`,
    () => {
      seconds--;

      emitter.timer(room, seconds);

      if (seconds > 0) return;

      timerManager.clear(`${room.code}:choose-word`);

      const updatedRoom = roomService.getRoom(room.code);

      if (!updatedRoom) return;

      // Word already selected by drawer
      if (updatedRoom.currentWord) return;

      const randomWord =
        updatedRoom.wordChoices[
          Math.floor(Math.random() * updatedRoom.wordChoices.length)
        ];

      gameService.chooseWord(
        updatedRoom.code,
        updatedRoom.currentDrawer!,
        randomWord,
      );

      startDrawing(updatedRoom.code, emitter);
    },
    1000,
  );
}

export function startDrawing(roomCode: string, emitter: GameEmitter) {
  const room = roomService.getRoom(roomCode);

  if (!room) return;

  emitter.roundStarted(room);

  let seconds = room.settings.drawTime;
  let finished = false;

  emitter.timer(room, seconds);

  timerManager.createInterval(
    `${room.code}:drawing`,
    () => {
      if (finished) return;

      const latestRoom = roomService.getRoom(room.code);

      if (!latestRoom) {
        finished = true;
        timerManager.clear(`${room.code}:drawing`);
        return;
      }

      seconds--;

      emitter.timer(latestRoom, seconds);

      // Finish early if everyone guessed
      if (latestRoom.status === "round-end") {
        finished = true;
        finishTurn(room.code, emitter);
        return;
      }

      // Continue drawing
      if (seconds > 0) {
        return;
      }

      // Time over
      finished = true;
      finishTurn(room.code, emitter);
    },
    1000,
  );
}
