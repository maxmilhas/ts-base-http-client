// TODO: Passar este arquivo para o @maxmilhas/logger
type LeveledLogMethod = (message: string, meta?: unknown) => Logger;

export interface Logger {
	error: LeveledLogMethod;
	warn: LeveledLogMethod;
	info: LeveledLogMethod;
	verbose: LeveledLogMethod;
	debug: LeveledLogMethod;
	silly: LeveledLogMethod;
}
