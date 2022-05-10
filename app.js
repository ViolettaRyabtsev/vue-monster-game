function gerRandomValue(max, min) {
  return Math.floor(Math.random() * (12 - 5) + 5);
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      countAttack: 0,
      winner: null,
      logMessages: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        //draw
        this.winner = "draw";
      }
      if (value <= 0) {
        //player lost
        this.winner = "Monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //draw
        this.winner = "draw";
      }
      if (value <= 0) {
        this.winner = "Player";
        //monster lost
      }
    },
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: 0 };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarHealth() {
      if (this.playerHealth < 0) {
        return { width: 0 };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.countAttack % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      this.countAttack++;
      const attackValue = gerRandomValue(12, 5);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = gerRandomValue(15, 8);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.countAttack++;
      const attackValue = gerRandomValue(20, 10);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMessage("player", "special attack", attackValue);
    },
    healPlayer() {
      this.countAttack++;
      const healValue = gerRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
      this.addLogMessage("player", "heal", healValue);
    },
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.countAttack = 0;
      this.winner = null;
      this.logMessages = [];
    },
    surrender() {
      this.winner = "Monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionByWho: who,
        actionType: what,
        actionValue: value,
      });
      console.log(this.logMessages);
    },
  },
});

app.mount("#game");
