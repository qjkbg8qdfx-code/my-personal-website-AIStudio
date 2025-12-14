import { useState, useEffect } from 'react';

export const useDomesticTrust = () => {
    const [country, setCountry] = useState<string | null>(null);
    const [isLocal, setIsLocal] = useState(false);

    useEffect(() => {
        const checkLocation = async () => {
            // Basic caching to avoid repeated calls
            const cached = sessionStorage.getItem('geo_country');
            if (cached) {
                setCountry(cached);
                setIsLocal(['United States', 'Australia', 'United Kingdom', 'Canada', 'Singapore'].includes(cached));
                return;
            }

            try {
                // Using ipapi.co as suggested (free tier)
                const res = await fetch('https://ipapi.co/json/');
                if (!res.ok) throw new Error('Geo fetch failed');

                const data = await res.json();
                if (data.country_name) {
                    setCountry(data.country_name);
                    sessionStorage.setItem('geo_country', data.country_name);

                    const priorityCountries = ['United States', 'Australia', 'United Kingdom', 'Canada', 'Singapore'];
                    setIsLocal(priorityCountries.includes(data.country_name));
                }
            } catch (e) {
                console.warn("Localization failed, using default.");
            }
        };

        checkLocation();
    }, []);

    return { country, isLocal };
};
