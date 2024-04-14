export async function load({ platform ,params}) {
    let { results } = await platform.env.DB.prepare(
        "SELECT name,data FROM item WHERE name = ?"
    ).bind(params.name).run();
    return results[0];
}