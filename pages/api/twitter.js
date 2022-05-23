// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	fetch(/*"https://api.twitter.com/2/tweets/search/recent?query=%23BidimBo%20%40quilivreou"*/
		"https://api.twitter.com/2/users/703370685893062657/mentions?max_results=100&since_id=1526043100698890240&tweet.fields=public_metrics",
	 {headers: {Authorization: "Bearer " + process.env.NEXT_PUBLIC_TWITTER_TOKEN}}).then(res =>res.json()
	)
		.then(json => {
			if(json?.errors)
				throw new Error(json.errors[0])
			return res.status(200).send(json?.meta?.result_count)
		})
		.catch(e =>
		//error
			{
				console.error(e)
				return res.status(404)
			}
		)
}
