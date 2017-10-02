import * as Bluebird from "bluebird";
import * as async from "async";
import * as fs from "fs";
const fis: any = Bluebird.promisifyAll(fs);

export async function start() {
    if (!fis.existsSync(".env")) {
        await (() => {
            return new Bluebird((resolve, reject) => {
                const iStream = fis.createReadStream(".env.example");
                const oStream = fis.createWriteStream(".env");

                const onError = (err: any) => {
                    iStream.destroy();
                    oStream.end();

                    reject(err);
                };

                iStream.on("error", onError);
                oStream.on("error", onError);

                oStream.on("finish", resolve);

                iStream.pipe(oStream);
            });
        });
    }
}