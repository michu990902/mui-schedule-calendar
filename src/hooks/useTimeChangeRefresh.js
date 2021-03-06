import { useState, useEffect } from 'react';

export const useTimeChangeRefresh = (ms = 1000) => {
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const id = setInterval(() => {
            setRefresh(prev => !prev);
        }, ms);
        return () => {
            clearInterval(id);
        }
    }, []);

    return refresh;
}

