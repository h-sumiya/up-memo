export async function load({ platform }) {
    let { results } = await platform.env.DB.prepare(
        "SELECT name FROM item"
    ).run();
    return { results };
}