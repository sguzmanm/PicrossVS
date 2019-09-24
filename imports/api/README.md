# BACKEND

Models

```
Users:
{
    username,
    password,
    totalScore
}
```

```
Boards:{
    name: 'xxx',
    rows:[]=a-b-c,
    columns:[]=d-e-f,
    goal:[][]=0/1,
    '''curCells:[][]=0/1/2/-1(Undefined,correct,flagged,incorrect)''' (Only during a match)
}
```

// Puntaje?

- 100 por cada casilla
- -400 por casilla mal puesta
- -2000 por abandono
- 500-100\*n por orden de completitud

```
Game: {
    state:0/1/2/3 (WaitingForPlayers,Active,Finished,Cancelled),
    players:[]={user,boards:Board, curScore},
    numWaitedUsers (Num of users the game should wait for),
    board: Base board for the game
}
```
