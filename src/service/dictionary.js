class Dictionary {
  #dictionary = [];
  // #dictionary = [];
  
  // викликається автоматично при створенні об'єкту (new Dictionary())
  constructor() {
    // this.#dictionary = [];
    // const dictionary = [];
    // let dictionary = [];  ---- буде доступно тільки в конструкторі
    console.log('ok')
  }
  
  async getDictionary() {
    const response = await fetch('/words.txt');
    if (!response.ok) {
      throw new Error('Failed to load dictionary');
    } else {
      const text = await response.text();
      const words = text.toUpperCase().split(/\s/).filter(word => Boolean(word));
      
      this.#dictionary = words;
      // sessionStorage.setItem('words', JSON.stringify(words));
    }
  }
  
  getAll() {
    return [...this.#dictionary]; // повертаємо копію масиву, щоб уникнути зміни оригінального масиву
  }
  
  addWord(word) {
    if (word && !this.#dictionary.includes(word)) {
      this.#dictionary.push(word);
    }
  }
}
export default new Dictionary();
