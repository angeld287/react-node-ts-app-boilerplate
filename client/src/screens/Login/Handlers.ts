import { ResponseTransformer, rest } from "msw";

const login = rest.post('http://localhost:3001/api/auth/login', (req, res, ctx) => {
    const headers: Array<ResponseTransformer<any, any>> = [
        ctx.status(200),
        ctx.set("access-control-allow-origin", "*"),
        ctx.set("Accept", "application/json"),
        ctx.set("Content-Type", "application/json")
    ]

    let _error: any = [];
    let _success: any = null;
    let json: ResponseTransformer<any, any> = ctx.json({})

    if (!req.body)
        return res(
            ...headers,
            json,
            ctx.delay(100)
        )

    let _body: any = req.body; //existingadmin@test.com

    if (_body.username === "")
        _error = [
            {
                message: "E-mail cannot be blank.",
                value: "",
                param: "username",
                location: "body"
            }
        ]

    if (_body.username === "existingadmin")
        _error = [
            {
                message: "E-mail is not valid.",
                value: "",
                param: "username",
                location: "body"
            }
        ]

    json = ctx.json({
        statusCode: "10000",
        message: "Success",
        data: {
            errors: _error
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