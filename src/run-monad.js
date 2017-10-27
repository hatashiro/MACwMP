function runMonad(Monad, asyncFn) {
  const _Promise = global.Promise;
  global.Promise = Monad;
  const result = asyncFn();
  global.Promise = _Promise;
  return result;
}
