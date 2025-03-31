export async function fetchAttendanceCount(url: string, slot: number) {
    try {
        const _url = `${url}/api/get-attendance-count/${slot}`;
        const _resp = await fetch(_url);

        if (!_resp.ok) {
            throw new Error('Error while getting attendance count');
        }
        const _data = await _resp.json();
        return _data;
    } catch (error) {
        console.log(error, '-error while fetch attendance count.');
        return undefined;
    }
}
