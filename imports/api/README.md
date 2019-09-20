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

```
Game: {
    state:0/1/2 (WaitingForPlayers,Active,Finished),
    players:[]={user,boards:Board, curScore},
    numWaitedUsers (Num of users the game should wait for)
}
```
