const express = require('express');
const cors = require('cors');
const app = express();
const port = 6378;

app.use(cors());

const GameStatus = {
    ACTIVE: 1,
    PLAYING: 2,
    FINISHED: 3,
};

const activeGames = [
    {
        id: 1,
        player: {
            name: 'creator-1',
        },
        opponent: {
            name: 'joiner'
        },
        createdAt: new Date(),
        status: GameStatus.PLAYING,
    },
    {
        id: 2,
        player: {
            name: 'creator-2',
        },
        createdAt: new Date(),
        status: GameStatus.ACTIVE,
    }
];

app.get('/games', (req, res) => res.json(activeGames));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
