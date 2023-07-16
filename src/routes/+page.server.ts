export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const flexMessage = data.get('flexMessage');
		const accessToken = data.get('accessToken');
		// flexMessageとaccessTokenがstringであることを確認。そうでなければエラーを投げる
		if (typeof flexMessage !== 'string' || typeof accessToken !== 'string') {
			throw new Error('flexMessage or accessToken is required');
		}
		// send flex message using broadcast
		const res = await fetch('https://api.line.me/v2/bot/message/broadcast', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify({
				messages: [
					{
						type: 'flex',
						altText: 'Flex Message',
						contents: JSON.parse(flexMessage)
					}
				]
			})
		});

		if (!res.ok) {
			throw new Error(`failed to send flex message: ${res.status} ${res.statusText}`);
		}
		return {
			success: true
		};
	}
};
