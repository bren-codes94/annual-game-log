async function retrieveAccessToken() {
  const response: any = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  const data = response.json()

  process.env.IGDB_ACCESS_TOKEN = data.access_token;
}

export async function searchGames(keyword: string) {
  // query the games endpoint using the keyword param
  if (!process.env.IGDB_ACCESS_TOKEN) await retrieveAccessToken();

  return await fetch(`https://api.igdb.com/v4/games`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': `${process.env.IGDB_CLIENT_ID}`,
        'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
      },
      body: `fields name,genres.name;search "${keyword}";limit 15;`,
      cache: 'no-cache'
    }
  )
}