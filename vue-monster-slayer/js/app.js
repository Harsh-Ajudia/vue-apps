new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isGameRunning: false,
        turnLogs: []
    },
    methods: {
        startGame: function () {
            this.isGameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turnLogs = [];
        },
        endGame: function () {
            this.startGame();
        },
        attack: function () {
            var damage = this.calculateDamage(10, 3);
            this.monsterHealth -= damage;
            this.turnLogs.unshift({
                isPlayer: true,
                text: "Player hits Monster with A for " + damage
            })
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();

        },
        specialAttack: function () {
            var damage = this.calculateDamage(20, 10);
            this.monsterHealth -= damage;
            this.turnLogs.unshift({
                isPlayer: true,
                text: "Player hits Monster with SpA for " + damage
            })
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turnLogs.unshift({
                isPlayer: true,
                text: "Player heals himself for 10"
            })
            this.monsterAttack();
        },
        calculateDamage: function (max, min) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        monsterAttack: function () {
            var damage = this.calculateDamage(12, 5);
            this.playerHealth -= damage;
            this.checkWin();
            this.turnLogs.unshift({
                isPlayer: false,
                text: "Monster hits Player with A for " + damage
            })
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New game?')) {
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New game?')) {
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
                return true;
            }
            return false;
        }
    }
})