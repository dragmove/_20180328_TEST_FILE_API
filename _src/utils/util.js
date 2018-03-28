export const not = (func) => {
  return (object) => {
    return !func(object);
  };
};

export const isDefined = (obj) => {
  if (obj === null || typeof obj === 'undefined') return false;

  return true;
};

export const isNotDef = not(isDefined);

export const isString = (obj) => {
  if (isNotDef(obj)) return false;

  return (obj.constructor === String);
};

export const isObject = (obj) => {
  if (isNotDef(obj)) return false;

  return (obj.constructor === Object);
};

export const namespace = function (namespace, parent) {
  if (!isString(namespace)) throw new TypeError('namespace parameter type of aid.namespace() must be String.');

  if (!(isObject(parent) || !isDefined(parent))) {
    throw new TypeError('parent parameter type of aid.namespace() must be Object or null or undefined.');
  }

  let ns = parent || window;
  if (namespace) {
    let parts = namespace.split('.');
    for (let i = 0, max = parts.length; i < max; i++) {
      if (!ns[parts[i]]) ns[parts[i]] = {};
      ns = ns[parts[i]];
    }
  }

  return ns;
};