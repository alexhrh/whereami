function getCurrentPosition(): Promise<Position> {
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    } else {
        throw new Error('geolocation is not supported');
    }
}

const BrowserTools = {
    getCurrentPosition
};

export default BrowserTools;