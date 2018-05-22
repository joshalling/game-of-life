import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component
{

    getNeighbors(spaceId)
    {
        let neighbors = 0;
        let surroundingSpaces = [-51, -50, -49, -1, 1, 49, 50, 51];

        for (let j = 0; j < surroundingSpaces.length; j++) {
            let neighborId = spaceId + surroundingSpaces[j];
            if (neighborId > 0 && neighborId < 1751) {
                let surroundingSpace = document.getElementById("" + neighborId);
                if (surroundingSpace.classList.contains('alive')) {
                    neighbors++;
                }
            }
        }

        return neighbors;
    }

    passGeneration()
    {
        let spaces = document.getElementsByClassName('game-space');
        for (let i = 0; i < spaces.length; i++) {
            let space = spaces.item(i);
            let spaceId = parseInt(space.id);
            let neighbors = this.GameBox.prototype.getNeighbors(spaceId);

            if (space.classList.contains('alive')) {
                if (neighbors > 1 && neighbors < 4) {
                    space.classList.remove('young');
                    space.classList.add('old');
                } else {
                    space.classList.remove('young', 'old');
                    space.classList.add('dying');
                }
            } else if (neighbors === 3) {
                space.classList.add('born', 'young');
            }
        }
      
        this.GameBox.prototype.updateBoard();
    }

    randomizeSpaces()
    {
        let spaces = document.getElementsByClassName('game-space');
        for (let i = 0; i < spaces.length; i++) {
            if (Math.random() < 0.25) {
                spaces.item(i).classList.add('young', 'alive');
            }
        }
    }
  
    updateBoard() 
    {        
        let bornSpaces = document.getElementsByClassName('born');
        let bornLength = bornSpaces.length;
        let dyingSpaces = document.getElementsByClassName('dying');
        let dyingLength = dyingSpaces.length;
      
        for (let i = 0; i < bornLength; i++) {
            bornSpaces.item(0).classList.add('alive');
            bornSpaces.item(0).classList.remove('born');
        }


        for (let i = 0; i < dyingLength; i++) {
            dyingSpaces.item(0).classList.remove('dying', 'alive');
        }
    }

    render()
    {
        return (
            <div>
                <TopMenu playGame={this.playGame} clearBoard={this.clearBoard}/>
                <GameBoard/>
            </div>
        );
    }
}

class TopMenu extends React.Component
{

    clearBoard()
    {
        this.TopMenu.prototype.pauseGame();
        this.GameBox.prototype.updateBoard();
        let livingSpaces = document.getElementsByClassName('alive');
        let length = livingSpaces.length;
        for (let i = 0; i < length; i++) {
            livingSpaces.item(0).classList.remove('alive', 'old', 'young');
        }
    }

    playGame()
    {
        let livingSpaces = document.getElementsByClassName('alive');
        if (livingSpaces.length === 0) {
            this.GameBox.prototype.randomizeSpaces();
        }
        if (!window.intervalId) {
            window.intervalId = setInterval(this.GameBox.prototype.passGeneration, 100);
        }

    }

    pauseGame()
    {
        clearInterval(window.intervalId);
        window.intervalId = false;
    }

    render()
    {
        return (
            <div className="top-menu-container text-center">
                <div className="menu-btn" onClick={this.playGame}>Play</div>
                <div className="menu-btn" onClick={ () => this.pauseGame()}>Pause</div>
                <div className="menu-btn" onClick={this.clearBoard}>Clear</div>
            </div>
        );
    }
}

class GameBoard extends React.Component
{
    render()
    {
        let spaces = [];
        for (let i = 0; i < 1750; i++)
            spaces.push(<GameSpace space={i +1}/>);
        return (
            <div className="game-board clearfix">{spaces}</div>
        );
    }
}

class GameSpace extends React.Component
{
    setSpace(event)
    {
        let targetClasses = event.target.classList;
        if (targetClasses.contains('alive')) {
            targetClasses.remove('alive', 'old', 'young');
        } else {
            targetClasses.add('alive', 'young');
        }
    }

    render()
    {
        return (
            <div className="game-space" id={this.props.space} onClick={this.setSpace}></div>
        );
    }
}

export default App;
