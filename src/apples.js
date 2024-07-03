
class Apples {
  static _apples = [];

  static getApples = () => {
    return this._apples;
  };

  static getApple = (name) => {
    const idx = this._apples.findIndex((a) => a.name === name);
    if (idx >= 0) {
      return this._apples[idx];
    } else {
      throw new Error(`Apple "${name}" not found`);
    }
  };

  static postApple = (apple) => {
    const idx = this._apples.findIndex((a) => a.name === apple.name);
    if (idx >= 0) {
      throw new Error(`Apple ${apple.name} already exists`);
    }
    this._apples.push(apple);
    return apple;
  };

  static putApple = (name, apple) => {
    const idx = this._apples.findIndex((a) => a.name === name);
    if (idx >= 0) {
      this._apples[idx] = apple;
    } else {
      throw new Error(`Apple "${name}" not found`);
    }
    return apple;
  };

  static patchApple = (name, apple) => {
    const idx = this._apples.findIndex((a) => a.name === name);
    if (idx >= 0) {
      if (apple.name && apple.name !== name && this._apples.findIndex((a) => a.name === apple.name) >= 0) {
        throw new Error(`Cannot change "${name}" to "${apple.name}" because an apple with that name already exists`);
      }
      this._apples[idx] = {...this._apples[idx], ...apple};
    } else {
      throw new Error(`Apple "${name}" not found`);
    }
    return this._apples[idx];
  };

  static renameApple = (oldName, newName) => {
    const idx = this._apples.findIndex((a) => a.name === oldName);
    if (idx >= 0) {
      if (newName && this._apples.findIndex((a) => a.name === newName) >= 0) {
        throw new Error(`Cannot change "${oldName}" to "${newName}" because an apple with that name already exists`);
      }
      this._apples[idx].name = newName;
    } else {
      throw new Error(`Apple "${oldName}" not found`);
    }
    return this._apples[idx];
  };

  // static patchApple = (name, updatedApple) => {
  //   const appleIndex = this._apples.findIndex(apple => apple.name === name);
  //   if (appleIndex === -1) {
  //     throw new Error(`Apple "${name}" not found`);
  //   }

  //   const newName = updatedApple.name;
  //   if (newName && newName !== name && this._apples.some(apple => apple.name === newName)) {
  //     throw new Error(`Cannot change "${name}" to "${newName}" because an apple with that name already exists`);
  //   }
    
  //   const existingApple = this._apples[appleIndex];
  //   this._apples[appleIndex] = { ...existingApple, ...updatedApple };
  //   return this._apples[appleIndex];
  // };

  static deleteApple = (name) => {
    const idx = this._apples.findIndex((a) => a.name === name);
    if (idx >= 0) {
      this._apples.splice(idx, 1);
    }
    return {message: `Apple "${name}" deleted`};
  };

}

module.exports = {
  ...Apples
};