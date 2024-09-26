// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Bren',
    email: 'ireloadedgames@gmail.com',
    password: '123456',
  },
];

const sampleGames = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    title: 'Halo: Combat Evolved',
    genre: 'FPS',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    title: 'Alan Wake II',
    genre: 'Action/Adventure',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    title: 'Rocket League',
    genre: 'Sports',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    title: 'Slay the Spire',
    genre: 'Strategy',
  }
];

const gameLogs = [
  {
    id: '76nf5c26-f785-44a2-ac19-586678f7c555',
    user_id: users[0].id,
    games: '[sampleGames[0].id, sampleGames[1].id]',
    year: '2024',
    status: 'active',
    games_completed: 1,
    games_dropped: 0,
    log_started: '2024-04-12'
  },
];


export { users, gameLogs, sampleGames };