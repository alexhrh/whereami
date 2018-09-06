export default async function getPlaces(location) {
    const rawResponse = await fetch('/findplaces', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({location})
    });

    return await rawResponse.json();
}