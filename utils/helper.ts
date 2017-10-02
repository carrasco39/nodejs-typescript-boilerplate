import * as path from "path";
import * as dotenv from "dotenv";
import * as config from "config";

// type Promise = Promise | Bluebird<any>;


dotenv.config();
export function get(key: any, filepath = "") {
    return path.join(config.get(`path.${key}`), filepath);
}