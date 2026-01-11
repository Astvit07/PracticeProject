class User {
  constructor(name,age) {
    this.name = name;
    this.age = age;
    this.usersList = [{id: 1, name: name, age: age}];
    console.log('Класс створено');
  }

  userInfo(){
    console.log(`Ім'я: ${this.name}, Вік: ${this.age}`);
  }

  userAge(){
    console.log(`Вік: ${this.age}`);
  }

  birthday() {
    this.age += 1;
    console.log(`Вік після дня народження: ${this.age}`);
  }

  addUser(name, age) {
    const newUser = {
      id: Date.now(),
      name,
      age
    };
    this.usersList.push(newUser);
    console.log(`Користувача ${name} додано до списку`);
    return newUser;
  }


  getAllUsers() {
    console.log('Список користувачів:');
    this.usersList.forEach(user => {
      console.log(`ID: ${user.id}, Ім'я: ${user.name}, Вік: ${user.age}`);
    });
    return this.usersList;
  }

}
export default new User('Vitalii', 31);
