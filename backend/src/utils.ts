export const randomStringGenerator = () => {
  const string = "asdfasdifwernczxfwenefxncsijofiw";
  const length = string.length;
  let res = "";
  for (let i = 0; i < 20; i++) {
    res += string[Math.floor(Math.random() * length)];
  }
  return res;
};
