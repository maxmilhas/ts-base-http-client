type MyError =
	| (Error & {
			response?: {
				text?: string;
			};
	  })
	| undefined;

export function getBaseHttpClientErrorMessage(err: unknown): string {
	return (
		(err as MyError)?.response?.text ??
		(err as MyError)?.stack ??
		(err as MyError)?.message ??
		'unknown error'
	);
}
