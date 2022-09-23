const { exec } = require("child_process");

async function test1(resolve, reject) {
  exec("make", { cwd: "./src" }, (error, stdout, stderr) => {
    if (error) {
      reject({ error });
      return;
    }

    if (stderr) {
      //   reject(stderr);
      //   return;
    }

    resolve({ stdout, stderr });
  });
}

async function main() {
  var results = [];

  try {
    results.push({ success: await new Promise(test1) });
  } catch (error) {
    results.push({ error });
  }

  console.log(JSON.stringify(results));
}

main();
