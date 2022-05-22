// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	fetch("https://api.twitter.com/2/tweets/search/recent?query=%23BidimBo%20%40quilivreou&since_id=1526043100698890240", {headers: {Authorization: "Bearer " + process.env.NEXT_PUBLIC_TWITTER_TOKEN}}).then(res =>
		res.json())
		.then(json => res.status(200).send(json?.meta?.result_count)).catch(e =>

		//error
		res.status(404).json(e))
}
