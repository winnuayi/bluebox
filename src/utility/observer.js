class Observable {
  constructor() {
    this.observers = []
  }

  subscribe(obj) {
    this.observers.push(obj)
  }

  unsubscribe(obj) {
    this.observers = this.observers.filter(observer => observer !== component)
  }

  notify(state) {
    this.observers.forEach((observer) => {
      observer.render(state);
    })
  }

  // return proxy object for component's private state
  createState(state={}) {
    let that = this;

    return new Proxy(state, {
      get(target, property) {
        return target[property];
      },

      set(target, property, value) {
        target[property] = value;
        that.notify(state);
        return true;
      }
    });
  }

  // implementation ditulis di inheritance class
  render() {}
}

