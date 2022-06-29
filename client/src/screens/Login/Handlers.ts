import { rest } from "msw";

const login = rest.post('http://localhost:3001/api/auth/login', (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.set("access-control-allow-origin", "*"),
        ctx.set("Accept", "application/json"),
        ctx.set("Content-Type", "application/json"),
        ctx.json({
            statusCode: "10000",
            message: "Success",
            data: {
                errors: [
                    {
                        message: "E-mail cannot be blank.",
                        value: "",
                        param: "username",
                        location: "body"
                    },
                    {
                        message: "E-mail is not valid.",
                        value: "",
                        param: "username",
                        location: "body"
                    }
                ]
            }
        })
        , ctx.delay(10)
    )
});

const handlers = [login]

export default handlers