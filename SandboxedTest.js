var Docker = require("dockerode");
var docker = new Docker();
const Stream = require("stream");
var path = require("path");

// https://github.com/apocas/dockerode/commit/8a3e780799cbba3f1af75be2fe9eea4bb4e5246a

`async function main(src) {
  const syncFolder =
    "/Users/sakethr/Documents/projects/cs-autograder/myassignment";

  docker.createContainer(
    {
      Image: "svr2/node-apline-gcc-c-make",
      Cmd: [
        "/bin/sh",
        "-c",
        " chmod +x ./sync/run.sh; cd ./sync; node index.js ",
      ],
      Volumes: {
        "/sync": {},
      },
      HostConfig: {
        Binds: [syncFolder + ":/sync"],
      },
    },
    function (err, container) {
      container.attach(
        { stream: true, stdout: true, stderr: true },
        function (err, stream) {
          stream.pipe(process.stdout);
        }
      );

      container.start(function (err, data) {
        if (err) {
          return console.log("error : ", err.stack);
        }
      });
    }
  );

  /* const res = await docker.run(
    "ubuntu",
    ["bash", "-c", "cd /sync; ./run.sh"],
    process.stdout,
    {
      Image: "ubuntu",
      //   Cmd: ["/bin/bash"],
      Volumes: {
        "/sync": {},
      },
      HostConfig: {
        Binds: [syncFolder + ":/sync"],
      },
    },
    {
      Privileged: true,
      HostConfig: {
        Binds: [syncFolder + ":/sync"],
      },
    }
  ); */

  //   const res = await docker.run(
  //     "alpine",
  //     ["echo", '"hello world"'],
  //     getWritableStream()
  //   );

  //   var output = res[0];
  //   var container = res[1];

  //   const containerId = container.id.slice(0, 12);

  //   console.log(containerId);
}`;

async function run(srcFolder) {
  return new Promise((resolve, reject) => {
    var savedText = "";

    const getWritableStream = () => {
      var writableStream = new Stream.Writable();

      writableStream._write = (chunk, encoding, next) => {
        savedText += chunk.toString();
        next();
      };

      return writableStream;
    };

    var myStream = getWritableStream();

    const syncFolder = path.resolve("./sanbox-folder-template");

    docker
      .run(
        "svr2/node-apline-gcc-c-make",
        ["/bin/sh", "-c", "cd ./sync; node index.js"],
        myStream,
        {
          Volumes: {
            "/sync": {},
          },
          NetworkDisabled: true,
          HostConfig: {
            Binds: [syncFolder + ":/sync"],
          },
        }
      )
      .then(function (data) {
        var output = data[0];
        var container = data[1];
        // console.log(output.StatusCode);
        // console.log(JSON.parse(savedText));
        return container.remove();
      })
      .then(function (data) {
        // console.log("container removed");
        resolve(JSON.parse(savedText));
      })
      .catch(function (err) {
        // console.log(err);
        reject(err);
      });
  });
}

module.exports = {
  run,
};
