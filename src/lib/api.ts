const API_BASE = "https://api.transitous.org/api/v1/"

export async function searchLocation(text) {
    return fetch(
      API_BASE + 'geocode?text=' + encodeURIComponent(text) + '&type=STOP'
    ).then((response) => response.json())
}

