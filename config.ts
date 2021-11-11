

require('dotenv').config()

interface IConfigSettings {
    host: string;
    user: string;
    port: string;
    password: string;
    database: string;
    SECRET_KEY: string;
    AUTH_SECRET_KEY: string
}

interface IConfig {
    [key: string]: IConfigSettings
}

const config: IConfig = {
    dev: {
        host: "localhost",
        user: "postgres",
        password: "",
        port: "5432",
        database: "todosDB",
        SECRET_KEY: "sdhfilwhfwefjoiwu847396583947yjr923223eo2w2i9",
        AUTH_SECRET_KEY: "vn3ihy2iyd928y3fh2ldq32mdkefjvbl4hof2hfocn.lw/a"
    },
    qa: {
        host: "",
        user: "",
        password: "",
        port: "",
        database: "",
        SECRET_KEY: "sdhfilwhfwefjoiwu847396583947yjr923223eo2w2i9",
        AUTH_SECRET_KEY: "vn3ihy2iyd928y3fh2ldq32mdkefjvbl4hof2hfocn.lw/a"
    },
    uat: {
        host: "",
        user: "",
        password: "",
        port: "",
        database: "",
        SECRET_KEY: "sdhfilwhfwefjoiwu847396583947yjr923223eo2w2i9",
        AUTH_SECRET_KEY: "vn3ihy2iyd928y3fh2ldq32mdkefjvbl4hof2hfocn.lw/a"
    },
    prod: {
        host: "",
        user: "",
        password: "",
        port: "",
        database: "",
        SECRET_KEY: "sdhfilwhfwefjoiwu847396583947yjr923223eo2w2i9",
        AUTH_SECRET_KEY: "vn3ihy2iyd928y3fh2ldq32mdkefjvbl4hof2hfocn.lw/a"
    }
}

export default config[process.env.NODE_ENV || "dev"]