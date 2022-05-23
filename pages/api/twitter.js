// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	fetch("https://api.twitter.com/2/tweets/search/recent?query=%23BidimBo%20%40quilivreou", {headers: {Authorization: "Bearer " + process.env.NEXT_PUBLIC_TWITTER_TOKEN}}).then(res =>res.json()
	)
		.then(json => {
			console.log(json)
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
