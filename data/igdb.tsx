async function retrieveAccessToken() {
  const response: any = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  const data = await response.json()

  process.env.IGDB_ACCESS_TOKEN = data.access_token;
}

// TODO: create typescript interface for API responses
export async function searchGames(keyword: string) {
  if (!process.env.IGDB_ACCESS_TOKEN) await retrieveAccessToken();

  let response = await fetch(`https://api.igdb.com/v4/games`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': `${process.env.IGDB_CLIENT_ID}`,
        'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
      },
      body: `fields name,genres.name;search "${keyword}";limit 15;`
    }
  )

  // TODO: refactor this code block for maintainability
  if (response.status == 401) {
    // request new access_token and call search again
    console.log('requesting new access token')
    await retrieveAccessToken();
    return await fetch(`https://api.igdb.com/v4/games`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': `${process.env.IGDB_CLIENT_ID}`,
          'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        },
        body: `fields name,genres.name;search "${keyword}";limit 15;`
      }
    )
  }
  return response;
}