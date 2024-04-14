import { env } from '$env/dynamic/private'

export async function DELETE({ params, platform ,request}) {
    let header_key = request.headers.get("x-api-key");
    if (header_key !== env.API_KEY) {
        return new Response(null, { status: 401 });
    }
    console.log(params.name);
    const del = await platform.env.DB.prepare(
        "DELETE FROM item WHERE name = ?"
    ).bind(params.name).run();
    return new Response(null, { status: 204 });
}

export async function POST({ params, platform, request }) {
    let header_key = request.headers.get("x-api-key");
    if (header_key !== env.API_KEY) {
        return new Response(null, { status: 401 });
    }

    if (!params.name) {
        return new Response(null, { status: 400 });
    }

    let body = await request.json();
    let time = new Date().getTime() / 1000;
    time = Math.floor(time);
    const ins = await platform.env.DB.prepare(
        `INSERT INTO item (name, data, "create", "update")
        VALUES (?, ?, ?, ?)
        ON CONFLICT(name) DO UPDATE SET
            data = excluded.data,
            "update" = excluded."update";`
    ).bind(params.name, body.data, time, time).run();
    return new Response(null, { status: 201 });
}