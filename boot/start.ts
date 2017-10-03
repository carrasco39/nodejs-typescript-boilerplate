import * as Bluebird from "bluebird";
import * as async from "async";
import * as fs from "fs";
import * as mongoose from "mongoose";
import * as config from "config";
import * as dotenv from "dotenv";
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
    // mongoose.Promise = Bluebird;
    dotenv.config();
    // const dbConfig = config.get("db");
    // console.log(dbConfig);
    // mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`);
}