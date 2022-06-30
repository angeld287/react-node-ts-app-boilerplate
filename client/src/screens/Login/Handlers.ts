import { ResponseTransformer, rest } from "msw";

const login = rest.post('http://localhost:3001/api/auth/login', (req, res, ctx) => {
    const headers: Array<ResponseTransformer<any, any>> = [
        ctx.status(200),
        ctx.set("access-control-allow-origin", "*"),
        ctx.set("Accept", "application/json"),
        ctx.set("Content-Type", "application/json")
    ]

    let _result: any = null;
    let json: ResponseTransformer<any, any> = ctx.json({})

    if (!req.body)
        return res(...headers, json, ctx.delay(100))

    _result = { errors: [{ message: "", value: "", param: "username", location: "body" }] }

    let _body: any = req.body; //existingadmin@test.com

    if (_body.username === "")
        _result.errors[0].message = "E-mail cannot be blank."

    if (_body.username === "existingadmin")
        _result.errors[0].message = "E-mail is not valid."

    if (_body.password === "")
        _result.errors[0].message = "Password cannot be blank."

    if (_body.password === "admin")
        _result.errors[0].message = "Password length must be atleast 8 characters."

    if (_body.username === "existingadmin@test.com" && _body.password === "badPass")
        _result.errors[0].message = "Invalid Username or Password."

    if (_body.username === "existingadmin@test.com" && _body.password === "admin2807")
        _result = {
            session: {
                id: 4,
                email: "existingadmin@test.com",
                phoneNumber: "8095445501",
                passwordResetToken: null,
                passwordResetExpires: null,
                fullname: "Test User Name",
                gender: "m",
                profile: null,
                userName: "existingAdmin"
            }
        };

    json = ctx.json({
        statusCode: "10000", message: "Success",
        data: _result
    })

    return res(...headers, json, ctx.delay(10))
});

const handlers = [login]

export default handlers