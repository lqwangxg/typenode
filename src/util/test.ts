export default class Greeter {
  greeting: string;
  username: string;
  constructor(uname: string) {
    this.username = uname;
    this.greeting = "welcome here."
  }
  showGreeting(){
    this.greeting = this.username + " hello, how are you?";
  }
}
