function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

// const checking = () => {
//   let count = 1;
//   return async (till) => {
//     while (count < till) {
//       await sleep(1000);
//       console.log(count);
//       count++;
//     }
//   };
// };

// const first = checking();
// first(12);

let a = 5;
setTimeout(() => {
  console.log(a);
}, 3000);
// const func = async () => {
//   await sleep(3000);
// };

// func();

a = 10;

module.exports.sleep = sleep;
