const API_URL = 'http://localhost:1327';

export default async function listLogEntries(){
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}