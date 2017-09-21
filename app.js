'use strict';

const app = new Vue({
    el: '#app',
    data: {
        monsterHealth: 100,
        playerHealth: 100,
        start: true,
        finish: false,
        logs: [],
    },
    watch: {
        monsterHealth: function () {
            if (this.monsterHealth < 1) {
                this.newGame('You win! :)');
            }
        },
        playerHealth: function () {
            if (this.playerHealth < 1) {
                this.newGame('You lose! :(');
            }
            else if (this.playerHealth > 100) {
                this.playerHealth = 100;
            }
        }
    },
    methods: {
        newGame: function (message) {
            const vm = this;
            setTimeout(function () {
                const resp = confirm(message + "\n Do you want to start a new game?");
                resp ? vm.startGame() : vm.start = true;
            }, 10);
        },
        startGame: function () {
            this.monsterHealth = 100;
            this.playerHealth = 100;

            this.start = false;
            this.logs = [];
        },
        action: function (min, max, heal) {
            if (this.monsterHealth > 0 || this.playerHealth > 0) {
                const attackPlayer = this.getRandomNumber(min, max);
                const attackMonster = this.getRandomNumber(min, max);

                !heal ? this.doAction(attackPlayer, attackMonster) : this.doAction(0, attackMonster, attackPlayer);
            }
        },
        doAction: function (attackPlayer, attackMonster, heal) {
            if (!heal) {
                this.monsterHealth -= attackPlayer;
                this.playerHealth -= attackMonster;

                this.log('Player hits  monster for ' + attackPlayer, 'Monster hits  player for ' + attackMonster);
            } else {
                this.playerHealth -= (attackMonster - heal);

                this.log('Player heals  himself for ' + heal, 'Monster hits  player for ' + attackMonster);
            }
        },
        getRandomNumber: function (min, max) {
            return Math.round(Math.random() * (max - min) + min);
        },
        log: function (playerLog, monsterLog) {
            this.logs.unshift(playerLog, monsterLog);
        }

    }
})