/**
 * Server side streaming events utilized by the [`backend server`]("https://voluntra.org") to be parsed client-side.
 */
export type Events = "update" | "complete" | "close" | "error";
