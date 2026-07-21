export enum ClientEvent {
  CREATE_ROOM = "room:create",
  JOIN_ROOM = "room:join",
  LEAVE_ROOM = "room:leave",

  START_GAME = "game:start",
  CHOOSE_WORD = "game:choose-word",

  DRAW = "drawing:draw",
  CLEAR = "drawing:clear",
  UNDO = "drawing:undo",

  CHAT_MESSAGE = "chat:message",
}

export enum ServerEvent {
  ROOM_CREATED = "room:created",
  ROOM_UPDATED = "room:updated",

  PLAYER_JOINED = "player:joined",
  PLAYER_LEFT = "player:left",

  GAME_STARTED = "game:started",

  GAME_COUNTDOWN = "game:countdown", // NEW

  WORD_CHOICES = "game:word-choices",

  ROUND_STARTED = "game:round-started",

  GAME_TIMER = "game:timer", // NEW

  ROUND_ENDED = "game:round-ended",

  GAME_FINISHED = "game:finished",
  DRAW = "drawing:draw",

  DRAWING_UPDATED = "drawing:update",
  DRAWING_UNDO = "drawing:undo",
  DRAWING_CLEAR = "drawing:clear",

  CHAT_NEW = "chat:new",
  CHAT_CORRECT = "chat:correct",

  ERROR = "error",
}
