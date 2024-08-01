/**
 * Server side streaming events utilized by the [`backend server`]("https://voluntra.org") to be parsed client-side.
 */
type Events = 'update' | 'complete' | 'close' | 'error';

export default Events;
