// Базовый класс оружия
class Weapon {
    constructor(name, attack, durability, range) {
      this.name = name;
      this.attack = attack;
      this.durability = durability;
      this.initDurability = durability;
      this.range = range;
    }
  
    takeDamage(damage) {
      this.durability = Math.max(0, this.durability - damage);
    }
  
    getDamage() {
      if (this.durability === 0) return 0;
  
      const minDurability = this.initDurability * 0.3;
      return this.durability >= minDurability ? this.attack : this.attack / 2;
    }
  
    isBroken() {
      return this.durability === 0;
    }
  }
  
  // Классы базового оружия
  class Arm extends Weapon {
    constructor() {
      super('Рука', 1, Infinity, 1);
    }
  }
  
  class Bow extends Weapon {
    constructor() {
      super('Лук', 10, 200, 3);
    }
  }
  
  class Sword extends Weapon {
    constructor() {
      super('Меч', 25, 500, 1);
    }
  }
  
  class Knife extends Weapon {
    constructor() {
      super('Нож', 5, 300, 1);
    }
  }
  
  class Staff extends Weapon {
    constructor() {
      super('Посох', 8, 300, 2);
    }
  }
  
  // Классы улучшенного оружия
  class LongBow extends Bow {
    constructor() {
      super();
      this.name = 'Длинный лук';
      this.attack = 15;
      this.range = 4;
    }
  }
  
  class Axe extends Sword {
    constructor() {
      super();
      this.name = 'Секира';
      this.attack = 27;
      this.durability = 800;
      this.initDurability = 800;
    }
  }
  
  class StormStaff extends Staff {
    constructor() {
      super();
      this.name = 'Посох Бури';
      this.attack = 10;
      this.range = 3;
    }
  }
  
  // Базовый класс персонажа
  class Player {
    constructor(position, name) {
      this.life = 100;
      this.magic = 20;
      this.speed = 1;
      this.attack = 10;
      this.agility = 5;
      this.luck = 10;
      this.description = 'Игрок';
      this.weapon = new Arm();
      this.position = position;
      this.name = name;
    }
  
    getLuck() {
      const randomNumber = Math.random() * 100;
      return (randomNumber + this.luck) / 100;
    }
  
    getDamage(distance) {
      const weaponDamage = this.weapon.getDamage();
      if (distance > this.weapon.range) return 0;
  
      return (this.attack + weaponDamage) * this.getLuck() / distance;
    }
  
    takeDamage(damage) {
      this.life = Math.max(0, this.life - damage);
      console.log(`${this.name} получил ${damage} урона, осталось ${this.life} жизни`);
    }
  
    isDead() {
      return this.life === 0;
    }
  
    moveLeft(distance) {
      const moveDistance = Math.min(distance, this.speed);
      this.position -= moveDistance;
      console.log(`${this.name} переместился влево на ${moveDistance}, позиция: ${this.position}`);
    }
  
    moveRight(distance) {
      const moveDistance = Math.min(distance, this.speed);
      this.position += moveDistance;
      console.log(`${this.name} переместился вправо на ${moveDistance}, позиция: ${this.position}`);
    }
  
    move(distance) {
      if (distance < 0) {
        this.moveLeft(Math.abs(distance));
      } else {
        this.moveRight(distance);
      }
    }
  
    isAttackBlocked() {
      const blockThreshold = (100 - this.luck) / 100;
      const isBlocked = this.getLuck() > blockThreshold;
      console.log(`${this.name} ${isBlocked ? 'заблокировал' : 'не заблокировал'} атаку`);
      return isBlocked;
    }
  
    dodged() {
      const dodgeThreshold = (100 - this.agility - this.speed * 3) / 100;
      const isDodged = this.getLuck() > dodgeThreshold;
      console.log(`${this.name} ${isDodged ? 'уклонился' : 'не уклонился'} от атаки`);
      return isDodged;
    }
  
    takeAttack(damage) {
      if (this.isAttackBlocked()) {
        this.weapon.takeDamage(damage);
        console.log(`Оружие ${this.name} получило ${damage} урона, прочность: ${this.weapon.durability}`);
      } else if (!this.dodged()) {
        this.takeDamage(damage);
      }
    }
  
    checkWeapon() {
      if (this.weapon.isBroken()) {
        if (this.weapon instanceof Axe || this.weapon instanceof Sword) {
          this.weapon = new Knife();
        } else if (this.weapon instanceof LongBow || this.weapon instanceof Bow) {
          this.weapon = new Knife();
        } else if (this.weapon instanceof StormStaff || this.weapon instanceof Staff) {
          this.weapon = new Knife();
        } else if (this.weapon instanceof Knife) {
          this.weapon = new Arm();
        }
        console.log(`${this.name} сменил оружие на ${this.weapon.name}`);
      }
    }
  
    tryAttack(enemy) {
      const distance = Math.abs(this.position - enemy.position) || 1;
      if (distance > this.weapon.range) {
        console.log(`${this.name} не достал до ${enemy.name}`);
        return;
      }
  
      const weaponWear = 10 * this.getLuck();
      this.weapon.takeDamage(weaponWear);
      console.log(`Оружие ${this.name} износилось на ${weaponWear}, прочность: ${this.weapon.durability}`);
  
      const damage = this.getDamage(distance);
      if (this.position === enemy.position) {
        enemy.moveRight(1);
        enemy.takeAttack(damage * 2);
        console.log(`${this.name} нанес ${enemy.name} двойной урон: ${damage * 2}`);
      } else {
        enemy.takeAttack(damage);
        console.log(`${this.name} нанес ${enemy.name} урон: ${damage}`);
      }
  
      this.checkWeapon();
    }
  
    chooseEnemy(players) {
      const alivePlayers = players.filter(player => !player.isDead() && player !== this);
      if (alivePlayers.length === 0) return null;
  
      const enemy = alivePlayers.reduce((min, current) =>
        current.life < min.life ? current : min
      );
      console.log(`${this.name} выбрал врага: ${enemy.name} с ${enemy.life} жизни`);
      return enemy;
    }
  
    moveToEnemy(enemy) {
      if (!enemy) return;
  
      const distance = enemy.position - this.position;
      this.move(distance);
    }
  
    turn(players) {
      const enemy = this.chooseEnemy(players);
      if (!enemy) return;
  
      this.moveToEnemy(enemy);
      this.tryAttack(enemy);
    }
  }
  
  // Базовые классы персонажей
  class Warrior extends Player {
    constructor(position, name) {
      super(position, name);
      this.life = 120;
      this.speed = 2;
      this.description = 'Воин';
      this.weapon = new Sword();
    }
  
    takeDamage(damage) {
      if (this.life < this.life * 0.5 && this.getLuck() > 0.8 && this.magic > 0) {
        this.magic = Math.max(0, this.magic - damage);
        console.log(`${this.name} получил ${damage} урона в ману, осталось ${this.magic} маны`);
      } else {
        super.takeDamage(damage);
      }
    }
  }
  
  class Archer extends Player {
    constructor(position, name) {
      super(position, name);
      this.life = 80;
      this.magic = 35;
      this.attack = 5;
      this.agility = 10;
      this.description = 'Лучник';
      this.weapon = new Bow();
    }
  
    getDamage(distance) {
      const weaponDamage = this.weapon.getDamage();
      if (distance > this.weapon.range) return 0;
  
      return (this.attack + weaponDamage) * this.getLuck() * distance / this.weapon.range;
    }
  }
  
  class Mage extends Player {
    constructor(position, name) {
      super(position, name);
      this.life = 70;
      this.magic = 100;
      this.attack = 5;
      this.agility = 8;
      this.description = 'Маг';
      this.weapon = new Staff();
    }
  
    takeDamage(damage) {
      if (this.magic > 50) {
        this.life = Math.max(0, this.life - damage / 2);
        this.magic -= 12;
        console.log(`${this.name} получил ${damage / 2} урона, осталось ${this.life} жизни и ${this.magic} маны`);
      } else {
        super.takeDamage(damage);
      }
    }
  }
  
  // Улучшенные классы персонажей
  class Dwarf extends Warrior {
    constructor(position, name) {
      super(position, name);
      this.life = 130;
      this.attack = 15;
      this.luck = 20;
      this.description = 'Гном';
      this.weapon = new Axe();
      this.hitCount = 0;
    }
  
    takeDamage(damage) {
      this.hitCount++;
  
      if (this.hitCount % 6 === 0 && this.getLuck() > 0.5) {
        super.takeDamage(damage / 2);
        console.log(`${this.name} получил половину урона: ${damage / 2}`);
      } else {
        super.takeDamage(damage);
      }
    }
  }
  
  class Crossbowman extends Archer {
    constructor(position, name) {
      super(position, name);
      this.life = 85;
      this.attack = 8;
      this.agility = 20;
      this.luck = 15;
      this.description = 'Арбалетчик';
      this.weapon = new LongBow();
    }
  }
  
  class Demiurge extends Mage {
    constructor(position, name) {
      super(position, name);
      this.life = 80;
      this.magic = 120;
      this.attack = 6;
      this.luck = 12;
      this.description = 'Демиург';
      this.weapon = new StormStaff();
    }
  
    getDamage(distance) {
      let damage = super.getDamage(distance);
      if (this.magic > 0 && this.getLuck() > 0.6) {
        damage *= 1.5;
      }
  
      return damage;
    }
  }
  
  // Функция игры
  function play(players) {
    console.log('Битва начинается!');
  
    while (players.filter(player => !player.isDead()).length > 1) {
      for (const player of players) {
        if (!player.isDead()) {
          console.log(`\nХод ${player.name}:`);
          player.turn(players);
        }
      }
    }
  
    const winner = players.find(player => !player.isDead());
    console.log(`\nПобедитель: ${winner ? winner.name : 'Никто не выжил'}`);
  }
  
  // Пример использования
  const warrior = new Warrior(0, 'Алёша Попович');
  const archer = new Archer(2, 'Леголас');
  const players = [warrior, archer];
  
  play(players);