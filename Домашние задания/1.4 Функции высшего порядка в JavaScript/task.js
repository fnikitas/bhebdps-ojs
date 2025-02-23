//Задача № 1
function cachingDecoratorNew(func) {
    let cache = [];
    function wrapper(...args) {
      const hash = md5(JSON.stringify(args));
      const cachedItem = cache.find(item => item.hash === hash);
      if (cachedItem) {
        return `Из кеша: ${cachedItem.value}`;
      }
      const result = func(...args);
      cache.push({ hash, value: result });
      if (cache.length > 5) {
        cache.shift();
      }
      return `Вычисляем: ${result}`;
    }
    return wrapper;
  }

//Задача № 2
function debounceDecoratorNew(func, delay) {
    let timeoutId = null;
    function wrapper(...args) {
      wrapper.allCount++;
      if (!timeoutId) {
        func.apply(this, args);
        wrapper.count++;
      } else {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);
    }
    wrapper.count = 0;
    wrapper.allCount = 0;
    return wrapper;
  }
