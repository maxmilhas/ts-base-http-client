import { getBaseHttpClientErrorMessage } from '../../src';

type MyType = Parameters<typeof getBaseHttpClientErrorMessage>[0];

describe(getBaseHttpClientErrorMessage.name, () => {
	it('should return response.text when it is informed', () => {
		const result = getBaseHttpClientErrorMessage({
			response: { text: 'my text' },
			stack: 'my stack',
			message: 'my message',
		} as MyType);

		expect(result).toBe('my text');
	});

	it('should return err.stack when it is informed and response.text is not', () => {
		const result = getBaseHttpClientErrorMessage({
			response: {},
			stack: 'my stack',
			message: 'my message',
		} as MyType);

		expect(result).toBe('my stack');
	});

	it('should return err.message when it neither response.text or stack are informed', () => {
		const result = getBaseHttpClientErrorMessage({
			message: 'my message',
		} as MyType);

		expect(result).toBe('my message');
	});
});
