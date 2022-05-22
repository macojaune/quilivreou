// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	fetch("https://api.twitter.com/2/tweets/search/recent?query=%23BidimBo%20%40quilivreou&since_id=1526043100698890240", {headers: {Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAAIOIcwEAAAAABL2ZFqeILIbMjcLodAVh61H1DNc%3DNgHophryvzSB7zZkghepWQm7RvD00TxYXDLQhqbtyIJDXnYj0v"}}).then(res =>
		res.json())
		.then(json => res.status(200).send(json?.meta?.result_count))

	//res.status(200).json(data)
}
