import { ResponseTransformer, rest } from "msw";

const login = rest.post('http://localhost:3001/api/auth/login', (req, res, ctx) => {
    const _error: any = [];
    const _success: any = null;

    const headers: Array<ResponseTransformer<any, any>> = [
        ctx.status(200),
        ctx.set("access-control-allow-origin", "*"),
        ctx.set("Accept", "application/json"),
        ctx.set("Content-Type", "application/json")
    ]

    let json: ResponseTransformer<any, any> = ctx.json({})

    if (!req.body)
        return res(
            ...headers,
            json,
            ctx.delay(100)
        )

    json = ctx.json({
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

    return res(
        ...headers,
        json,
        ctx.delay(10)
    )
});

const handlers = [login]

export default handlers