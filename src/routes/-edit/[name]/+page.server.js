export async function load({ platform, params }) {
    let { results } = await platform.env.DB.prepare(
        "SELECT name, data FROM item WHERE name = ?"
    ).bind(params.name).run();
    if (results.length === 0) {
        return {
            name: params.name,
            data: "# New Momo"
        }
    }
    return results[0];
}